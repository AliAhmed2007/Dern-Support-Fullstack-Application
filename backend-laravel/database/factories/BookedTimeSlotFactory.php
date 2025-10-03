<?php

namespace Database\Factories;

use App\Models\BookedTimeSlot;
use App\Models\Technician;
use App\Models\RepairRequest;
use Illuminate\Database\Eloquent\Factories\Factory;

class BookedTimeSlotFactory extends Factory
{
    protected $model = BookedTimeSlot::class;

    public function definition(): array
    {
        $start = $this->faker->dateTimeBetween('-1 week', '+2 weeks');

        return [
            'technician_id' => Technician::query()->inRandomOrder()->value('id'),
            'repair_request_id' => RepairRequest::factory()->state([
                'status' => $this->faker->randomElement([
                    'pending',
                    'diagnostics',
                    'in progress'
                ])
            ]),
            'start_date' => $start,
            'end_date' => (clone $start)->modify('+' . rand(1, 4) . ' hours'),
            'status' => 'booked'
        ];
    }

    /**
     * Add state variations
     */
    public function configure()
    {
        return $this->afterCreating(function (BookedTimeSlot $slot) {
            // 10% chance to mark as cancelled
            if ($this->faker->boolean(10)) {
                $slot->update(['status' => 'cancelled']);
            }
        });
    }
}
