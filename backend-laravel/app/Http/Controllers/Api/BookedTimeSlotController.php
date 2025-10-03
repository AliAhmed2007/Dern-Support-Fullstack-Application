<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\BookedTimeSlot;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;
use OpenApi\Annotations as OA;

/**
 * @OA\Tag(
 *     name="Scheduling",
 *     description="Booked time slots management"
 * )
 */
class BookedTimeSlotController extends Controller
{
    /**
     * List booked time slots with optional filters.
     *
     * @OA\Get(
     *     path="/api/booked-slots",
     *     summary="List booked time slots",
     *     description="Retrieve paginated list of booked time slots with optional filters.",
     *     tags={"Scheduling"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="technician_id",
     *         in="query",
     *         description="Filter by technician ID",
     *         required=false,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Parameter(
     *         name="start_date",
     *         in="query",
     *         description="Filter by start date (YYYY-MM-DD)",
     *         required=false,
     *         @OA\Schema(type="string", format="date")
     *     ),
     *     @OA\Parameter(
     *         name="end_date",
     *         in="query",
     *         description="Filter by end date (YYYY-MM-DD)",
     *         required=false,
     *         @OA\Schema(type="string", format="date")
     *     ),
     *     @OA\Parameter(
     *         name="include",
     *         in="query",
     *         description="Include related resources (comma-separated, e.g., technician, repair-request)",
     *         required=false,
     *         @OA\Schema(type="string", enum={"technician", "repair-request"})
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="data",
     *                 type="array",
     *                 @OA\Items(ref="#/components/schemas/BookedTimeSlot")
     *             )
     *         )
     *     )
     * )
     */
    public function index(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'technician_id' => 'sometimes|exists:technicians,id',
            'start_date'    => 'sometimes|date',
            'end_date'      => 'sometimes|date|after_or_equal:start_date',
            'include'       => 'sometimes|in:technician,repairRequest'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $query = BookedTimeSlot::active()
            ->when($request->technician_id, fn($q, $id) => $q->where('technician_id', $id))
            ->when($request->start_date, fn($q) => $q->where('start_date', '>=', $request->start_date))
            ->when($request->end_date, fn($q) => $q->where('end_date', '<=', $request->end_date));

        if ($request->include) {
            $query->with(explode(',', $request->include));
        }

        return response()->json([
            'data' => $query->paginate(15)
        ]);
    }

    /**
     * Create a new booked time slot.
     *
     * @OA\Post(
     *     path="/api/booked-slots",
     *     summary="Create new booked slot",
     *     description="Create a new technician time slot booking.",
     *     tags={"Scheduling"},
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         description="Booked time slot details",
     *         @OA\JsonContent(ref="#/components/schemas/BookedTimeSlot")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Booking created successfully",
     *         @OA\JsonContent(
     *             ref="#/components/schemas/BookedTimeSlot"
     *         )
     *     ),
     *     @OA\Response(response=409, description="Time slot conflict"),
     *     @OA\Response(response=422, ref="#/components/responses/ValidationError")
     * )
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'technician_id'     => 'required|exists:technicians,id',
            'repair_request_id' => [
                'required',
                Rule::exists('repair_requests', 'id')->whereNotIn('status', ['completed', 'cancelled'])
            ],
            'start_date'        => 'required|date|after:now',
            'end_date'          => 'required|date|after:start_date'
        ], [
            'technician_id.required' => 'The technician ID is required and must be a valid technician.',
            'technician_id.exists'   => 'The selected technician does not exist in our records.',
            'repair_request_id.required' => 'The repair request ID is required.',
            'repair_request_id.exists'   => 'The selected repair request ID is invalid or has already been completed or cancelled.',
            'start_date.required'    => 'The start date is required and must be a valid date.',
            'start_date.date'        => 'The start date must be a valid date format.',
            'start_date.after'       => 'The start date must be a future date.',
            'end_date.required'      => 'The end date is required and must be a valid date.',
            'end_date.date'          => 'The end date must be a valid date format.',
            'end_date.after'         => 'The end date must be later than the start date.',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Check for overlapping time slots.
        if ($this->hasOverlap($request->technician_id, $request->start_date, $request->end_date)) {
            return response()->json([
                'message' => 'Time slot overlaps with existing booking'
            ], 409);
        }

        $bookedSlot = BookedTimeSlot::create($validator->validated());

        return response()->json([
            'message' => 'Time slot booked successfully',
            'data'    => $bookedSlot
        ], 201);
    }

    /**
     * Retrieve details of a specific booked time slot.
     *
     * @OA\Get(
     *     path="/api/booked-slots/{id}",
     *     summary="Get booked slot details",
     *     description="Retrieve details of a specific booked time slot.",
     *     tags={"Scheduling"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="Booking ID",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Booked slot details",
     *         @OA\JsonContent(ref="#/components/schemas/BookedTimeSlot")
     *     ),
     *     @OA\Response(response=404, ref="#/components/responses/NotFound")
     * )
     */
    public function show(BookedTimeSlot $bookedTimeSlot): JsonResponse
    {
        return response()->json([
            'data' => $bookedTimeSlot->load(['technician', 'repairRequest'])
        ]);
    }

