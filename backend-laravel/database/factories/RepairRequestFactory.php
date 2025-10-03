<?php

namespace Database\Factories;

use App\Models\RepairRequest;
use App\Models\Device;
use App\Models\GeneralProblem;
use App\Models\SpecificProblem;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class RepairRequestFactory extends Factory
{
    protected $model = RepairRequest::class;

    public function definition()
    {
        return [
            'user_id' => User::inRandomOrder()->first()->id,
            'device_id' => Device::inRandomOrder()->first()->id,
            'general_problem_id' => GeneralProblem::inRandomOrder()->first()->id,
            'specific_problem_id' => SpecificProblem::inRandomOrder()->first()->id,
            'device_brand' => $this->faker->company(),
            'device_name' => $this->faker->name(),
            'status' => $this->faker->randomElement(['pending', 'diagnostics', 'in progress', 'completed', 'cancelled']),
            'priority' => $this->faker->randomElement(['critical', 'high', 'normal', 'low']),
            'mode' => $this->faker->randomElement(['physical', 'online']),
            'problem' => $this->faker->text(),
            'problem_description' => $this->faker->optional()->text(),
            'repair_outcome' => $this->faker->randomElement(['successful', 'unsuccessful', 'pending']),
            'technician_notes' => $this->faker->optional()->text(),
        ];
    }
}
