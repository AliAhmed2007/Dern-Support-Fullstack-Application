<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Device;

class DeviceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $devices = [
            // Individual Devices
            [
                'name' => 'Smartphone',
                'category' => 'both',
                'user_type' => 'individual',
                'icon' => asset('storage/devices/phone.png'),
            ],
            [
                'name' => 'Laptop',
                'category' => 'both',
                'user_type' => 'individual',
                'icon' => asset('storage/devices/laptop.png'),
            ],
            [
                'name' => 'Desktop PC',
                'category' => 'both',
                'user_type' => 'individual',
                'icon' => asset('storage/devices/pcComputer.svg'),
            ],
            [
                'name' => 'Tablet',
                'category' => 'both',
                'user_type' => 'individual',
                'icon' => asset('storage/devices/tablet.png'),
            ],
            [
                'name' => 'Smartwatch',
                'category' => 'both',
                'user_type' => 'individual',
                'icon' => asset('storage/devices/watch.png'),
            ],
            [
                'name' => 'AirTag',
                'category' => 'hardware',
                'user_type' => 'individual',
                'icon' => asset('storage/devices/airTag.png'),
            ],
            [
                'name' => 'Printer',
                'category' => 'both',
                'user_type' => 'individual',
                'icon' => asset('storage/devices/printer.svg'),
            ],
            [
                'name' => 'AirPods',
                'category' => 'both',
                'user_type' => 'individual',
                'icon' => asset('storage/devices/airPods.png'),
            ],
            [
                'name' => 'TV',
                'category' => 'both',
                'user_type' => 'individual',
                'icon' => asset('storage/devices/tv.png'),
            ],
            [
                'name' => 'Account Management',
                'category' => 'software',
                'user_type' => 'individual',
                'icon' => asset('storage/devices/accountManagements.svg'),
            ],
            [
                'name' => 'Security',
                'category' => 'software',
                'user_type' => 'individual',
                'icon' => asset('storage/devices/security.svg'),
            ],
        
            // Business Devices
            [
                'name' => 'Server',
                'category' => 'both',
                'user_type' => 'business',
                'icon' => asset('storage/devices/server.png'),
            ],
            [
                'name' => 'Network Switch',
                'category' => 'hardware',
                'user_type' => 'business',
                'icon' => asset('storage/devices/networkSwitch.png'),
            ],
            [
                'name' => 'Firewall Appliance',
                'category' => 'both',
                'user_type' => 'business',
                'icon' => asset('storage/devices/firewall.jpg'),
            ],
            [
                'name' => 'Business Laptop',
                'category' => 'both',
                'user_type' => 'business',
                'icon' => asset('storage/devices/businessLaptop.png'),
            ],
            [
                'name' => 'Workstation PC',
                'category' => 'both',
                'user_type' => 'business',
                'icon' => asset('storage/devices/workStationPc.jpg'),
            ],
            [
                'name' => 'Cloud Storage Server',
                'category' => 'hardware',
                'user_type' => 'business',
                'icon' => asset('storage/devices/cloudServer.svg'),
            ],
            [
                'name' => 'VoIP Phone System',
                'category' => 'hardware',
                'user_type' => 'business',
                'icon' => asset('storage/devices/voipPhone.jpg'),
            ],
            [
                'name' => 'CCTV Surveillance System',
                'category' => 'both',
                'user_type' => 'business',
                'icon' => asset('storage/devices/cctvSystem.jpg'),
            ],
            [
                'name' => 'POS System',
                'category' => 'both',
                'user_type' => 'business',
                // Here, since no specific POS icon is provided, we reuse the printer icon.
                'icon' => asset('storage/devices/printer.svg'),
            ],
            [
                'name' => 'Account Management',
                'category' => 'software',
                'user_type' => 'business',
                'icon' => asset('storage/devices/accountManagements.svg'),
            ],
            [
                'name' => 'Security',
                'category' => 'software',
                'user_type' => 'business',
                'icon' => asset('storage/devices/security.svg'),
            ],
        ];
        
        Device::insert(values: $devices);
    }
}
