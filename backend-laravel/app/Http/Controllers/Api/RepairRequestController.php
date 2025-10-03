<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Middleware\IsAdmin;
use App\Models\Device;
use App\Models\GeneralProblem;
use App\Models\RepairRequest;
use App\Models\Technician;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use OpenApi\Annotations as OA;

use function Pest\Laravel\json;

/**
 * @OA\Tag(
 *     name="Repair Requests",
 *     description="Repair request management"
 * )
 */
class RepairRequestController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/v1/repair-requests",
     *     tags={"Repair Requests"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(response=200, description="Request list")
     * )
     */
    public function index(): JsonResponse
    {
        $requests = Auth::user()->isAdmin()
            ? RepairRequest::with(['user', 'technicians'])->get()
            : RepairRequest::where('user_id', Auth::id())->with('technicians')->get();
        return response()->json(['data' => $requests]);
    }

    /**
     * @OA\Post(
     *     path="/api/v1/repair-requests",
     *     tags={"Repair Requests"},
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(ref="#/components/schemas/RepairRequest")
     *         )
     *     ),
     *     @OA\Response(response=201, description="Request created")
     * )
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'user_id'               => 'sometimes|exists:users,id',
            'device_name'           => 'required|string|max:255',
            'device_brand'          => 'required|string|max:255',
            'device_id'             => 'required|exists:devices,id',
            'general_problem_id'    => 'required|exists:general_problems,id',
            'specific_problem_id'   => 'nullable',
            'courier'               => ['sometimes', Rule::in(['enable', 'disable'])],
            'status'                => ['sometimes', Rule::in(['pending', 'diagnostics', 'in progress', 'completed', 'cancelled'])],
            'priority'              => ['sometimes', Rule::in(['critical', 'high', 'normal', 'low'])],
            'mode'                  => ['sometimes', Rule::in(['physical', 'online'])],
            'problem'               => 'required|string',
            'problem_description'   => 'nullable|string',
            'attachments'           => 'nullable|array|max:5',
            'attachments.*'         => 'file|max:5120'
        ], [
            'deviceName.required'          => 'The device name is required.',
            'deviceName.string'            => 'The device name must be a string.',
            'deviceName.max'               => 'The device name can be at most 255 characters long.',

            'deviceBrand.required'         => 'The device brand is required.',
            'deviceBrand.string'           => 'The device brand must be a string.',
            'deviceBrand.max'              => 'The device brand can be at most 255 characters long.',

            'device_id.required'           => 'Device selection is required.',
            'device_id.exists'             => 'The selected device is invalid.',

            'general_problem_id.required'  => 'General problem selection is required.',
            'general_problem_id.exists'    => 'The selected general problem is invalid.',

            'specific_problem_id.required' => 'Specific problem selection is required.',

            'attachments.array'            => 'The attachments must be an array.',
            'attachments.max'              => 'You can upload a maximum of 5 attachments.',
            'attachments.*.file'           => 'Each attachment must be a valid file.',
            'attachments.*.max'            => 'Each attachment must not exceed 5MB in size.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        // Process attachments using your custom method.
        $attachments = $this->handleAttachments($request);

        $repairRequest = RepairRequest::create([
            'user_id' => $request->user_id ?? Auth::id(),
            'device_id'           => $request->device_id,
            'general_problem_id'  => $request->general_problem_id,
            'specific_problem_id' => $request->specific_problem_id,
            'device_brand'        => $request->device_brand,
            'device_name'         => $request->device_name,
            'courier'             => $request->courier ?? 'disable',
            'status'              => $request->status ?? 'pending',
            'priority'            => $request->priority ?? 'normal',
            'mode'                => Auth::user()->isAdmin() ? 'physical' : 'online',
            'problem'             => $request->problem,
            'problem_description' => $request->problem_description,
            'attachments'         => $attachments,
        ]);

        return response()->json([
            'message' => 'Repair request created successfully',
            'data'    => $repairRequest
        ], 201);
    }

    /**
     * Display specific repair request
     */
    public function show(RepairRequest $repairRequest): JsonResponse
    {
        // Authorization: User can view their own or admin can view any
        $this->authorizeRequestAccess($repairRequest);

        return response()->json([
            'data' => $repairRequest->load(['user', 'technicians'])
        ]);
    }

    /**
     * @OA\Put(
     *     path="/api/v1/repair-requests/{id}",
     *     tags={"Repair Requests"},
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(ref="#/components/schemas/RepairRequest")
     *         )
     *     ),
     *     @OA\Response(response=200, description="updated successfully")
     * )
     */

    public function update(Request $request, RepairRequest $repairRequest): JsonResponse
    {
        $this->authorizeRequestAccess($repairRequest);

        $validator = Validator::make($request->all(), [
            'device_name'          => 'sometimes|string|max:255',
            'deviceBrand'          => 'sometimes|string|max:255',
            'status'               => ['sometimes', Rule::in(['pending', 'diagnostics', 'in progress', 'completed', 'cancelled'])],
            'priority'             => ['sometimes', Rule::in(['critical', 'high', 'normal', 'low'])],
            'mode'                 => ['sometimes', Rule::in(['physical', 'online'])],
            'problem_description'  => 'sometimes|nullable|string',
            'attachments'          => 'nullable|array|max:5',
            'attachments.*'        => 'file|max:5120'
        ], [
            'device_name.string'          => 'The device name must be a string.',
            'device_name.max'             => 'The device name can be at most 255 characters long.',

            'deviceBrand.string'          => 'The device brand must be a string.',
            'deviceBrand.max'             => 'The device brand can be at most 255 characters long.',

            'status.in'                 => 'The status must be one of: pending, diagnostics, in progress, completed, or cancelled.',

            'priority.in'               => 'The priority must be one of: critical, high, normal, or low.',

            'mode.in'                   => 'The mode must be either physical or online.',

            'attachments.array'         => 'The attachments must be an array.',
            'attachments.max'           => 'You can upload a maximum of 5 attachments.',
            'attachments.*.file'        => 'Each attachment must be a valid file.',
            'attachments.*.max'         => 'Each attachment must not exceed 5MB in size.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        // Only admins can modify status after creation
        if ($request->has('status') && !Auth::user()->isAdmin()) {
            return response()->json([
                'message' => 'Only admins can modify request status'
            ], 403);
        }

        // Build the update data array with mapped fields.
        $updateData = [];

        if ($request->has('description')) {
            $updateData['problem'] = $request->input('description');
        }

        if ($request->has('device_name')) {
            $updateData['device_name'] = $request->input('device_name');
        }

        if ($request->has('deviceBrand')) {
            $updateData['device_brand'] = $request->input('deviceBrand');
        }

        if ($request->has('status')) {
            $updateData['status'] = $request->input('status');
        }

        if ($request->has('priority')) {
            $updateData['priority'] = $request->input('priority');
        }

        if ($request->has('mode')) {
            $updateData['mode'] = $request->input('mode');
        }

        if ($request->has('problem_description')) {
            $updateData['problem_description'] = $request->input('problem_description');
        }

        if ($request->hasFile('attachments')) {
            $updateData['attachments'] = $this->handleAttachments($request, $repairRequest);
        }

        $repairRequest->update($updateData);

        return response()->json([
            'message' => 'Repair request updated successfully',
            'data' => $repairRequest
        ]);
    }

    /**
     * Delete repair request (Admin only)
     */
    public function destroy(RepairRequest $repairRequest): JsonResponse
    {
        if (!Auth::user()->isAdmin()) {
            return response()->json([
                'message' => 'Unauthorized. Admin access required.'
            ], 403);
        }

        $repairRequest->delete();
        return response()->json(null, 204);
    }

    /**
     * @OA\Put(
     *     path="/api/v1/repair-requests/{id}/assign-technician",
     *     tags={"Repair Requests"},
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(@OA\JsonContent(
     *         @OA\Property(property="technician_id", type="integer")
     *     )),
     *     @OA\Response(response=200, description="Technician assigned")
     * )
     */
    public function assignTechnician(Request $request, RepairRequest $repairRequest): JsonResponse
    {
        // Authorize that the current user is an admin.
        $this->authorizeAdmin();

        $validator = Validator::make($request->all(), [
            'technician_id' => 'required|exists:technicians,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $technician = Technician::findOrFail($request->technician_id);

        // Check if the technician's status is 'available'
        if ($technician->status !== 'available') {
            return response()->json([
                'message' => 'The selected technician is not available for assignment.'
            ], 422);
        }

        // Assign the technician without detaching any preexisting ones.
        $repairRequest->technicians()->syncWithoutDetaching([$technician->id]);

        return response()->json([
            'message' => 'Technician assigned successfully',
            'data' => $repairRequest->load('technicians')
        ]);
    }


    /**
     * @OA\Patch(
     *     path="/api/v1/repair-requests/{id}/status",
     *     tags={"Repair Requests"},
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(@OA\JsonContent(
     *         @OA\Property(property="status", type="string")
     *     )),
     *     @OA\Response(response=200, description="Status updated")
     * )
     */
    public function updateStatus(Request $request, RepairRequest $repairRequest): JsonResponse
    {
        if (!Auth::user()->isAdmin()) {
            return response()->json([
                'message' => 'Unauthorized. Admin access required.'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'status' => ['required', Rule::in([
                'pending',
                'diagnostics',
                'in progress',
                'completed',
                'cancelled'
            ])]
        ], [
            'status.required' => 'The status field is required.',
            'status.in' => 'The status must be one of the following: "in progress", "completed", or "cancelled".',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $repairRequest->update(['status' => $request->status]);

        return response()->json([
            'message' => 'Status updated successfully',
            'data' => $repairRequest
        ]);
    }
    public function fetchDevices()
    {
        $devicesArray = Device::all()->toArray();

        return response()->json([
            'message' => "Devices Fetched Successfully.",
            'individualDevices' => array_slice($devicesArray, 0, 11),
            'businessDevices' => array_slice($devicesArray, 11, 11)
        ], 200);
    }

    public function fetchDeviceById(Device $device)
    {
        return response()->json([
            'message' => 'Device fetched successfully.',
            'device' => $device
        ], 200);
    }

    public function fetchGeneralProblemId(GeneralProblem $generalProblem)
    {
        return response()->json([
            'message' => 'General Problem fetched successfully.',
            'generalProblem' => $generalProblem
        ], 200);
    }

    public function fetchTopics(Device $device)
    {
        // Eager load 'specificProblems' for each general problem
        $device->load('generalProblems.specificProblems');
        $generalProblems = $device->generalProblems;

        $specificProblemsByGeneralId = $generalProblems->mapWithKeys(function ($generalProblem) {
            return [$generalProblem->id => $generalProblem->specificProblems];
        });

        return response()->json([
            'message' => "General Problems Fetched Successfully.",
            'generalProblems' => $generalProblems,
            'specificProblems' => $specificProblemsByGeneralId,
        ], 200);
    }


    public function fetchSpecificProblems(GeneralProblem $generalProblem)
    {
        $specificProblems = $generalProblem->specificProblems; // Fetching related specific problems

        return response()->json([
            'message' => "Specific Problems Fetched Successfully.",
            'data' => $specificProblems
        ], 200);
    }
    private function authorizeAdmin(): void
    {
        if (!Auth::user() || !Auth::user()->isAdmin()) {
            abort(response()->json([
                'message' => 'Unauthorized. Admin access required.'
            ], 403));
        }
    }

    private function authorizeRequestAccess(RepairRequest $repairRequest): void
    {
        if (Auth::user()->isAdmin() || $repairRequest->user_id === Auth::id()) {
            return;
        }

        abort(response()->json([
            'message' => 'Unauthorized access to this repair request'
        ], 403));
    }

    private function handleAttachments(Request $request, ?RepairRequest $existingRequest = null): array
    {
        $attachments = $existingRequest ? $existingRequest->attachments : [];

        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {
                $path = $file->store('attachments/' . $request->user()->id, 'public');
                $attachments[] = [
                    'path' => $path,
                    'original_name' => $file->getClientOriginalName(),
                    'size' => $file->getSize(),
                    'uploaded_at' => now()->toDateTimeString()
                ];
            }
        }

        return $attachments;
    }
}
