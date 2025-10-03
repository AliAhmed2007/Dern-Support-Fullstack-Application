<?php

use App\Models\Plan;
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
        Schema::create('plan_subscriptions', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(model: User::class)->constrained()->onDelete('cascade');
            $table->foreignIdFor(model: Plan::class)->constrained()->onDelete('cascade');
            $table->enum('type', ['annually', 'monthly'])->default('monthly');
            $table->decimal('price', 6, 2);
            $table->date('start_date');
            $table->date('expiry_date');
            $table->enum('status', ['active', 'expired', 'cancelled'])->default('active');
            $table->foreignIdFor(User::class, column: 'controlled_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plan_subscriptions');
    }
};
