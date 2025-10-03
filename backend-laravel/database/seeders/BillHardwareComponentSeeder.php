<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Bill;
use App\Models\BillHardwareComponent;

class BillHardwareComponentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Ensure there are some Bill records to attach hardware components to.
        if (Bill::count() === 0) {
            // Create 10 bills if none exist.
            Bill::factory()->count(10)->create();
        }

        // For each bill, create between 2 and 5 hardware components.
        Bill::all()->each(function ($bill) {
            BillHardwareComponent::factory()->count(rand(2, 5))->create([
                'bill_id' => $bill->id,
            ]);
        });
    }
}
