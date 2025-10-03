<?php

use App\Models\RepairRequest;
use App\Models\Technician;
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
        Schema::create('booked_time_slots', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Technician::class)->constrained()->onDelete('cascade');
            $table->foreignIdFor(RepairRequest::class)->constrained()->onDelete('cascade');
            $table->dateTime('start_date');
            $table->dateTime('end_date');
            $table->string('status')->default('booked'); // ✅ Add this line
            $table->timestamps();

            $table->unique(['technician_id', 'start_date', 'end_date']);

            // Indexes for filtering
            $table->index(['start_date', 'end_date']);
            $table->index('status'); // ✅ Now the status column exists
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('time_slots');
    }
};
