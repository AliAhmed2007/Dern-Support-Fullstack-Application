<?php

namespace Database\Factories;

use App\Models\Ticket;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class TicketFactory extends Factory
{
    protected $model = Ticket::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => User::inRandomOrder()->first()->id,  // Randomly select a user
            'description' => $this->faker->sentence(10), // Random description
            'ticket_type' => $this->faker->randomElement(['repair request', 'general inquiry', 'problem reporting']),
            'status' => $this->faker->randomElement(['in progress', 'cancelled', 'resolved']),
            'controlled_by' => User::where('user_type', 'admin')->inRandomOrder()->first()->id, // Randomly select an admin user
        ];
    }
}
