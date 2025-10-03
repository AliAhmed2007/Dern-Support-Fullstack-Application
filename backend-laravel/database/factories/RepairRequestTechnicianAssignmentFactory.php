<?php

namespace Database\Factories;

use App\Models\RepairRequest;
use App\Models\Technician;
use Illuminate\Database\Eloquent\Factories\Factory;

class RepairRequestTechnicianAssignmentFactory extends Factory
{
    public function definition()
    {
        return [
            'repair_request_id' => RepairRequest::factory(),
            'technician_id'     => Technician::factory(),
            'assigned_at'       => now(),
        ];
    }
}
