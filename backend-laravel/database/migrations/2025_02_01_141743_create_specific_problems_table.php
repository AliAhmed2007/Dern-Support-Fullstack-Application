<?php

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
        Schema::create('specific_problems', function (Blueprint $table) {
            $table->id();
            $table->foreignId('general_problem_id')->constrained('general_problems')->onDelete('cascade'); // Link to general problem
            $table->string('specific_issue'); // Detailed issue (e.g., Battery not charging, Overheating)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('specific_problems');
    }
};
