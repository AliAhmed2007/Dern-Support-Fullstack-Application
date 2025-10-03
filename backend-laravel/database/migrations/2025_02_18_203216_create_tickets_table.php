<?php

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
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)->constrained()->onDelete('cascade');
            $table->text('description');
            $table->enum('ticket_type', ['repair request', 'general inquiry', 'problem reporting'])->default('general inquiry');
            $table->enum('status', ['in progress', 'cancelled', 'resolved'])->default('in progress');
            $table->foreignIdFor(User::class, 'controlled_by')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('repair_request_id')->nullable()->constrained('repair_requests')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};
