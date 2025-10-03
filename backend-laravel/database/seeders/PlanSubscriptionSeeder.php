<?php

namespace Database\Seeders;

use App\Models\PlanSubscription;
use Illuminate\Database\Seeder;

class PlanSubscriptionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        PlanSubscription::factory()->count(20)->create();
    }
}
