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
        Schema::create('technicians', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('city');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('phone_number');
            $table->enum('specialization', ['hardware', 'software']);
            $table->decimal('rating', 3, 1)->unsigned()->nullable();
            $table->enum('status', ['available', 'booked',  'unavailable'])->default('available');;
            $table->string('avatar')->nullable(); // Profile picture path
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('technicians');
    }
};
