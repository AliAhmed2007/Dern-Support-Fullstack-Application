<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Plan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use OpenApi\Annotations as OA;

/**
 * @OA\Tag(
 *     name="Plans",
 *     description="API Endpoints for managing subscription plans"
 * )
 */
class PlanController extends Controller
{
    /**
     * List all available plans.
     *
     * @OA\Get(
     *     path="/api/plans",
     *     summary="List all plans",
     *     description="Retrieve all available plans.",
     *     tags={"Plans"},
     *     @OA\Response(
     *         response=200,
     *         description="A list of plans",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Plan")
     *         )
     *     )
     * )
     */
    public function index()
    {
        return response()->json(Plan::all(), 200);
    }

    /**
     * Create a new plan (Admin only).
     *
     * @OA\Post(
     *     path="/api/plans",
     *     summary="Create a new plan",
     *     description="Create a new subscription plan. Only admins can perform this action.",
     *     tags={"Plans"},
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         description="Plan object that needs to be created",
     *         @OA\JsonContent(
     *             required={"name", "monthly_price", "annually_price"},
     *             @OA\Property(property="name", type="string", example="Basic Plan"),
     *             @OA\Property(property="monthly_price", type="number", example=9.99),
     *             @OA\Property(property="annually_price", type="number", example=99.99)
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Plan created successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Plan created successfully."),
     *             @OA\Property(property="plan", ref="#/components/schemas/Plan")
     *         )
     *     ),
     *     @OA\Response(response=403, description="Unauthorized")
     * )
     */
    public function store(Request $request)
    {
        $this->authorizeAdmin();

        $validated = $request->validate([
            'name'           => 'required|string|max:255',
            'monthly_price'  => 'required|numeric|min:0',
            'annually_price' => 'required|numeric|min:0',
        ]);

        $plan = Plan::create($validated);

        return response()->json([
            'message' => 'Plan created successfully.',
            'plan'    => $plan
        ], 201);
    }

    /**
     * Get details of a specific plan.
     *
     * @OA\Get(
     *     path="/api/plans/{plan_id}",
     *     summary="Get a specific plan",
     *     description="Retrieve details for a single plan by its ID.",
     *     tags={"Plans"},
     *     @OA\Parameter(
     *         name="plan_id",
     *         in="path",
     *         description="ID of the plan to retrieve",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Plan details",
     *         @OA\JsonContent(ref="#/components/schemas/Plan")
     *     )
     * )
     */
    public function show(Plan $plan)
    {
        return response()->json($plan, 200);
    }

    /**
     * Update an existing plan (Admin only).
     *
     * @OA\Put(
     *     path="/api/plans/{plan_id}",
     *     summary="Update an existing plan",
     *     description="Update details of an existing plan. Only admins can perform this action.",
     *     tags={"Plans"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="plan_id",
     *         in="path",
     *         description="ID of the plan to update",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         description="Plan object with updated data",
     *         @OA\JsonContent(
     *             @OA\Property(property="name", type="string", example="Updated Plan Name"),
     *             @OA\Property(property="monthly_price", type="number", example=12.99),
     *             @OA\Property(property="annually_price", type="number", example=129.99)
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Plan updated successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Plan updated successfully."),
     *             @OA\Property(property="plan", ref="#/components/schemas/Plan")
     *         )
     *     ),
     *     @OA\Response(response=403, description="Unauthorized")
     * )
     */
    public function update(Request $request, Plan $plan)
    {
        $this->authorizeAdmin();

        $validated = $request->validate([
            'name'           => 'sometimes|string|max:255',
            'monthly_price'  => 'sometimes|numeric|min:0',
            'annually_price' => 'sometimes|numeric|min:0',
        ]);

        $plan->update($validated);

        return response()->json([
            'message' => 'Plan updated successfully.',
            'plan'    => $plan
        ], 200);
    }

    /**
     * Delete a plan (Admin only).
     *
     * @OA\Delete(
     *     path="/api/plans/{plan_id}",
     *     summary="Delete a plan",
     *     description="Remove a plan by its ID. Only admins can perform this action.",
     *     tags={"Plans"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="plan_id",
     *         in="path",
     *         description="ID of the plan to delete",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Plan deleted successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Plan deleted successfully.")
     *         )
     *     ),
     *     @OA\Response(response=403, description="Unauthorized")
     * )
     */
    public function destroy(Plan $plan)
    {
        $this->authorizeAdmin();

        $plan->delete();

        return response()->json(['message' => 'Plan deleted successfully.'], 200);
    }

    /**
     * Helper function to enforce admin-only access.
     */
    private function authorizeAdmin()
    {
        if (Auth::user()->user_type !== 'admin') {
            abort(403, 'Unauthorized action.');
        }
    }
}
