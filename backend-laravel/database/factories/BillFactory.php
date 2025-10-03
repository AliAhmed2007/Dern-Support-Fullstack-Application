<?php

namespace Database\Factories;

use App\Models\Bill;
use App\Models\User;
use App\Models\RepairRequest;
use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Generator as Faker;

class BillFactory extends Factory
{
    protected $model = Bill::class;

    // In Database\Factories\BillFactory.php

    public function definition()
    {
        $repairRequest =  RepairRequest::factory()->create();

        $serviceAmount = $this->faker->randomFloat(2, 50, 500);
        $taxAmount = $this->faker->randomFloat(2, 5, 50);
        $courierAmount = $this->faker->randomFloat(2, 5, 30);
        $discount = $this->faker->randomFloat(2, 0, 50);

        return [
            'user_id' => $repairRequest->user_id,
            'repair_request_id' => $repairRequest->id,
            'service_amount' => $serviceAmount,
            'tax_amount' => $taxAmount,
            'discount' => $discount,
            'courier_amount' => $courierAmount,
            'payment_method' => $this->faker->randomElement(['cash', 'credit_card', 'bank_transfer', 'paypal']),
            'due_date' => $this->faker->dateTimeBetween('+1 week', '+1 month'),
            'status' => $this->faker->randomElement(['pending', 'paid', 'cancelled', 'refunded']),
            'bill_number' => 'BILL-' . $this->faker->unique()->regexify('[A-Z0-9]{6}'),
            // Calculate initial final_amount without hardware components
            'final_amount' => ($serviceAmount + $taxAmount + $courierAmount) - $discount,
        ];
    }
}
