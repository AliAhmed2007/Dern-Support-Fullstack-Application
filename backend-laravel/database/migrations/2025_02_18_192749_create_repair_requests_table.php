<?php

use App\Models\RepairRequest;
use App\Models\Technician;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Repair Requests Table
        Schema::create('repair_requests', function (Blueprint $table) {
            $table->id();
            
            $table->foreignIdFor(User::class)->constrained()->onDelete('cascade');
            $table->foreignId('device_id')->constrained('devices')->onDelete('cascade');
            $table->foreignId('general_problem_id')->constrained('general_problems')->onDelete('cascade');
            $table->foreignId('specific_problem_id')->nullable()->constrained('specific_problems')->onDelete('cascade');
            
            // Additional device details (which the user will input)
            $table->string('device_brand');
            $table->string('device_name');
            $table->enum('courier', ['enable', 'disable'])->default('disable');
            $table->enum('status', ['pending', 'diagnostics', 'in progress', 'completed', 'cancelled'])->default('pending');
            $table->enum('priority', ['critical', 'high', 'normal', 'low'])->default('normal');
            $table->enum('mode', ['physical', 'online'])->default('online');
            $table->text('problem');
            $table->text('problem_description')->nullable();

            // Attachments for images, receipts, or diagnostics
            $table->json('attachments')->nullable(); // Example: JSON storing file URLs

            // Repair Outcome Details
            $table->enum('repair_outcome', ['successful', 'unsuccessful', 'pending'])->default('pending');
            $table->text('technician_notes')->nullable(); // Notes from technician about repair status
            
            $table->timestamps();
        });

        // Pivot Table: Repair Request - Technician Assignments
        Schema::create('repair_requests_technician_assignments', function (Blueprint $table) {
            $table->foreignIdFor(RepairRequest::class)->constrained()->onDelete('cascade');
            $table->foreignIdFor(Technician::class)->constrained()->onDelete('cascade');
            $table->primary(['repair_request_id', 'technician_id']);
            $table->timestamp('assigned_at')->useCurrent();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('repair_requests');
        Schema::dropIfExists('repair_requests_technician_assignments');
    }
};
