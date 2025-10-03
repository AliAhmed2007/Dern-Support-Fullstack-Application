<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(25)->create();
        $this->call([
            PlanSeeder::class,
            DeviceSeeder::class,
            GeneralProblemSeeder::class,
            SpecificProblemSeeder::class,
            PlanSubscriptionSeeder::class,
            RepairRequestSeeder::class,
            BookedTimeSlotSeeder::class,
            BillSeeder::class,
            TicketSeeder::class,
            BillHardwareComponentSeeder::class
        ]);
    }
}
