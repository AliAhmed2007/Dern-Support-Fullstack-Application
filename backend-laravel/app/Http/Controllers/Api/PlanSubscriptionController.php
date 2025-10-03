<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\PlanSubscription;
use App\Models\Plan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use OpenApi\Annotations as OA;
/**
 * @OA\Tag(
 *     name="Subscriptions",
 *     description="Plan subscription management"
 * )
 */
class PlanSubscriptionController extends Controller
{
    /**
     * List all subscriptions (Admin only).
     *
     * @OA\Get(
     *     path="/api/subscriptions",
     *     summary="List all subscriptions (Admin only)",
     *     description="Retrieve a list of all subscriptions. (Admin only)",
     *     tags={"Subscriptions"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="List of subscriptions",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/PlanSubscription")
     *         )
     *     ),
     *     @OA\Response(response=403, ref="#/components/responses/Unauthorized")
     * )
     */
    public function index()
    {
        $this->authorizeAdmin();
        return response()->json(PlanSubscription::all(), 200);
    }

    /**
     * Create a new subscription.
     *
     * @OA\Post(
     *     path="/api/subscriptions",
     *     summary="Create new subscription",
     *     description="Create a new subscription for the authenticated user.",
     *     tags={"Subscriptions"},
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         description="Subscription details",
     *         @OA\JsonContent(ref="#/components/schemas/PlanSubscriptionCreate")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Subscription created successfully",
     *         @OA\JsonContent(ref="#/components/schemas/PlanSubscription")
     *     ),
     *     @OA\Response(response=400, description="Existing active subscription"),
     *     @OA\Response(response=422, ref="#/components/responses/ValidationError")
     * )
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'plan_id' => 'required|exists:plans,id',
            'type'    => 'required|in:monthly,annually',
        ], [
            'plan_id.required' => 'The plan ID is required and must be a valid plan.',
            'plan_id.exists'   => 'The selected plan does not exist in our records.',
            'type.required'    => 'The type is required and must be either "monthly" or "annually".',
            'type.in'          => 'The type must be either "monthly" or "annually".',
        ]);

        $user = Auth::user();
        if ($user->subscriptions()->where('status', 'active')->exists()) {
            return response()->json(['message' => 'You already have an active subscription.'], 400);
        }

        $plan = Plan::find($validated['plan_id']);
        $startDate = now();
        $expiryDate = ($validated['type'] === 'monthly') ? now()->addMonth() : now()->addYear();
        $price = ($validated['type'] === 'monthly') ? $plan->monthly_price : $plan->annually_price;

        $subscription = PlanSubscription::create([
            'user_id'     => $user->id,
            'plan_id'     => $plan->id,
            'type'        => $validated['type'],
            'price'       => $price,
            'start_date'  => $startDate,
            'expiry_date' => $expiryDate,
            'status'      => 'active',
            'controlled_by' => null,
        ]);

        return response()->json([
            'message' => 'Subscription created successfully.',
            'subscription' => $subscription
        ], 201);
    }

    /**
     * Get subscription details.
     *
     * @OA\Get(
     *     path="/api/subscriptions/{id}",
     *     summary="Get subscription details",
     *     description="Retrieve details of a specific subscription by its ID.",
     *     tags={"Subscriptions"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="Subscription ID",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Subscription details",
     *         @OA\JsonContent(ref="#/components/schemas/PlanSubscription")
     *     ),
     *     @OA\Response(response=403, ref="#/components/responses/Unauthorized"),
     *     @OA\Response(response=404, ref="#/components/responses/NotFound")
     * )
     */
    public function show(PlanSubscription $planSubscription)
    {
        $this->authorizeOwnerOrAdmin($planSubscription);
        return response()->json($planSubscription, 200);
    }

    /**
     * Update an existing subscription.
     *
     * @OA\Put(
     *     path="/api/subscriptions/{id}",
     *     summary="Update subscription",
     *     description="Update details of a subscription.",
     *     tags={"Subscriptions"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="Subscription ID",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         description="Subscription update data",
     *         @OA\JsonContent(ref="#/components/schemas/PlanSubscriptionUpdate")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Subscription updated successfully",
     *         @OA\JsonContent(ref="#/components/schemas/PlanSubscription")
     *     ),
     *     @OA\Response(response=403, ref="#/components/responses/Unauthorized"),
     *     @OA\Response(response=422, ref="#/components/responses/ValidationError")
     * )
     */
    public function update(Request $request, PlanSubscription $planSubscription)
    {
        $this->authorizeOwnerOrAdmin($planSubscription);

        $validated = $request->validate([
            'type' => 'sometimes|in:monthly,annually',
        ], [
            'type.required' => 'The type is required and must be either "monthly" or "annually".',
            'type.in'       => 'The type must be either "monthly" or "annually".',
        ]);

        if (isset($validated['type'])) {
            $plan = $planSubscription->plan;
            $planSubscription->type = $validated['type'];
            $planSubscription->expiry_date = ($validated['type'] === 'monthly') ? now()->addMonth() : now()->addYear();
            $planSubscription->price = ($validated['type'] === 'monthly') ? $plan->monthly_price : $plan->annually_price;
        }

        $planSubscription->save();

        return response()->json([
            'message' => 'Subscription updated successfully.',
            'subscription' => $planSubscription
        ], 200);
    }

    /**
     * Cancel a subscription.
     *
     * @OA\Delete(
     *     path="/api/subscriptions/{id}",
     *     summary="Cancel subscription",
     *     description="Cancel the specified subscription.",
     *     tags={"Subscriptions"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="Subscription ID",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Subscription canceled successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Subscription canceled successfully.")
     *         )
     *     ),
     *     @OA\Response(response=403, ref="#/components/responses/Unauthorized"),
     *     @OA\Response(response=404, ref="#/components/responses/NotFound")
     * )
     */
    public function destroy(PlanSubscription $planSubscription)
    {
        $this->authorizeOwnerOrAdmin($planSubscription);
        $planSubscription->update(['status' => 'canceled']);
        return response()->json(['message' => 'Subscription canceled successfully.'], 200);
    }

    /**
     * Helper: Enforce admin-only access.
     */
    private function authorizeAdmin()
    {
        if (Auth::user()->user_type !== 'admin') {
            abort(403, 'Unauthorized action.');
        }
    }

    /**
     * Helper: Enforce that the current user is either the subscription owner or an admin.
     *
     * @param PlanSubscription $planSubscription
     */
    private function authorizeOwnerOrAdmin(PlanSubscription $planSubscription)
    {
        if (Auth::user()->id !== $planSubscription->user_id && Auth::user()->user_type !== 'admin') {
            abort(403, 'Unauthorized action.');
        }
    }
}
