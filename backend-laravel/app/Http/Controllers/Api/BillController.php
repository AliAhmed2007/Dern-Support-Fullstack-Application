<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Bill;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use OpenApi\Annotations as OA;

/**
 * @OA\Tag(
 *     name="Bills",
 *     description="API Endpoints for managing bills"
 * )
 */
class BillController extends Controller
{
    /**
     * Display a listing of bills.
     *
     * @OA\Get(
     *     path="/api/bills",
     *     summary="List all bills",
     *     description="Retrieve a paginated list of bills. Non-admin users only see their own bills.",
     *     tags={"Bills"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="status",
     *         in="query",
     *         description="Filter bills by status",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="A list of bills",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="data",
     *                 type="array",
     *                 @OA\Items(ref="#/components/schemas/Bill")
     *             )
     *         )
     *     ),
     *     @OA\Response(response=403, description="Unauthorized")
     * )
     */
    public function index(Request $request): JsonResponse
    {
        $query = Bill::with(['user', 'repairRequest', 'billHardwareComponents']);
        if (Auth::user()->user_type !== 'admin') {
            $query->where('user_id', Auth::id());
        }
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }
        return response()->json(['data' => $query->paginate(15)]);
    }

    /**
     * Store a newly created bill (Admin only).
     *
     * @OA\Post(
     *     path="/api/bills",
     *     summary="Create a new bill",
     *     description="Create and store a new bill. (Admin only)",
     *     tags={"Bills"},
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         description="Bill details",
     *         @OA\JsonContent(ref="#/components/schemas/BillCreateRequest")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Bill created successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Bill created successfully"),
     *             @OA\Property(property="data", ref="#/components/schemas/Bill")
     *         )
     *     ),
     *     @OA\Response(response=403, description="Unauthorized"),
     *     @OA\Response(response=422, description="Validation error")
     * )
     */
    public function store(Request $request): JsonResponse
    {
        if (Auth::user()->user_type !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        $validator = Validator::make($request->all(), [
            'user_id'            => 'required|exists:users,id',
            'repair_request_id'  => 'nullable|exists:repair_requests,id',
            'service_amount'     => 'required|numeric|min:0',
            'tax_amount'         => 'sometimes|numeric|min:0',
            'discount'           => 'sometimes|numeric|min:0',
            'courier_amount'     => 'sometimes|numeric|min:0',
            'payment_method'     => 'nullable|in:cash,credit_card,bank_transfer,paypal',
            'due_date'           => 'nullable|date',
            'hardware_components' => 'sometimes|array',
            'hardware_components.*.component_name' => 'required|string',
            'hardware_components.*.quantity'       => 'required|integer|min:1',
            'hardware_components.*.unit_price'       => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $validated = $validator->validated();
        if (isset($validated['repair_request_id'])) {
            $existingBill = Bill::where('repair_request_id', $validated['repair_request_id'])->first();
            if ($existingBill) {
                return response()->json([
                    'message' => 'A bill for this repair request already exists.',
                    'data'    => $existingBill
                ], 422);
            }
        }
        $hardwareComponents = $validated['hardware_components'] ?? [];
        unset($validated['hardware_components']);
        $validated['bill_number'] = $this->generateBillNumber();
        $validated['final_amount'] = $this->calculateFinalAmount(array_merge($validated, ['hardware_components' => $hardwareComponents]));
        $bill = Bill::create($validated);
        if (!empty($hardwareComponents)) {
            $this->saveHardwareComponents($bill, $hardwareComponents);
        }
        $this->recalculateFinalAmount($bill);
        return response()->json([
            'message' => 'Bill created successfully',
            'data'    => $bill->load('billHardwareComponents')
        ], 201);
    }

    /**
     * Display the specified bill.
     *
     * @OA\Get(
     *     path="/api/bills/{bill_id}",
     *     summary="Get bill details",
     *     description="Retrieve a specific bill by ID. Non-admin users can only access their own bills.",
     *     tags={"Bills"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="bill_id",
     *         in="path",
     *         description="ID of the bill",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Bill details",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="data", ref="#/components/schemas/Bill")
     *         )
     *     ),
     *     @OA\Response(response=403, description="Unauthorized")
     * )
     */
    public function show(Bill $bill): JsonResponse
    {
        if (Auth::user()->user_type !== 'admin' && $bill->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        return response()->json([
            'data' => $bill->load(['user', 'repairRequest', 'billHardwareComponents'])
        ]);
    }

    /**
     * Update the specified bill (Admin only).
     *
     * @OA\Put(
     *     path="/api/bills/{bill_id}",
     *     summary="Update a bill",
     *     description="Update an existing bill. (Admin only)",
     *     tags={"Bills"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="bill_id",
     *         in="path",
     *         description="ID of the bill to update",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         description="Updated bill data",
     *         @OA\JsonContent(ref="#/components/schemas/BillUpdateRequest")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Bill updated successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Bill updated successfully"),
     *             @OA\Property(property="data", ref="#/components/schemas/Bill")
     *         )
     *     ),
     *     @OA\Response(response=403, description="Unauthorized"),
     *     @OA\Response(response=422, description="Validation error")
     * )
     */
    public function update(Request $request, Bill $bill): JsonResponse
    {
        if (Auth::user()->user_type !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        $validator = Validator::make($request->all(), [
            'user_id'            => 'sometimes|exists:users,id',
            'repair_request_id'  => 'nullable|exists:repair_requests,id',
            'service_amount'     => 'sometimes|numeric|min:0',
            'tax_amount'         => 'sometimes|numeric|min:0',
            'discount'           => 'sometimes|numeric|min:0',
            'courier_amount'     => 'sometimes|numeric|min:0',
            'status'             => 'sometimes|in:pending,paid,cancelled,refunded',
            'payment_method'     => 'nullable|in:cash,credit_card,bank_transfer,paypal',
            'due_date'           => 'nullable|date',
            'hardware_components' => 'sometimes|array',
            'hardware_components.*.id'              => 'sometimes|exists:bill_hardware_components,id',
            'hardware_components.*.component_name'  => 'sometimes|string',
            'hardware_components.*.quantity'        => 'sometimes|integer|min:1',
            'hardware_components.*.unit_price'        => 'sometimes|numeric|min:0',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $validated = $validator->validated();
        $hardwareComponents = $validated['hardware_components'] ?? [];
        unset($validated['hardware_components']);
        if (isset($validated['service_amount']) || isset($validated['tax_amount']) || isset($validated['discount']) || isset($validated['courier_amount'])) {
            $validated['final_amount'] = $this->calculateFinalAmount(array_merge($bill->toArray(), $validated));
        }
        $bill->update($validated);
        if (!empty($hardwareComponents)) {
            $this->updateHardwareComponents($bill, $hardwareComponents);
        }
        $this->recalculateFinalAmount($bill);
        return response()->json([
            'message' => 'Bill updated successfully',
            'data'    => $bill->refresh()->load('billHardwareComponents')
        ]);
    }

    /**
     * Remove the specified bill (Admin only).
     *
     * @OA\Delete(
     *     path="/api/bills/{bill_id}",
     *     summary="Delete a bill",
     *     description="Delete the specified bill. (Admin only)",
     *     tags={"Bills"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="bill_id",
     *         in="path",
     *         description="ID of the bill to delete",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=204, description="Bill deleted successfully"),
     *     @OA\Response(response=403, description="Unauthorized")
     * )
     */
    public function destroy(Bill $bill): JsonResponse
    {
        if (Auth::user()->user_type !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        $bill->delete();
        return response()->json(null, 204);
    }

    /**
     * Add courier fee to bill (Admin only).
     *
     * @OA\Post(
     *     path="/api/bills/{bill_id}/courier-fee",
     *     summary="Add courier fee to a bill",
     *     description="Add a courier fee to the specified bill. (Admin only)",
     *     tags={"Bills"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="bill_id",
     *         in="path",
     *         description="ID of the bill",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         description="Courier fee data",
     *         @OA\JsonContent(
     *             @OA\Property(property="courier_amount", type="number", example=5.00)
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Courier fee added",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Courier fee added"),
     *             @OA\Property(property="data", ref="#/components/schemas/Bill")
     *         )
     *     ),
     *     @OA\Response(response=403, description="Unauthorized"),
     *     @OA\Response(response=422, description="Validation error")
     * )
     */
    public function addCourierFee(Request $request, Bill $bill): JsonResponse
    {
        if (Auth::user()->user_type !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        $validator = Validator::make($request->all(), [
            'courier_amount' => 'required|numeric|min:0'
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $bill->update([
            'courier_amount' => $request->courier_amount,
            'final_amount'   => $bill->final_amount + ($request->courier_amount - $bill->courier_amount)
        ]);
        return response()->json([
            'message' => 'Courier fee added',
            'data'    => $bill->refresh()
        ]);
    }

    // Helper methods for generating bill numbers, calculating final amounts,
    // saving/updating hardware components, and recalculating final amount.

    private function generateBillNumber(): string
    {
        return 'BILL-' . Carbon::now()->format('Ymd') . '-' . Str::upper(Str::random(6));
    }

    private function calculateFinalAmount(array $data): float
    {
        $componentsTotal = 0;
        if (isset($data['hardware_components']) && is_array($data['hardware_components'])) {
            foreach ($data['hardware_components'] as $component) {
                $componentsTotal += $component['quantity'] * $component['unit_price'];
            }
        }
        return (($data['service_amount'] ?? 0)
            + ($data['tax_amount'] ?? 0)
            + ($data['courier_amount'] ?? 0)
            + $componentsTotal)
            - ($data['discount'] ?? 0);
    }

    private function saveHardwareComponents(Bill $bill, array $components): void
    {
        $components = array_map(function ($component) use ($bill) {
            return [
                'bill_id'        => $bill->id,
                'component_name' => $component['component_name'],
                'quantity'       => $component['quantity'],
                'unit_price'     => $component['unit_price'],
                'subtotal'       => $component['quantity'] * $component['unit_price'],
                'created_at'     => now(),
                'updated_at'     => now()
            ];
        }, $components);
        $bill->billHardwareComponents()->insert($components);
    }

    private function updateHardwareComponents(Bill $bill, array $components): void
    {
        $bill->billHardwareComponents()->delete();
        $this->saveHardwareComponents($bill, $components);
    }

    private function recalculateFinalAmount(Bill $bill): void
    {
        $componentsTotal = $bill->billHardwareComponents()->sum('subtotal');
        $finalAmount = (
            $bill->service_amount
            + $bill->tax_amount
            + $bill->courier_amount
            + $componentsTotal
        ) - $bill->discount;
        $bill->update(['final_amount' => $finalAmount]);
    }
}
