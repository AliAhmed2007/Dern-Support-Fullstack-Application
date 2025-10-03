<?php

namespace Database\Factories;

use App\Models\Bill;
use App\Models\BillHardwareComponent;
use Illuminate\Database\Eloquent\Factories\Factory;

class BillHardwareComponentFactory extends Factory
{
    protected $model = BillHardwareComponent::class;

    public function definition()
    {
        $quantity  = $this->faker->numberBetween(1, 5);
        $unitPrice = $this->faker->randomFloat(2, 10, 100);

        return [
            // If you want to create a Bill if none exists:
            // 'bill_id' => Bill::factory(),

            // If bills exist, pick one at random:
            'bill_id'        => Bill::inRandomOrder()->first()->id ?? Bill::factory(),
            'component_name' => $this->faker->word,
            'quantity'       => $quantity,
            'unit_price'     => $unitPrice,
            'subtotal'       => $quantity * $unitPrice,
        ];
    }
}
