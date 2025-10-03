<?php

namespace Database\Seeders;

use App\Models\GeneralProblem;
use Illuminate\Database\Seeder;

class GeneralProblemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $generalProblems = [
            // Device 1
            [
                'device_id'   => 1,
                'problem_name'=> 'Repairs & Physical Damage',
                'category'    => 'hardware',
                'icon'        => asset('storage/general-problems/repair-damage.svg')
            ],
            [
                'device_id'   => 1,
                'problem_name'=> 'Passwords & Security Issues',
                'category'    => 'software',
                'icon'        => asset('storage/general-problems/security.svg')
            ],
            [
                'device_id'   => 1,
                'problem_name'=> 'Update, Backup & Restore Failures',
                'category'    => 'software',
                'icon'        => asset('storage/general-problems/backup-restore.svg')
            ],
            [
                'device_id'   => 1,
                'problem_name'=> 'Device Performance Problems',
                'category'    => 'both',
                'icon'        => asset('storage/general-problems/performance.svg')
            ],
            [
                'device_id'   => 1,
                'problem_name'=> 'App Crashes',
                'category'    => 'software',
                'icon'        => asset('storage/general-problems/app-crushes.svg')
            ],
            [
                'device_id'   => 1,
                'problem_name'=> 'more',
                'category'    => 'both',
                'icon'        => asset('storage/general-problems/more.svg')
            ],
        
            // Device 2 - Laptop General Problems
            [
                'device_id'   => 2,
                'problem_name'=> 'Apps & Software Issues',
                'category'    => 'software',
                'icon'        => asset('storage/general-problems/apps-software.svg')
            ],
            [
                'device_id'   => 2,
                'problem_name'=> 'Internet Connectivity Problems',
                'category'    => 'both',
                'icon'        => asset('storage/general-problems/wifi.svg')
            ],
            [
                'device_id'   => 2,
                'problem_name'=> 'Battery & Power Failures',
                'category'    => 'hardware',
                'icon'        => asset('storage/general-problems/batteryPower.svg')
            ],
            [
                'device_id'   => 2,
                'problem_name'=> 'Accessory Compatibility Issues',
                'category'    => 'hardware',
                'icon'        => asset('storage/general-problems/accessories.svg')
            ],
            [
                'device_id'   => 2,
                'problem_name'=> 'Physical or Liquid Damage',
                'category'    => 'hardware',
                'icon'        => asset('storage/general-problems/repair-damage.svg')
            ],
            [
                'device_id'   => 2,
                'problem_name'=> 'Performance Slowdowns',
                'category'    => 'software',
                'icon'        => asset('storage/general-problems/performance.svg')
            ],
            [
                'device_id'   => 2,
                'problem_name'=> 'more',
                'category'    => 'both',
                'icon'        => asset('storage/general-problems/more.svg')
            ],
        
            // Device 3 - Desktop PC General Problems
            [
                'device_id'   => 3,
                'problem_name'=> 'Hardware Failures (e.g., PSU, GPU)',
                'category'    => 'hardware',
                'icon'        => asset('storage/general-problems/exclamation.svg')
            ],
            [
                'device_id'   => 3,
                'problem_name'=> 'Operating System Crashes',
                'category'    => 'software',
                'icon'        => asset('storage/general-problems/app-crushes.svg')
            ],
            [
                'device_id'   => 3,
                'problem_name'=> 'Peripheral Connectivity Issues',
                'category'    => 'hardware',
                'icon'        => asset('storage/general-problems/bluetooth.svg')
            ],
            [
                'device_id'   => 3,
                'problem_name'=> 'Slow Boot Times',
                'category'    => 'software',
                'icon'        => asset('storage/general-problems/performance.svg')
            ],
            [
                'device_id'   => 3,
                'problem_name'=> 'Overheating Problems',
                'category'    => 'hardware',
                'icon'        => asset('storage/general-problems/power.svg')
            ],
            [
                'device_id'   => 3,
                'problem_name'=> 'more',
                'category'    => 'both',
                'icon'        => asset('storage/general-problems/more.svg')
            ],
        
            // Device 4 - Tablet General Problems
            [
                'device_id'   => 4,
                'problem_name'=> 'Repairs & Physical Damage',
                'category'    => 'hardware',
                'icon'        => asset('storage/general-problems/repair-damage.svg')
            ],
            [
                'device_id'   => 4,
                'problem_name'=> 'Passwords & Security Issues',
                'category'    => 'software',
                'icon'        => asset('storage/general-problems/security.svg')
            ],
            [
                'device_id'   => 4,
                'problem_name'=> 'Update, Backup & Restore Failures',
                'category'    => 'software',
                'icon'        => asset('storage/general-problems/backup-restore.svg')
            ],
            [
                'device_id'   => 4,
                'problem_name'=> 'Device Performance Problems',
                'category'    => 'both',
                'icon'        => asset('storage/general-problems/performance.svg')
            ],
            [
                'device_id'   => 4,
                'problem_name'=> 'Touchscreen Malfunctions',
                'category'    => 'hardware',
                'icon'        => asset('storage/general-problems/accessibility.svg')
            ],
        
            // Device 5 - Smartwatch General Problems
            [
                'device_id'   => 5,
                'problem_name'=> 'Power, Battery & Charging Issues',
                'category'    => 'hardware',
                'icon'        => asset('storage/general-problems/batteryPower.svg')
            ],
            [
                'device_id'   => 5,
                'problem_name'=> 'Repairs & Physical Damage',
                'category'    => 'hardware',
                'icon'        => asset('storage/general-problems/repair-damage.svg')
            ],
            [
                'device_id'   => 5,
                'problem_name'=> 'Apps & Software Glitches',
                'category'    => 'software',
                'icon'        => asset('storage/general-problems/apps-software.svg')
            ],
            [
                'device_id'   => 5,
                'problem_name'=> 'Account & Cloud Sync Issues',
                'category'    => 'software',
                'icon'        => asset('storage/general-problems/sync.svg')
            ],
            [
                'device_id'   => 5,
                'problem_name'=> 'Pairing & Connectivity Problems',
                'category'    => 'both',
                'icon'        => asset('storage/general-problems/bluetooth.svg')
            ],
        
            // Device 6 - AirTag General Problems
            [
                'device_id'   => 6,
                'problem_name'=> 'Location Tracking Issues',
                'category'    => 'hardware',
                'icon'        => asset('storage/general-problems/accessibility.svg')
            ],
            [
                'device_id'   => 6,
                'problem_name'=> 'Battery Replacement Problems',
                'category'    => 'hardware',
                'icon'        => asset('storage/general-problems/batteryPower.svg')
            ],
            [
                'device_id'   => 6,
                'problem_name'=> 'Pairing Failures',
                'category'    => 'hardware',
                'icon'        => asset('storage/general-problems/bluetooth.svg')
            ],
        
            // Device 7 - Printer General Problems
            [
                'device_id'   => 7,
                'problem_name'=> 'Paper Jams',
                'category'    => 'hardware',
                'icon'        => asset('storage/general-problems/exclamation.svg')
            ],
            [
                'device_id'   => 7,
                'problem_name'=> 'Ink or Toner Issues',
                'category'    => 'hardware',
                'icon'        => asset('storage/general-problems/accessories.svg')
            ],
            [
                'device_id'   => 7,
                'problem_name'=> 'Network Printing Failures',
                'category'    => 'both',
                'icon'        => asset('storage/general-problems/wifi.svg')
            ],
            [
                'device_id'   => 7,
                'problem_name'=> 'Driver Installation Problems',
                'category'    => 'software',
                'icon'        => asset('storage/general-problems/apps-software.svg')
            ],
        
            // Device 8 - AirPods General Problems
            [
                'device_id'   => 8,
                'problem_name'=> 'Audio Quality Issues',
                'category'    => 'hardware',
                'icon'        => asset('storage/general-problems/audio.svg')
            ],
            [
                'device_id'   => 8,
                'problem_name'=> 'Charging Case Malfunctions',
                'category'    => 'hardware',
                'icon'        => asset('storage/general-problems/batteryPower.svg')
            ],
            [
                'device_id'   => 8,
                'problem_name'=> 'Bluetooth Connectivity Problems',
                'category'    => 'both',
                'icon'        => asset('storage/general-problems/bluetooth.svg')
            ],
        
            // Device 9 - TV General Problems
            [
                'device_id'   => 9,
                'problem_name'=> 'Display Malfunctions',
                'category'    => 'hardware',
                'icon'        => asset('storage/general-problems/repair-damage.svg')
            ],
            [
                'device_id'   => 9,
                'problem_name'=> 'Remote Control Issues',
                'category'    => 'hardware',
                'icon'        => asset('storage/general-problems/accessories.svg')
            ],
            [
                'device_id'   => 9,
                'problem_name'=> 'Streaming App Failures',
                'category'    => 'software',
                'icon'        => asset('storage/general-problems/apps-software.svg')
            ],
        
            // Device 10 - Account Management General Problems
            [
                'device_id'   => 10,
                'problem_name'=> 'Login Failures',
                'category'    => 'software',
                'icon'        => asset('storage/general-problems/security.svg')
            ],
            [
                'device_id'   => 10,
                'problem_name'=> 'Account Recovery Issues',
                'category'    => 'software',
                'icon'        => asset('storage/general-problems/security.svg')
            ],
            [
                'device_id'   => 10,
                'problem_name'=> 'Permission & Access Problems',
                'category'    => 'software',
                'icon'        => asset('storage/general-problems/security.svg')
            ],
        
            // Device 11 - Security General Problems
            [
                'device_id'   => 11,
                'problem_name'=> 'Malware Infections',
                'category'    => 'software',
                'icon'        => asset('storage/general-problems/security.svg')
            ],
            [
                'device_id'   => 11,
                'problem_name'=> 'Firewall Configuration Issues',
                'category'    => 'software',
                'icon'        => asset('storage/general-problems/security.svg')
            ],
            [
                'device_id'   => 11,
                'problem_name'=> 'Unauthorized Access Attempts',
                'category'    => 'software',
                'icon'        => asset('storage/general-problems/security.svg')
            ],
        
            // Device 12 - Server General Problems
            [
                'device_id'   => 12,
                'problem_name'=> 'Server Downtime',
                'category'    => 'both',
                'icon'        => asset('storage/general-problems/exclamation.svg')
            ],
            [
                'device_id'   => 12,
                'problem_name'=> 'Data Backup Failures',
                'category'    => 'software',
                'icon'        => asset('storage/general-problems/backup-restore.svg')
            ],
            [
                'device_id'   => 12,
                'problem_name'=> 'Hardware Overheating',
                'category'    => 'hardware',
                'icon'        => asset('storage/general-problems/power.svg')
            ],
            [
                'device_id'   => 12,
                'problem_name'=> 'Network Configuration Issues',
                'category'    => 'software',
                'icon'        => asset('storage/general-problems/wifi.svg')
            ],
            [
                'device_id'   => 12,
                'problem_name'=> 'Storage Capacity Problems',
                'category'    => 'hardware',
                'icon'        => asset('storage/general-problems/backup-restore.svg')
            ],
            [
                'device_id'   => 12,
                'problem_name'=> 'more',
                'category'    => 'both',
                'icon'        => asset('storage/general-problems/more.svg')
            ],
        
            // Device 13 - Network Switch General Problems
            [
                'device_id'   => 13,
                'problem_name'=> 'Port Failures',
                'category'    => 'hardware',
                'icon'        => asset('storage/general-problems/exclamation.svg')
            ],
            [
                'device_id'   => 13,
                'problem_name'=> 'Network Congestion',
                'category'    => 'hardware',
                'icon'        => asset('storage/general-problems/wifi.svg')
            ],
            [
                'device_id'   => 13,
                'problem_name'=> 'Firmware Update Issues',
                'category'    => 'software',
                'icon'        => asset('storage/general-problems/apps-software.svg')
            ],
            [
                'device_id'   => 13,
                'problem_name'=> 'more',
                'category'    => 'both',
                'icon'        => asset('storage/general-problems/more.svg')
            ],
        
            // Device 14 - Firewall Appliance General Problems
            [
                'device_id'   => 14,
                'problem_name'=> 'Configuration Errors',
                'category'    => 'software',
                'icon'        => asset('storage/general-problems/exclamation.svg')
            ],
            [
                'device_id'   => 14,
                'problem_name'=> 'Traffic Blocking Issues',
                'category'    => 'software',
                'icon'        => asset('storage/general-problems/security.svg')
            ],
            [
                'device_id'   => 14,
                'problem_name'=> 'Hardware Failures',
                'category'    => 'hardware',
                'icon'        => asset('storage/general-problems/repair-damage.svg')
            ],
            [
                'device_id'   => 14,
                'problem_name'=> 'Network Latency Problems',
                'category'    => 'both',
                'icon'        => asset('storage/general-problems/wifi.svg')
            ],
            [
                'device_id'   => 14,
                'problem_name'=> 'Unauthorized Access Attempts',
                'category'    => 'software',
                'icon'        => asset('storage/general-problems/security.svg')
            ],
            [
                'device_id'   => 14,
                'problem_name'=> 'more',
                'category'    => 'both',
                'icon'        => asset('storage/general-problems/more.svg')
            ],
        
            // Device 15 - Business Laptop General Problems
            [
                'device_id'   => 15,
                'problem_name'=> 'VPN Connectivity Issues',
                'category'    => 'software',
                'icon'        => asset('storage/general-problems/wifi.svg')
            ],
            [
                'device_id'   => 15,
                'problem_name'=> 'Battery Degradation',
                'category'    => 'hardware',
                'icon'        => asset('storage/general-problems/batteryPower.svg')
            ],
            [
                'device_id'   => 15,
                'problem_name'=> 'Software Compatibility Problems',
                'category'    => 'software',
                'icon'        => asset('storage/general-problems/apps-software.svg')
            ],
            [
                'device_id'   => 15,
                'problem_name'=> 'more',
                'category'    => 'both',
                'icon'        => asset('storage/general-problems/more.svg')
            ],
        
            // Device 16 - Desktop PC General Problems (Business)
            [
                'device_id'   => 16,
                'problem_name'=> 'Hardware Failures (e.g., PSU, GPU)',
                'category'    => 'hardware',
                'icon'        => asset('storage/general-problems/exclamation.svg')
            ],
            [
                'device_id'   => 16,
                'problem_name'=> 'Operating System Crashes',
                'category'    => 'software',
                'icon'        => asset('storage/general-problems/app-crushes.svg')
            ],
            [
                'device_id'   => 16,
                'problem_name'=> 'Peripheral Connectivity Issues',
                'category'    => 'hardware',
                'icon'        => asset('storage/general-problems/bluetooth.svg')
            ],
            [
                'device_id'   => 16,
                'problem_name'=> 'Slow Boot Times',
                'category'    => 'software',
                'icon'        => asset('storage/general-problems/performance.svg')
            ],
            [
                'device_id'   => 16,
                'problem_name'=> 'Overheating Problems',
                'category'    => 'hardware',
                'icon'        => asset('storage/general-problems/power.svg')
            ],
            [
                'device_id'   => 16,
                'problem_name'=> 'more',
                'category'    => 'both',
                'icon'        => asset('storage/general-problems/more.svg')
            ],
        
            // Device 17 - Cloud Storage Server General Problems
            [
                'device_id'   => 17,
                'problem_name'=> 'Data Sync Failures',
                'category'    => 'hardware',
                'icon'        => asset('storage/general-problems/sync.svg')
            ],
            [
                'device_id'   => 17,
                'problem_name'=> 'Access Permission Issues',
                'category'    => 'software',
                'icon'        => asset('storage/general-problems/security.svg')
            ],
            [
                'device_id'   => 17,
                'problem_name'=> 'Storage Capacity Problems',
                'category'    => 'hardware',
                'icon'        => asset('storage/general-problems/backup-restore.svg')
            ],
            [
                'device_id'   => 17,
                'problem_name'=> 'Network Latency Problems',
                'category'    => 'both',
                'icon'        => asset('storage/general-problems/wifi.svg')
            ],
            [
                'device_id'   => 17,
                'problem_name'=> 'Data Encryption Issues',
                'category'    => 'software',
                'icon'        => asset('storage/general-problems/security.svg')
            ],
        
            // Device 18 - VoIP Phone System General Problems
            [
                'device_id'   => 18,
                'problem_name'=> 'Call Quality Issues',
                'category'    => 'hardware',
                'icon'        => asset('storage/general-problems/audio.svg')
            ],
            [
                'device_id'   => 18,
                'problem_name'=> 'Network Latency Problems',
                'category'    => 'both',
                'icon'        => asset('storage/general-problems/wifi.svg')
            ],
            [
                'device_id'   => 18,
                'problem_name'=> 'Device Pairing Failures',
                'category'    => 'hardware',
                'icon'        => asset('storage/general-problems/bluetooth.svg')
            ],
            [
                'device_id'   => 18,
                'problem_name'=> 'VoIP Configuration Issues',
                'category'    => 'software',
                'icon'        => asset('storage/general-problems/apps-software.svg')
            ],
            [
                'device_id'   => 18,
                'problem_name'=> 'Firmware Update Problems',
                'category'    => 'software',
                'icon'        => asset('storage/general-problems/apps-software.svg')
            ],
        
            // Device 19 - CCTV Surveillance System General Problems
            [
                'device_id'   => 19,
                'problem_name'=> 'Camera Connectivity Issues',
                'category'    => 'hardware',
                'icon'        => asset('storage/general-problems/wifi.svg')
            ],
            [
                'device_id'   => 19,
                'problem_name'=> 'Video Storage Failures',
                'category'    => 'hardware',
                'icon'        => asset('storage/general-problems/backup-restore.svg')
            ],
            [
                'device_id'   => 19,
                'problem_name'=> 'Software Configuration Errors',
                'category'    => 'software',
                'icon'        => asset('storage/general-problems/apps-software.svg')
            ],
        
            // Device 20 - POS System General Problems
            [
                'device_id'   => 20,
                'problem_name'=> 'Transaction Failures',
                'category'    => 'software',
                'icon'        => asset('storage/general-problems/exclamation.svg')
            ],
            [
                'device_id'   => 20,
                'problem_name'=> 'Hardware Malfunctions',
                'category'    => 'hardware',
                'icon'        => asset('storage/general-problems/repair-damage.svg')
            ],
            [
                'device_id'   => 20,
                'problem_name'=> 'Network Connectivity Issues',
                'category'    => 'both',
                'icon'        => asset('storage/general-problems/wifi.svg')
            ],
        
            // Device 21 - Account Management General Problems (Business)
            [
                'device_id'   => 21,
                'problem_name'=> 'Login Failures',
                'category'    => 'software',
                'icon'        => asset('storage/general-problems/security.svg')
            ],
            [
                'device_id'   => 21,
                'problem_name'=> 'Account Recovery Issues',
                'category'    => 'software',
                'icon'        => asset('storage/general-problems/security.svg')
            ],
            [
                'device_id'   => 21,
                'problem_name'=> 'Permission & Access Problems',
                'category'    => 'software',
                'icon'        => asset('storage/general-problems/security.svg')
            ],
        
            // Device 22 - Security General Problems (Business)
            [
                'device_id'   => 22,
                'problem_name'=> 'Malware Infections',
                'category'    => 'software',
                'icon'        => asset('storage/general-problems/security.svg')
            ],
            [
                'device_id'   => 22,
                'problem_name'=> 'Firewall Configuration Issues',
                'category'    => 'software',
                'icon'        => asset('storage/general-problems/security.svg')
            ],
            [
                'device_id'   => 22,
                'problem_name'=> 'Unauthorized Access Attempts',
                'category'    => 'software',
                'icon'        => asset('storage/general-problems/security.svg')
            ],
        ];
        

        GeneralProblem::insert($generalProblems);
    }
}

