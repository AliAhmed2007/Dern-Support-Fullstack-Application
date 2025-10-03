<?php

namespace Database\Factories;

use App\Models\PlanSubscription;
use App\Models\User;
use App\Models\Plan;
use Illuminate\Database\Eloquent\Factories\Factory;
use Carbon\Carbon;

class PlanSubscriptionFactory extends Factory
{
    protected $model = PlanSubscription::class;

    public function definition(): array
    {
        // Randomly select a subscription type.
        $type = $this->faker->randomElement(['annually', 'monthly']);
        // Generate a start date sometime in the past year.
        $startDate = $this->faker->dateTimeBetween('-1 year', 'now');
        // Set the expiry date based on the type.
        $expiryDate = clone $startDate;
        if ($type === 'monthly') {
            $expiryDate->modify('+1 month');
        } else {
            $expiryDate->modify('+1 year');
        }

        return [
            'user_id' => function () {
                $user = User::whereIn('user_type', ['business', 'individual'])->inRandomOrder()->first();

                return $user?->id ?? User::factory()->state([
                    'user_type' => fake()->randomElement(['business', 'individual'])
                ])->create()->id;
            },

            'plan_id' => Plan::inRandomOrder()->first()->id,
            'type' => $type,
            // Determine the price from the related plan.
            'price' => function (array $attributes) use ($type) {
                // When using factory relationships, the plan_id will be an ID.
                $plan = Plan::find($attributes['plan_id']);
                if ($plan) {
                    return $type === 'monthly' ? $plan->monthly_price : $plan->annually_price;
                }
                // Fallback if something unexpected occurs.
                return $this->faker->randomFloat(2, 10, 500);
            },
            'start_date' => Carbon::instance($startDate)->format('Y-m-d'),
            'expiry_date' => Carbon::instance($expiryDate)->format('Y-m-d'),
            'status' => $this->faker->randomElement(['active', 'expired']),
            // controlled_by is either a User (created via factory) or null.
            'controlled_by' => function () {
                // Get a random admin user ID from the database
                $adminUser = User::where('user_type', 'admin')->inRandomOrder()->first();

                return $adminUser?->id;
            },
        ];
    }
}
