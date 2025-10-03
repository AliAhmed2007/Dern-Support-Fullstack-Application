<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use OpenApi\Annotations as OA;

/**
 * @OA\Tag(
 *     name="Tickets",
 *     description="API Endpoints for managing tickets"
 * )
 */
class TicketController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/tickets",
     *     summary="Get list of tickets",
     *     tags={"Tickets"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="List of tickets",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="data",
     *                 type="array",
     *                 @OA\Items(ref="#/components/schemas/Ticket")
     *             )
     *         )
     *     ),
     *     @OA\Response(response=403, description="Unauthorized")
     * )
     */
    public function index()
    {
        $this->authorizeAdmin();
        return response()->json(['data' => Ticket::with('createdBy')->get()]);
    }

    /**
     * @OA\Post(
     *     path="/api/tickets",
     *     summary="Create a new ticket",
     *     tags={"Tickets"},
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         description="Ticket details",
     *         @OA\JsonContent(ref="#/components/schemas/TicketCreateRequest")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Ticket created successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="data", ref="#/components/schemas/Ticket")
     *         )
     *     ),
     *     @OA\Response(response=422, description="Validation error")
     * )
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'description' => 'required|string|max:255',
            'ticket_type' => 'required|in:repair request,general inquiry,problem reporting',
            'status'      => 'nullable|in:in progress,cancelled,resolved',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $ticket = Ticket::create([
            'user_id'     => Auth::id(),
            'description' => $request->description,
            'ticket_type' => $request->ticket_type,
            'status'      => $request->status ?? 'in progress',
        ]);

        return response()->json(['data' => $ticket], 201);
    }

    /**
     * @OA\Get(
     *     path="/api/tickets/{id}",
     *     summary="Get ticket details",
     *     tags={"Tickets"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="Ticket ID",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Ticket details",
     *         @OA\JsonContent(ref="#/components/schemas/Ticket")
     *     ),
     *     @OA\Response(response=403, description="Unauthorized"),
     *     @OA\Response(response=404, description="Ticket not found")
     * )
     */
    public function show(Ticket $ticket)
    {
        $this->authorizeOwner($ticket);
        return response()->json(['data' => $ticket]);
    }

    /**
     * @OA\Put(
     *     path="/api/tickets/{id}",
     *     summary="Update ticket details",
     *     tags={"Tickets"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="Ticket ID",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         description="Ticket update data",
     *         @OA\JsonContent(ref="#/components/schemas/TicketUpdateRequest")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Ticket updated successfully",
     *         @OA\JsonContent(ref="#/components/schemas/Ticket")
     *     ),
     *     @OA\Response(response=403, description="Unauthorized")
     * )
     */
    public function update(Request $request, Ticket $ticket)
    {
        $this->authorizeOwner($ticket);

        $validator = Validator::make($request->all(), [
            'description'       => 'nullable|string|max:255',
            'ticket_type'       => 'nullable|in:repair request,general inquiry,problem reporting',
            'status'            => 'nullable|in:in progress,cancelled,resolved',
            'controlled_by'     => 'nullable|exists:users,id',
            'repair_request_id' => [
                'nullable',
                'exists:repair_requests,id',
                function ($attribute, $value, $fail) use ($request) {
                    if ($request->ticket_type === 'repair request' && !$value) {
                        $fail('The repair_request_id is required when the ticket type is "repair request".');
                    }
                },
            ],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $ticket->update($request->only(['description', 'ticket_type', 'status', 'controlled_by']));

        return response()->json(['data' => $ticket]);
    }

    /**
     * @OA\Delete(
     *     path="/api/tickets/{id}",
     *     summary="Delete a ticket",
     *     tags={"Tickets"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="Ticket ID",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Ticket deleted successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string")
     *         )
     *     ),
     *     @OA\Response(response=403, description="Unauthorized")
     * )
     */
    public function destroy(Ticket $ticket)
    {
        $this->authorizeAdmin();
        $ticket->delete();
        return response()->json(['message' => 'Ticket deleted successfully.']);
    }

    /**
     * @OA\Put(
     *     path="/api/tickets/{id}/status",
     *     summary="Update ticket status",
     *     tags={"Tickets"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="Ticket ID",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         description="Status update data",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="status",
     *                 type="string",
     *                 enum={"in progress","cancelled","resolved"}
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Ticket status updated successfully",
     *         @OA\JsonContent(ref="#/components/schemas/Ticket")
     *     ),
     *     @OA\Response(response=422, description="Validation error")
     * )
     */
    public function updateStatus(Request $request, Ticket $ticket)
    {
        $this->authorizeOwner($ticket);

        $validator = Validator::make($request->all(), [
            'status' => 'required|in:in progress,cancelled,resolved',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $ticket->status = $request->status;
        $ticket->save();

        return response()->json(['data' => $ticket]);
    }

    /**
     * @OA\Get(
     *     path="/api/tickets/user",
     *     summary="Get tickets for the authenticated user",
     *     tags={"Tickets"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="List of user-related tickets",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="data",
     *                 type="array",
     *                 @OA\Items(ref="#/components/schemas/Ticket")
     *             )
     *         )
     *     ),
     *     @OA\Response(response=403, description="Unauthorized")
     * )
     */
    public function userRelatedTickets()
    {
        $userId  = Auth::id();
        $tickets = Ticket::where('user_id', $userId)->get();
        return response()->json(['data' => $tickets]);
    }

    // Helper methods for authorization

    private function authorizeAdmin()
    {
        if (Auth::user()->user_type !== 'admin') {
            abort(403, 'Unauthorized action.');
        }
    }

    private function authorizeOwner(Ticket $ticket)
    {
        if (Auth::id() !== $ticket->user_id && Auth::user()->user_type !== 'admin') {
            abort(403, 'Unauthorized action.');
        }
    }
}
