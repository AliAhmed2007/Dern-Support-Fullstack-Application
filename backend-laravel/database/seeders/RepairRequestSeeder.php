<?php

namespace Database\Seeders;

use App\Models\RepairRequest;
use App\Models\RepairRequestTechnicianAssignment;
use App\Models\Technician;
use App\Models\User;
use Illuminate\Database\Seeder;

class RepairRequestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Fetch all users and technicians once for efficiency
        $users = User::all();
        $technicians = Technician::all();

        // Ensure there are users and technicians to assign
        if ($users->isEmpty() || $technicians->isEmpty()) {
            $this->command->warn('No users or technicians found. Seeding aborted.');
            return;
        }

        // Filter out admin and technician users so only "individual" and "business" remain
        $eligibleUsers = $users->whereIn('user_type', ['individual', 'business']);

        if ($eligibleUsers->isEmpty()) {
            $this->command->warn('No eligible users found. Seeding aborted.');
            return;
        }

        // Create 20 repair requests, each assigned to a random eligible user
        $repairRequests = RepairRequest::factory(20)->create([
            'user_id' => $eligibleUsers->random()->id,
        ]);

        // Assign 1 to 3 random technicians to each repair request
        $repairRequests->each(function ($request) use ($technicians) {
            $assignedTechnicians = $technicians->random(rand(1, 3)); // Select 1 to 3 technicians

            $assignedTechnicians->each(function ($technician) use ($request) {
                RepairRequestTechnicianAssignment::create([
                    'repair_request_id' => $request->id,
                    'technician_id'     => $technician->id,
                    'assigned_at'       => now(),
                ]);
            });
        });
    }
}
