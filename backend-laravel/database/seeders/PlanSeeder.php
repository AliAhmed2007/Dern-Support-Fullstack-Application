<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Plan;

class PlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Plan::insert([
            [
                'name' => 'Basic',
                'monthly_price' => 29.99,
                'annually_price' => 299.99,
                'features' => json_encode([
                    'Email support within 24 hours',
                    'Access to knowledge base',
                    'Monthly system check',
                    'Remote diagnostics'
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Business',
                'monthly_price' => 59.99,
                'annually_price' => 599.99,
                'features' => json_encode([
                    'Priority email & phone support',
                    'Full access to knowledge base',
                    'Weekly system check',
                    'Remote diagnostics & repair',
                    'Quarterly performance optimization'
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Enterprise',
                'monthly_price' => 129.99,
                'annually_price' => 1299.99,
                'features' => json_encode([
                    '24/7 dedicated support team',
                    'Complete system management',
                    'Daily system checks',
                    'Advanced remote troubleshooting',
                    'Monthly performance optimization',
                    'Security audits & monitoring'
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