    /**
     * Update an existing booked time slot.
     *
     * @OA\Put(
     *     path="/api/booked-slots/{id}",
     *     summary="Update booked slot",
     *     description="Update an existing technician time slot booking.",
     *     tags={"Scheduling"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="Booking ID",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         description="Updated booked time slot data",
     *         @OA\JsonContent(ref="#/components/schemas/BookedTimeSlotUpdate")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Booking updated successfully",
     *         @OA\JsonContent(ref="#/components/schemas/BookedTimeSlot")
     *     ),
     *     @OA\Response(response=409, description="Time slot conflict"),
     *     @OA\Response(response=422, ref="#/components/responses/ValidationError")
     * )
     */
    public function update(Request $request, BookedTimeSlot $bookedTimeSlot): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'start_date' => 'sometimes|date|after:now',
            'end_date'   => 'sometimes|date|after:start_date',
            'status'     => 'in:booked,cancelled'
        ], [
            'start_date.required' => 'The start date is required and must be a valid date.',
            'start_date.date'     => 'The start date must be a valid date format.',
            'start_date.after'    => 'The start date must be a future date.',
            'end_date.required'   => 'The end date is required and must be a valid date.',
            'end_date.date'       => 'The end date must be a valid date format.',
            'end_date.after'      => 'The end date must be later than the start date.',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if ($request->has('start_date') || $request->has('end_date')) {
            $start = $request->start_date ?? $bookedTimeSlot->start_date;
            $end   = $request->end_date ?? $bookedTimeSlot->end_date;

            if ($this->hasOverlap($bookedTimeSlot->technician_id, $start, $end, $bookedTimeSlot->id)) {
                return response()->json([
                    'message' => 'Updated time slot overlaps with existing booking'
                ], 409);
            }
        }

        $bookedTimeSlot->update($validator->validated());

        return response()->json([
            'message' => 'Booking updated successfully',
            'data'    => $bookedTimeSlot
        ]);
    }

    /**
     * Delete a booked time slot.
     *
     * @OA\Delete(
     *     path="/api/booked-slots/{id}",
     *     summary="Delete booked slot",
     *     description="Delete a booked time slot.",
     *     tags={"Scheduling"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="Booking ID",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Booking deleted"
     *     ),
     *     @OA\Response(response=404, ref="#/components/responses/NotFound")
     * )
     */
    public function destroy(BookedTimeSlot $bookedTimeSlot): JsonResponse
    {
        $bookedTimeSlot->delete();
        return response()->json(['message' => 'Time slot deleted successfully'], 204);
    }

    /**
     * Check for overlapping time slots.
     *
     * @param  mixed  $technicianId
     * @param  string $start
     * @param  string $end
     * @param  int|null $excludeId
     * @return bool
     */
    private function hasOverlap($technicianId, $start, $end, $excludeId = null): bool
    {
        return BookedTimeSlot::where('technician_id', $technicianId)
            ->when($excludeId, fn($q) => $q->where('id', '!=', $excludeId))
            ->where(function ($query) use ($start, $end) {
                $query->whereBetween('start_date', [$start, $end])
                    ->orWhereBetween('end_date', [$start, $end])
                    ->orWhere(function ($q) use ($start, $end) {
                        $q->where('start_date', '<', $start)
                            ->where('end_date', '>', $end);
                    });
            })->exists();
    }
}
