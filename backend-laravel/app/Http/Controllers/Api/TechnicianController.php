<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Technician;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use OpenApi\Annotations as OA;

/**
 * @OA\Tag(
 *     name="Technicians",
 *     description="API Endpoints for managing technicians"
 * )
 */
class TechnicianController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/technicians",
     *     summary="Get all technicians",
     *     tags={"Technicians"},
     *     @OA\Response(
     *         response=200,
     *         description="List of technicians",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="data",
     *                 type="array",
     *                 @OA\Items(ref="#/components/schemas/Technician")
     *             )
     *         )
     *     )
     * )
     */
    public function index(): JsonResponse
    {
        $technicians = Technician::with(['userInfo', 'repairRequests'])->get();
        return response()->json(['data' => $technicians]);
    }

    /**
     * @OA\Post(
     *     path="/api/technicians",
     *     summary="Create a new technician",
     *     tags={"Technicians"},
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         description="Technician details",
     *         @OA\JsonContent(ref="#/components/schemas/TechnicianCreateRequest")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Technician created",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string"),
     *             @OA\Property(property="data", ref="#/components/schemas/Technician")
     *         )
     *     ),
     *     @OA\Response(response=403, description="Unauthorized")
     * )
     */
    public function store(Request $request): JsonResponse
    {
        // Admin authorization check
        if (Auth::user()->user_type !== 'admin') {
            return response()->json([
                'message' => 'Unauthorized. Admin access required.'
            ], 403);
        }

        // Validation
        $validated = $request->validate([
            'name'            => ['required', 'string', 'max:255'],
            'email'           => ['required', 'email', Rule::unique('technicians')],
            'phone_number'    => ['required', 'string', 'max:20'],
            'specialization'  => ['required', Rule::in(['hardware', 'software'])],
            'status'          => ['required', 'string', Rule::in(['booked', 'unavailable', 'available'])],
            'avatar'          => ['nullable', 'image', 'max:2048']
        ]);

        // Handle avatar upload
        if ($request->hasFile('avatar')) {
            $path = $request->file('avatar')->store('technician-avatars', 'public');
            $validated['avatar'] = Storage::url($path);
        }

        $technician = Technician::create($validated);

        return response()->json([
            'message' => 'Technician created successfully',
            'data'    => $technician
        ], 201);
    }

    /**
     * @OA\Get(
     *     path="/api/technicians/{id}",
     *     summary="Get technician details",
     *     tags={"Technicians"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="Technician ID",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Technician details",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="data", ref="#/components/schemas/Technician")
     *         )
     *     ),
     *     @OA\Response(response=404, description="Technician not found")
     * )
     */
    public function show(Technician $technician): JsonResponse
    {
        $technician->load(['userInfo', 'repairRequests']);
        return response()->json(['data' => $technician]);
    }


    /**
     * @OA\Put(
     *     path="/api/technicians/{id}",
     *     summary="Update technician details",
     *     tags={"Technicians"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="Technician ID",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         description="Technician data to update",
     *         @OA\JsonContent(ref="#/components/schemas/TechnicianUpdateRequest")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Technician updated successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string"),
     *             @OA\Property(property="data", ref="#/components/schemas/Technician")
     *         )
     *     ),
     *     @OA\Response(response=403, description="Unauthorized")
     * )
     */
    public function update(Request $request, Technician $technician): JsonResponse
    {
        // Admin authorization check
        if (Auth::user()->user_type !== 'admin') {
            return response()->json([
                'message' => 'Unauthorized. Admin access required.'
            ], 403);
        }

        // Validation
        $validated = $request->validate([
            'name'            => ['sometimes', 'string', 'max:255'],
            'email'           => ['sometimes', 'email', Rule::unique('technicians')->ignore($technician->id)],
            'phone_number'    => ['sometimes', 'string', 'max:20'],
            'specialization'  => ['sometimes', Rule::in(['hardware', 'software'])],
            'status'          => ['sometimes', 'string', Rule::in(['booked', 'unavailable', 'available'])],
            'avatar'          => ['nullable', 'image', 'max:2048']
        ]);

        // Handle avatar update
        if ($request->hasFile('avatar')) {
            if ($technician->avatar) {
                Storage::delete($technician->avatar);
            }
            $path = $request->file('avatar')->store('technician-avatars', 'public');
            $validated['avatar'] = Storage::url($path);
        }

        $technician->update($validated);

        return response()->json([
            'message' => 'Technician updated successfully',
            'data'    => $technician
        ]);
    }

    /**
     * @OA\Delete(
     *     path="/api/technicians/{id}",
     *     summary="Delete a technician",
     *     tags={"Technicians"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="Technician ID",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Technician deleted successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string")
     *         )
     *     ),
     *     @OA\Response(response=403, description="Unauthorized")
     * )
     */
    public function destroy(Technician $technician): JsonResponse
    {
        // Admin authorization check
        if (Auth::user()->user_type !== 'admin') {
            return response()->json([
                'message' => 'Unauthorized. Admin access required.'
            ], 403);
        }

        if ($technician->avatar) {
            Storage::delete($technician->avatar);
        }
        $technician->delete();

        $user = User::find($technician->user_id);
        if ($user) {
            $user->delete();
        }

        return response()->json(['message' => 'Technician Deleted Successfully.'], 200);
    }
}
