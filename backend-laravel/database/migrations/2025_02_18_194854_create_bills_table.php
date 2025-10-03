<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Bill;
use App\Models\User;
use App\Models\RepairRequest;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bills', function (Blueprint $table) {
            $table->id();
            $table->string('bill_number')->unique();
            $table->foreignIdFor(User::class)->constrained()->onDelete('cascade');
            $table->foreignIdFor(RepairRequest::class)->nullable()->constrained()->onDelete('set null');
            $table->decimal('service_amount', 10, 2)->unsigned();
            $table->decimal('tax_amount', 10, 2)->unsigned()->default(0.00);
            $table->decimal('discount', 10, 2)->unsigned()->default(0.00);
            $table->decimal('final_amount', 10, 2)->unsigned();
            $table->decimal('courier_amount', 10, 2)->unsigned()->default(0.00);
            $table->enum('status', ['pending', 'paid', 'cancelled', 'refunded'])->default('pending');
            $table->enum('payment_method', ['cash', 'credit_card', 'bank_transfer', 'paypal'])->nullable();
            $table->dateTime('due_date')->nullable();
            $table->dateTime('issued_at')->useCurrent();
            $table->timestamps();
            $table->unique('repair_request_id');
        });

        Schema::create('bill_hardware_components', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Bill::class)->constrained()->onDelete('cascade');
            $table->string('component_name');
            $table->integer('quantity')->unsigned();
            $table->decimal('unit_price', 10, 2)->unsigned();
            $table->decimal('subtotal', 10, 2)->unsigned();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bill_hardware_components');
        Schema::dropIfExists('bills');
    }
};
