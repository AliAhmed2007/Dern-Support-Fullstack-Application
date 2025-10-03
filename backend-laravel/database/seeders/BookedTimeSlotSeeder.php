<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\BookedTimeSlot;

class BookedTimeSlotSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        BookedTimeSlot::factory()
            ->count(30) 
            ->create();
    }
}
