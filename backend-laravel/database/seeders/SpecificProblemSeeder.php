<?php

namespace Database\Seeders;

use App\Models\SpecificProblem;
use Illuminate\Database\Seeder;

class SpecificProblemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $specificProblems = [
            // smart phone general problems
            // Repairs & Physical Damage
            ['general_problem_id' => 1, 'specific_issue' => 'Cracked screen or display damage'],
            ['general_problem_id' => 1, 'specific_issue' => 'Device not powering on due to physical damage'],
            ['general_problem_id' => 1, 'specific_issue' => 'Water or liquid damage'],
            ['general_problem_id' => 1, 'specific_issue' => 'Damaged charging port or connectors'],
            ['general_problem_id' => 1, 'specific_issue' => 'Back panel or casing damage'],

            // Passwords & Security Issues
            ['general_problem_id' => 2, 'specific_issue' => 'Forgotten device passcode'],
            ['general_problem_id' => 2, 'specific_issue' => 'Account locked due to multiple failed login attempts'],
            ['general_problem_id' => 2, 'specific_issue' => 'Unauthorized access or account compromise'],
            ['general_problem_id' => 2, 'specific_issue' => 'Issues with two-factor authentication setup'],
            ['general_problem_id' => 2, 'specific_issue' => 'Phishing attempts or suspicious activity'],

            // Update, Backup & Restore Failures
            ['general_problem_id' => 3, 'specific_issue' => 'Device stuck during system update'],
            ['general_problem_id' => 3, 'specific_issue' => 'Backup process fails or incomplete'],
            ['general_problem_id' => 3, 'specific_issue' => 'Unable to restore device from backup'],
            ['general_problem_id' => 3, 'specific_issue' => 'Cloud storage synchronization issues'],
            ['general_problem_id' => 3, 'specific_issue' => 'Error messages during app updates'],

            // Device Performance Problems
            ['general_problem_id' => 4, 'specific_issue' => 'Device overheating during use'],
            ['general_problem_id' => 4, 'specific_issue' => 'System performance slower than expected'],
            ['general_problem_id' => 4, 'specific_issue' => 'Frequent app crashes or freezes'],
            ['general_problem_id' => 4, 'specific_issue' => 'Battery drains faster than usual'],
            ['general_problem_id' => 4, 'specific_issue' => 'Touchscreen unresponsive or laggy'],

            // App Crashes
            ['general_problem_id' => 5, 'specific_issue' => 'App crashes immediately after launch'],
            ['general_problem_id' => 5, 'specific_issue' => 'App freezes during specific actions'],
            ['general_problem_id' => 5, 'specific_issue' => 'Incompatibility with the current operating system'],
            ['general_problem_id' => 5, 'specific_issue' => 'Error messages when accessing app features'],
            ['general_problem_id' => 5, 'specific_issue' => 'App fails to save or load data properly'],

            // Payments and Subscriptions
            ['general_problem_id' => 6, 'specific_issue' => 'Payment method declined during checkout'],
            ['general_problem_id' => 6, 'specific_issue' => 'Subscription renewal fails unexpectedly'],
            ['general_problem_id' => 6, 'specific_issue' => 'Unable to cancel or modify subscriptions'],
            ['general_problem_id' => 6, 'specific_issue' => 'Incorrect charges or billing errors'],
            ['general_problem_id' => 6, 'specific_issue' => 'Payment gateway timeout or errors'],

            // Connectivity Issues
            ['general_problem_id' => 6, 'specific_issue' => 'Wi-Fi connection drops frequently'],
            ['general_problem_id' => 6, 'specific_issue' => 'Bluetooth pairing issues with other devices'],
            ['general_problem_id' => 6, 'specific_issue' => 'Mobile data not working as expected'],
            ['general_problem_id' => 6, 'specific_issue' => 'Intermittent network connectivity'],
            ['general_problem_id' => 6, 'specific_issue' => 'Hotspot feature not functioning'],

            // Camera Problems
            ['general_problem_id' => 6, 'specific_issue' => 'Camera app crashes when opened'],
            ['general_problem_id' => 6, 'specific_issue' => 'Blurry or distorted images'],
            ['general_problem_id' => 6, 'specific_issue' => 'Flash not working during photo capture'],
            ['general_problem_id' => 6, 'specific_issue' => 'Unable to switch between front and rear cameras'],
            ['general_problem_id' => 6, 'specific_issue' => 'Video recording stops unexpectedly'],

            // Audio Issues
            ['general_problem_id' => 6, 'specific_issue' => 'No sound output from speakers'],
            ['general_problem_id' => 6, 'specific_issue' => 'Distorted or crackling audio during calls'],
            ['general_problem_id' => 6, 'specific_issue' => 'Microphone not capturing sound'],
            ['general_problem_id' => 6, 'specific_issue' => 'Headphones not detected when plugged in'],
            ['general_problem_id' => 6, 'specific_issue' => 'Volume controls not functioning'],

            // Storage Problems
            ['general_problem_id' => 6, 'specific_issue' => 'Insufficient storage space for new files'],
            ['general_problem_id' => 6, 'specific_issue' => 'Device not recognizing external storage devices'],
            ['general_problem_id' => 6, 'specific_issue' => 'Corrupted files or data loss'],
            ['general_problem_id' => 6, 'specific_issue' => 'Slow file transfer speeds'],
            ['general_problem_id' => 6, 'specific_issue' => 'Error messages when accessing storage'],

            // Display Problems
            ['general_problem_id' => 6, 'specific_issue' => 'Screen flickering or flashing'],
            ['general_problem_id' => 6, 'specific_issue' => 'Dead pixels or discoloration on the screen'],
            ['general_problem_id' => 6, 'specific_issue' => 'Screen brightness adjustment not working'],
            ['general_problem_id' => 6, 'specific_issue' => 'Touchscreen not responding to input'],
            ['general_problem_id' => 6, 'specific_issue' => 'Screen rotation not functioning properly'],

            // Laptop General Problems
            // Apps & Software Issues
            ['general_problem_id' => 7, 'specific_issue' => 'Applications fail to launch or crash unexpectedly'],
            ['general_problem_id' => 7, 'specific_issue' => 'Software installation errors or incomplete installations'],
            ['general_problem_id' => 7, 'specific_issue' => 'Compatibility issues with the operating system'],
            ['general_problem_id' => 7, 'specific_issue' => 'Frequent error messages during app usage'],
            ['general_problem_id' => 7, 'specific_issue' => 'Corrupted application files causing malfunctions'],

            // Internet Connectivity Problems
            ['general_problem_id' => 8, 'specific_issue' => 'Wi-Fi disconnects frequently or fails to connect'],
            ['general_problem_id' => 8, 'specific_issue' => 'Slow internet speeds despite strong signal'],
            ['general_problem_id' => 8, 'specific_issue' => 'Unable to connect to specific websites or services'],
            ['general_problem_id' => 8, 'specific_issue' => 'VPN connection drops intermittently'],
            ['general_problem_id' => 8, 'specific_issue' => 'Ethernet port not functioning properly'],

            // Battery & Power Failures
            ['general_problem_id' => 9, 'specific_issue' => 'Laptop shuts down unexpectedly due to power issues'],
            ['general_problem_id' => 9, 'specific_issue' => 'Battery not charging or charging very slowly'],
            ['general_problem_id' => 9, 'specific_issue' => 'Battery drains quickly even when idle'],
            ['general_problem_id' => 9, 'specific_issue' => 'Power adapter overheating or malfunctioning'],
            ['general_problem_id' => 9, 'specific_issue' => 'Laptop fails to power on despite being plugged in'],

            // Accessory Compatibility Issues
            ['general_problem_id' => 10, 'specific_issue' => 'External mouse or keyboard not recognized'],
            ['general_problem_id' => 10, 'specific_issue' => 'Docking station fails to connect to the laptop'],
            ['general_problem_id' => 10, 'specific_issue' => 'External monitor not displaying correctly'],
            ['general_problem_id' => 10, 'specific_issue' => 'USB devices not detected or malfunctioning'],
            ['general_problem_id' => 10, 'specific_issue' => 'Audio devices (e.g., headphones) not compatible'],

            // Physical or Liquid Damage
            ['general_problem_id' => 11, 'specific_issue' => 'Cracked screen or damaged display panel'],
            ['general_problem_id' => 11, 'specific_issue' => 'Keyboard keys not functioning due to physical damage'],
            ['general_problem_id' => 11, 'specific_issue' => 'Liquid spill causing internal component failure'],
            ['general_problem_id' => 11, 'specific_issue' => 'Damaged hinges or broken laptop casing'],
            ['general_problem_id' => 11, 'specific_issue' => 'Ports (e.g., USB, HDMI) damaged or unusable'],

            // Performance Slowdowns
            ['general_problem_id' => 12, 'specific_issue' => 'Laptop takes a long time to boot up'],
            ['general_problem_id' => 12, 'specific_issue' => 'Frequent freezing or unresponsiveness during use'],
            ['general_problem_id' => 12, 'specific_issue' => 'High CPU or memory usage causing slow performance'],
            ['general_problem_id' => 12, 'specific_issue' => 'Hard drive or SSD read/write speeds reduced'],
            ['general_problem_id' => 12, 'specific_issue' => 'Background processes consuming excessive resources'],
            // Payments and Subscriptions
            ['general_problem_id' => 13, 'specific_issue' => 'Payment method declined during checkout'],
            ['general_problem_id' => 13, 'specific_issue' => 'Subscription renewal fails unexpectedly'],
            ['general_problem_id' => 13, 'specific_issue' => 'Unable to cancel or modify subscriptions'],
            ['general_problem_id' => 13, 'specific_issue' => 'Incorrect charges or billing errors'],
            ['general_problem_id' => 13, 'specific_issue' => 'Payment gateway timeout or errors'],

            // Connectivity Issues
            ['general_problem_id' => 13, 'specific_issue' => 'Wi-Fi connection drops frequently'],
            ['general_problem_id' => 13, 'specific_issue' => 'Bluetooth pairing issues with other devices'],
            ['general_problem_id' => 13, 'specific_issue' => 'Mobile data not working as expected'],
            ['general_problem_id' => 13, 'specific_issue' => 'Intermittent network connectivity'],
            ['general_problem_id' => 13, 'specific_issue' => 'Hotspot feature not functioning'],

            // Camera Problems
            ['general_problem_id' => 13, 'specific_issue' => 'Camera app crashes when opened'],
            ['general_problem_id' => 13, 'specific_issue' => 'Blurry or distorted images'],
            ['general_problem_id' => 13, 'specific_issue' => 'Flash not working during photo capture'],
            ['general_problem_id' => 13, 'specific_issue' => 'Unable to switch between front and rear cameras'],
            ['general_problem_id' => 13, 'specific_issue' => 'Video recording stops unexpectedly'],

            // Audio Issues
            ['general_problem_id' => 13, 'specific_issue' => 'No sound output from speakers'],
            ['general_problem_id' => 13, 'specific_issue' => 'Distorted or crackling audio during calls'],
            ['general_problem_id' => 13, 'specific_issue' => 'Microphone not capturing sound'],
            ['general_problem_id' => 13, 'specific_issue' => 'Headphones not detected when plugged in'],
            ['general_problem_id' => 13, 'specific_issue' => 'Volume controls not functioning'],

            // Storage Problems
            ['general_problem_id' => 13, 'specific_issue' => 'Insufficient storage space for new files'],
            ['general_problem_id' => 13, 'specific_issue' => 'Device not recognizing external storage devices'],
            ['general_problem_id' => 13, 'specific_issue' => 'Corrupted files or data loss'],
            ['general_problem_id' => 13, 'specific_issue' => 'Slow file transfer speeds'],
            ['general_problem_id' => 13, 'specific_issue' => 'Error messages when accessing storage'],

            // Display Problems
            ['general_problem_id' => 13, 'specific_issue' => 'Screen flickering or flashing'],
            ['general_problem_id' => 13, 'specific_issue' => 'Dead pixels or discoloration on the screen'],
            ['general_problem_id' => 13, 'specific_issue' => 'Screen brightness adjustment not working'],
            ['general_problem_id' => 13, 'specific_issue' => 'Touchscreen not responding to input'],
            ['general_problem_id' => 13, 'specific_issue' => 'Screen rotation not functioning properly'],

            // Desktop PC General Problems
            // Hardware Failures (e.g., PSU, GPU)
            ['general_problem_id' => 14, 'specific_issue' => 'Power Supply Unit (PSU) not providing power'],
            ['general_problem_id' => 14, 'specific_issue' => 'Graphics Processing Unit (GPU) overheating or failing'],
            ['general_problem_id' => 14, 'specific_issue' => 'Motherboard components damaged or malfunctioning'],
            ['general_problem_id' => 14, 'specific_issue' => 'Hard drive or SSD not detected by the system'],
            ['general_problem_id' => 14, 'specific_issue' => 'RAM modules causing system instability'],

            // Operating System Crashes
            ['general_problem_id' => 15, 'specific_issue' => 'Blue Screen of Death (BSOD) during operation'],
            ['general_problem_id' => 15, 'specific_issue' => 'System freezes or restarts unexpectedly'],
            ['general_problem_id' => 15, 'specific_issue' => 'Corrupted system files causing boot failures'],
            ['general_problem_id' => 15, 'specific_issue' => 'Driver conflicts leading to crashes'],
            ['general_problem_id' => 15, 'specific_issue' => 'Incompatibility with recently installed updates'],

            // Peripheral Connectivity Issues
            ['general_problem_id' => 16, 'specific_issue' => 'USB devices not recognized by the system'],
            ['general_problem_id' => 16, 'specific_issue' => 'External monitor not displaying correctly'],
            ['general_problem_id' => 16, 'specific_issue' => 'Printer or scanner fails to connect or function'],
            ['general_problem_id' => 16, 'specific_issue' => 'Keyboard or mouse input lag or unresponsiveness'],
            ['general_problem_id' => 16, 'specific_issue' => 'Audio devices (e.g., speakers, headphones) not detected'],

            // Slow Boot Times
            ['general_problem_id' => 17, 'specific_issue' => 'Excessive startup programs delaying boot'],
            ['general_problem_id' => 17, 'specific_issue' => 'Hard drive or SSD read/write speeds reduced'],
            ['general_problem_id' => 17, 'specific_issue' => 'BIOS/UEFI misconfiguration causing delays'],
            ['general_problem_id' => 17, 'specific_issue' => 'Corrupted bootloader or system files'],
            ['general_problem_id' => 17, 'specific_issue' => 'Outdated hardware drivers slowing initialization'],

            // Overheating Problems
            ['general_problem_id' => 18, 'specific_issue' => 'CPU overheating due to insufficient cooling'],
            ['general_problem_id' => 18, 'specific_issue' => 'GPU overheating during intensive tasks'],
            ['general_problem_id' => 18, 'specific_issue' => 'Dust accumulation in fans and vents'],
            ['general_problem_id' => 18, 'specific_issue' => 'Thermal paste degradation on CPU or GPU'],
            ['general_problem_id' => 18, 'specific_issue' => 'Case airflow restricted by improper cable management'],
            
            // Payments and Subscriptions
            ['general_problem_id' => 19, 'specific_issue' => 'Payment method declined during checkout'],
            ['general_problem_id' => 19, 'specific_issue' => 'Subscription renewal fails unexpectedly'],
            ['general_problem_id' => 19, 'specific_issue' => 'Unable to cancel or modify subscriptions'],
            ['general_problem_id' => 19, 'specific_issue' => 'Incorrect charges or billing errors'],
            ['general_problem_id' => 19, 'specific_issue' => 'Payment gateway timeout or errors'],

            // Connectivity Issues
            ['general_problem_id' => 19, 'specific_issue' => 'Wi-Fi connection drops frequently'],
            ['general_problem_id' => 19, 'specific_issue' => 'Bluetooth pairing issues with other devices'],
            ['general_problem_id' => 19, 'specific_issue' => 'Mobile data not working as expected'],
            ['general_problem_id' => 19, 'specific_issue' => 'Intermittent network connectivity'],
            ['general_problem_id' => 19, 'specific_issue' => 'Hotspot feature not functioning'],

            // Camera Problems
            ['general_problem_id' => 19, 'specific_issue' => 'Camera app crashes when opened'],
            ['general_problem_id' => 19, 'specific_issue' => 'Blurry or distorted images'],
            ['general_problem_id' => 19, 'specific_issue' => 'Flash not working during photo capture'],
            ['general_problem_id' => 19, 'specific_issue' => 'Unable to switch between front and rear cameras'],
            ['general_problem_id' => 19, 'specific_issue' => 'Video recording stops unexpectedly'],

            // Audio Issues
            ['general_problem_id' => 19, 'specific_issue' => 'No sound output from speakers'],
            ['general_problem_id' => 19, 'specific_issue' => 'Distorted or crackling audio during calls'],
            ['general_problem_id' => 19, 'specific_issue' => 'Microphone not capturing sound'],
            ['general_problem_id' => 19, 'specific_issue' => 'Headphones not detected when plugged in'],
            ['general_problem_id' => 19, 'specific_issue' => 'Volume controls not functioning'],

            // Storage Problems
            ['general_problem_id' => 19, 'specific_issue' => 'Insufficient storage space for new files'],
            ['general_problem_id' => 19, 'specific_issue' => 'Device not recognizing external storage devices'],
            ['general_problem_id' => 19, 'specific_issue' => 'Corrupted files or data loss'],
            ['general_problem_id' => 19, 'specific_issue' => 'Slow file transfer speeds'],
            ['general_problem_id' => 19, 'specific_issue' => 'Error messages when accessing storage'],

            // Display Problems
            ['general_problem_id' => 19, 'specific_issue' => 'Screen flickering or flashing'],
            ['general_problem_id' => 19, 'specific_issue' => 'Dead pixels or discoloration on the screen'],
            ['general_problem_id' => 19, 'specific_issue' => 'Screen brightness adjustment not working'],
            ['general_problem_id' => 19, 'specific_issue' => 'Touchscreen not responding to input'],
            ['general_problem_id' => 19, 'specific_issue' => 'Screen rotation not functioning properly'],

            // Server General Problems
            // Server Downtime
            ['general_problem_id' => 49, 'specific_issue' => 'Unexpected server crashes during peak usage'],
            ['general_problem_id' => 49, 'specific_issue' => 'Power outages causing server unavailability'],
            ['general_problem_id' => 49, 'specific_issue' => 'Server fails to restart after maintenance'],
            ['general_problem_id' => 49, 'specific_issue' => 'Network connectivity issues causing downtime'],
            ['general_problem_id' => 49, 'specific_issue' => 'Hardware failures leading to server inaccessibility'],

            // Data Backup Failures
            ['general_problem_id' => 50, 'specific_issue' => 'Scheduled backups not completing successfully'],
            ['general_problem_id' => 50, 'specific_issue' => 'Corrupted backup files during restoration'],
            ['general_problem_id' => 50, 'specific_issue' => 'Insufficient storage space for backup data'],
            ['general_problem_id' => 50, 'specific_issue' => 'Backup software compatibility issues'],
            ['general_problem_id' => 50, 'specific_issue' => 'Network interruptions during cloud backups'],

            // Hardware Overheating
            ['general_problem_id' => 51, 'specific_issue' => 'Server CPU overheating due to inadequate cooling'],
            ['general_problem_id' => 51, 'specific_issue' => 'Hard drives overheating during intensive operations'],
            ['general_problem_id' => 51, 'specific_issue' => 'Cooling fans not functioning properly'],
            ['general_problem_id' => 51, 'specific_issue' => 'Dust accumulation in server racks'],
            ['general_problem_id' => 51, 'specific_issue' => 'Thermal paste degradation on critical components'],

            // Network Configuration Issues
            ['general_problem_id' => 52, 'specific_issue' => 'Incorrect DNS settings causing connectivity issues'],
            ['general_problem_id' => 52, 'specific_issue' => 'Firewall misconfigurations blocking server traffic'],
            ['general_problem_id' => 52, 'specific_issue' => 'IP address conflicts within the network'],
            ['general_problem_id' => 52, 'specific_issue' => 'Slow network speeds due to misconfigured routing'],
            ['general_problem_id' => 52, 'specific_issue' => 'VLAN misconfigurations causing network segmentation'],

            // Storage Capacity Problems
            ['general_problem_id' => 53, 'specific_issue' => 'Insufficient disk space for new data'],
            ['general_problem_id' => 53, 'specific_issue' => 'RAID array failures reducing storage capacity'],
            ['general_problem_id' => 53, 'specific_issue' => 'Old or unused files consuming storage space'],
            ['general_problem_id' => 53, 'specific_issue' => 'Storage devices not recognized by the server'],
            ['general_problem_id' => 53, 'specific_issue' => 'Slow read/write speeds due to overloaded storage'],
            // Payments and Subscriptions
            ['general_problem_id' => 54, 'specific_issue' => 'Payment method declined during checkout'],
            ['general_problem_id' => 54, 'specific_issue' => 'Subscription renewal fails unexpectedly'],
            ['general_problem_id' => 54, 'specific_issue' => 'Unable to cancel or modify subscriptions'],
            ['general_problem_id' => 54, 'specific_issue' => 'Incorrect charges or billing errors'],
            ['general_problem_id' => 54, 'specific_issue' => 'Payment gateway timeout or errors'],

            // Connectivity Issues
            ['general_problem_id' => 54, 'specific_issue' => 'Wi-Fi connection drops frequently'],
            ['general_problem_id' => 54, 'specific_issue' => 'Bluetooth pairing issues with other devices'],
            ['general_problem_id' => 54, 'specific_issue' => 'Mobile data not working as expected'],
            ['general_problem_id' => 54, 'specific_issue' => 'Intermittent network connectivity'],
            ['general_problem_id' => 54, 'specific_issue' => 'Hotspot feature not functioning'],

            // Storage Problems
            ['general_problem_id' => 54, 'specific_issue' => 'Insufficient storage space for new files'],
            ['general_problem_id' => 54, 'specific_issue' => 'Device not recognizing external storage devices'],
            ['general_problem_id' => 54, 'specific_issue' => 'Corrupted files or data loss'],
            ['general_problem_id' => 54, 'specific_issue' => 'Slow file transfer speeds'],
            ['general_problem_id' => 54, 'specific_issue' => 'Error messages when accessing storage'],

            // Network Switch General Problems
            // Port Failures
            ['general_problem_id' => 55, 'specific_issue' => 'Ethernet ports not transmitting data'],
            ['general_problem_id' => 55, 'specific_issue' => 'Physical damage to switch ports'],
            ['general_problem_id' => 55, 'specific_issue' => 'Ports intermittently disconnecting devices'],
            ['general_problem_id' => 55, 'specific_issue' => 'Overloaded ports causing packet loss'],
            ['general_problem_id' => 55, 'specific_issue' => 'Switch not detecting connected devices'],

            // Network Congestion
            ['general_problem_id' => 56, 'specific_issue' => 'High latency during peak traffic hours'],
            ['general_problem_id' => 56, 'specific_issue' => 'Bandwidth bottlenecks affecting performance'],
            ['general_problem_id' => 56, 'specific_issue' => 'Excessive broadcast traffic slowing the network'],
            ['general_problem_id' => 56, 'specific_issue' => 'Misconfigured Quality of Service (QoS) settings'],
            ['general_problem_id' => 56, 'specific_issue' => 'Too many devices connected to the same switch'],

            // Firmware Update Issues
            ['general_problem_id' => 57, 'specific_issue' => 'Switch fails to boot after firmware update'],
            ['general_problem_id' => 57, 'specific_issue' => 'Firmware update process interrupted or incomplete'],
            ['general_problem_id' => 57, 'specific_issue' => 'Incompatibility with the current network configuration'],
            ['general_problem_id' => 57, 'specific_issue' => 'Rollback to previous firmware version fails'],
            ['general_problem_id' => 57, 'specific_issue' => 'Error messages during firmware installation'],
            // Payments and Subscriptions
            ['general_problem_id' => 58, 'specific_issue' => 'Payment method declined during checkout'],
            ['general_problem_id' => 58, 'specific_issue' => 'Subscription renewal fails unexpectedly'],
            ['general_problem_id' => 58, 'specific_issue' => 'Unable to cancel or modify subscriptions'],
            ['general_problem_id' => 58, 'specific_issue' => 'Incorrect charges or billing errors'],
            ['general_problem_id' => 58, 'specific_issue' => 'Payment gateway timeout or errors'],

            // Connectivity Issues
            ['general_problem_id' => 58, 'specific_issue' => 'Wi-Fi connection drops frequently'],
            ['general_problem_id' => 58, 'specific_issue' => 'Bluetooth pairing issues with other devices'],
            ['general_problem_id' => 58, 'specific_issue' => 'Mobile data not working as expected'],
            ['general_problem_id' => 58, 'specific_issue' => 'Intermittent network connectivity'],
            ['general_problem_id' => 58, 'specific_issue' => 'Hotspot feature not functioning'],

            // Firewall Appliance General Problems
            // Configuration Errors
            ['general_problem_id' => 59, 'specific_issue' => 'Incorrect firewall rules blocking legitimate traffic'],
            ['general_problem_id' => 59, 'specific_issue' => 'Misconfigured NAT settings causing connectivity issues'],
            ['general_problem_id' => 59, 'specific_issue' => 'Improper VPN configuration leading to access failures'],
            ['general_problem_id' => 59, 'specific_issue' => 'Firewall policy conflicts causing unexpected behavior'],
            ['general_problem_id' => 59, 'specific_issue' => 'Difficulty in setting up port forwarding'],

            // Traffic Blocking Issues
            ['general_problem_id' => 60, 'specific_issue' => 'Firewall blocking specific applications or services'],
            ['general_problem_id' => 60, 'specific_issue' => 'Legitimate emails flagged as spam or blocked'],
            ['general_problem_id' => 60, 'specific_issue' => 'Firewall blocking access to external websites'],
            ['general_problem_id' => 60, 'specific_issue' => 'Unintended blocking of internal network traffic'],
            ['general_problem_id' => 60, 'specific_issue' => 'Firewall blocking software updates'],

            // Hardware Failures
            ['general_problem_id' => 61, 'specific_issue' => 'Firewall appliance not powering on'],
            ['general_problem_id' => 61, 'specific_issue' => 'Overheating of firewall hardware components'],
            ['general_problem_id' => 61, 'specific_issue' => 'Damaged network ports on the firewall device'],
            ['general_problem_id' => 61, 'specific_issue' => 'Internal storage failure in the firewall appliance'],
            ['general_problem_id' => 61, 'specific_issue' => 'Fan or cooling system malfunction'],

            // Network Latency Problems
            ['general_problem_id' => 62, 'specific_issue' => 'High latency due to excessive traffic filtering'],
            ['general_problem_id' => 62, 'specific_issue' => 'Firewall causing delays in packet inspection'],
            ['general_problem_id' => 62, 'specific_issue' => 'Improper load balancing leading to latency spikes'],
            ['general_problem_id' => 62, 'specific_issue' => 'Firewall rules causing bottlenecks in traffic flow'],
            ['general_problem_id' => 62, 'specific_issue' => 'Latency issues during peak usage hours'],

            // Unauthorized Access Attempts
            ['general_problem_id' => 63, 'specific_issue' => 'Repeated brute force login attempts detected'],
            ['general_problem_id' => 63, 'specific_issue' => 'Unauthorized access to sensitive network resources'],
            ['general_problem_id' => 63, 'specific_issue' => 'Firewall logs showing suspicious IP addresses'],
            ['general_problem_id' => 63, 'specific_issue' => 'Compromised credentials used for unauthorized access'],
            ['general_problem_id' => 63, 'specific_issue' => 'Failed attempts to bypass firewall security'],
            // Payments and Subscriptions
            ['general_problem_id' => 64, 'specific_issue' => 'Payment method declined during checkout'],
            ['general_problem_id' => 64, 'specific_issue' => 'Subscription renewal fails unexpectedly'],
            ['general_problem_id' => 64, 'specific_issue' => 'Unable to cancel or modify subscriptions'],
            ['general_problem_id' => 64, 'specific_issue' => 'Incorrect charges or billing errors'],
            ['general_problem_id' => 64, 'specific_issue' => 'Payment gateway timeout or errors'],

            // Connectivity Issues
            ['general_problem_id' => 64, 'specific_issue' => 'Wi-Fi connection drops frequently'],
            ['general_problem_id' => 64, 'specific_issue' => 'Bluetooth pairing issues with other devices'],
            ['general_problem_id' => 64, 'specific_issue' => 'Mobile data not working as expected'],
            ['general_problem_id' => 64, 'specific_issue' => 'Intermittent network connectivity'],
            ['general_problem_id' => 64, 'specific_issue' => 'Hotspot feature not functioning'],

            // BusinessLaptop Specific Problems
            // Internet Connectivity Problems
            ['general_problem_id' => 65, 'specific_issue' => 'Wi-Fi disconnects frequently or fails to connect'],
            ['general_problem_id' => 65, 'specific_issue' => 'Slow internet speeds despite strong signal'],
            ['general_problem_id' => 65, 'specific_issue' => 'Unable to connect to specific websites or services'],
            ['general_problem_id' => 65, 'specific_issue' => 'VPN connection drops intermittently'],
            ['general_problem_id' => 65, 'specific_issue' => 'Ethernet port not functioning properly'],

            // Battery & Power Failures
            ['general_problem_id' => 66, 'specific_issue' => 'Laptop shuts down unexpectedly due to power issues'],
            ['general_problem_id' => 66, 'specific_issue' => 'Battery not charging or charging very slowly'],
            ['general_problem_id' => 66, 'specific_issue' => 'Battery drains quickly even when idle'],
            ['general_problem_id' => 66, 'specific_issue' => 'Power adapter overheating or malfunctioning'],
            ['general_problem_id' => 66, 'specific_issue' => 'Laptop fails to power on despite being plugged in'],

            // Accessory Compatibility Issues
            ['general_problem_id' => 67, 'specific_issue' => 'External mouse or keyboard not recognized'],
            ['general_problem_id' => 67, 'specific_issue' => 'Docking station fails to connect to the laptop'],
            ['general_problem_id' => 67, 'specific_issue' => 'External monitor not displaying correctly'],
            ['general_problem_id' => 67, 'specific_issue' => 'USB devices not detected or malfunctioning'],
            ['general_problem_id' => 67, 'specific_issue' => 'Audio devices (e.g., headphones) not compatible'],

            // Physical or Liquid Damage
            ['general_problem_id' => 68, 'specific_issue' => 'Cracked screen or damaged display panel'],
            ['general_problem_id' => 68, 'specific_issue' => 'Keyboard keys not functioning due to physical damage'],
            ['general_problem_id' => 68, 'specific_issue' => 'Liquid spill causing internal component failure'],
            ['general_problem_id' => 68, 'specific_issue' => 'Damaged hinges or broken laptop casing'],
            ['general_problem_id' => 68, 'specific_issue' => 'Ports (e.g., USB, HDMI) damaged or unusable'],

            // Performance Slowdowns
            ['general_problem_id' => 68, 'specific_issue' => 'Laptop takes a long time to boot up'],
            ['general_problem_id' => 68, 'specific_issue' => 'Frequent freezing or unresponsiveness during use'],
            ['general_problem_id' => 68, 'specific_issue' => 'High CPU or memory usage causing slow performance'],
            ['general_problem_id' => 68, 'specific_issue' => 'Hard drive or SSD read/write speeds reduced'],
            ['general_problem_id' => 68, 'specific_issue' => 'Background processes consuming excessive resources'],

            // Camera Problems
            ['general_problem_id' => 68, 'specific_issue' => 'Camera app crashes when opened'],
            ['general_problem_id' => 68, 'specific_issue' => 'Blurry or distorted images'],
            ['general_problem_id' => 68, 'specific_issue' => 'Flash not working during photo capture'],
            ['general_problem_id' => 68, 'specific_issue' => 'Unable to switch between front and rear cameras'],
            ['general_problem_id' => 68, 'specific_issue' => 'Video recording stops unexpectedly'],

            // Audio Issues
            ['general_problem_id' => 68, 'specific_issue' => 'Headphones not detected when plugged in'],
            ['general_problem_id' => 68, 'specific_issue' => 'Volume controls not functioning'],

            // Storage Problems
            ['general_problem_id' => 68, 'specific_issue' => 'Device not recognizing external storage devices'],
            ['general_problem_id' => 68, 'specific_issue' => 'Corrupted files or data loss'],
            ['general_problem_id' => 68, 'specific_issue' => 'Slow file transfer speeds'],
            ['general_problem_id' => 68, 'specific_issue' => 'Error messages when accessing storage'],

            // Display Problems
            ['general_problem_id' => 68, 'specific_issue' => 'Screen flickering or flashing'],
            ['general_problem_id' => 68, 'specific_issue' => 'Dead pixels or discoloration on the screen'],
            ['general_problem_id' => 68, 'specific_issue' => 'Screen brightness adjustment not working'],
            ['general_problem_id' => 68, 'specific_issue' => 'Touchscreen not responding to input'],
            ['general_problem_id' => 68, 'specific_issue' => 'Screen rotation not functioning properly'],

            // Workstation PC General Problems
            // Hardware Failures (e.g., PSU, GPU)
            ['general_problem_id' => 69, 'specific_issue' => 'Power Supply Unit (PSU) not providing power'],
            ['general_problem_id' => 69, 'specific_issue' => 'Graphics Processing Unit (GPU) overheating or failing'],
            ['general_problem_id' => 69, 'specific_issue' => 'Motherboard components damaged or malfunctioning'],
            ['general_problem_id' => 69, 'specific_issue' => 'Hard drive or SSD not detected by the system'],
            ['general_problem_id' => 69, 'specific_issue' => 'RAM modules causing system instability'],

            // Operating System Crashes
            ['general_problem_id' => 70, 'specific_issue' => 'Blue Screen of Death (BSOD) during operation'],
            ['general_problem_id' => 70, 'specific_issue' => 'System freezes or restarts unexpectedly'],
            ['general_problem_id' => 70, 'specific_issue' => 'Corrupted system files causing boot failures'],
            ['general_problem_id' => 70, 'specific_issue' => 'Driver conflicts leading to crashes'],
            ['general_problem_id' => 70, 'specific_issue' => 'Incompatibility with recently installed updates'],

            // Peripheral Connectivity Issues
            ['general_problem_id' => 71, 'specific_issue' => 'USB devices not recognized by the system'],
            ['general_problem_id' => 71, 'specific_issue' => 'External monitor not displaying correctly'],
            ['general_problem_id' => 71, 'specific_issue' => 'Printer or scanner fails to connect or function'],
            ['general_problem_id' => 71, 'specific_issue' => 'Keyboard or mouse input lag or unresponsiveness'],
            ['general_problem_id' => 71, 'specific_issue' => 'Audio devices (e.g., speakers, headphones) not detected'],

            // Slow Boot Times
            ['general_problem_id' => 72, 'specific_issue' => 'Excessive startup programs delaying boot'],
            ['general_problem_id' => 72, 'specific_issue' => 'Hard drive or SSD read/write speeds reduced'],
            ['general_problem_id' => 72, 'specific_issue' => 'BIOS/UEFI misconfiguration causing delays'],
            ['general_problem_id' => 72, 'specific_issue' => 'Corrupted bootloader or system files'],
            ['general_problem_id' => 72, 'specific_issue' => 'Outdated hardware drivers slowing initialization'],

            // Overheating Problems
            ['general_problem_id' => 73, 'specific_issue' => 'CPU overheating due to insufficient cooling'],
            ['general_problem_id' => 73, 'specific_issue' => 'GPU overheating during intensive tasks'],
            ['general_problem_id' => 73, 'specific_issue' => 'Dust accumulation in fans and vents'],
            ['general_problem_id' => 73, 'specific_issue' => 'Thermal paste degradation on CPU or GPU'],
            ['general_problem_id' => 73, 'specific_issue' => 'Case airflow restricted by improper cable management'],
            // Payments and Subscriptions
            ['general_problem_id' => 74, 'specific_issue' => 'Payment method declined during checkout'],
            ['general_problem_id' => 74, 'specific_issue' => 'Subscription renewal fails unexpectedly'],
            ['general_problem_id' => 74, 'specific_issue' => 'Unable to cancel or modify subscriptions'],
            ['general_problem_id' => 74, 'specific_issue' => 'Incorrect charges or billing errors'],
            ['general_problem_id' => 74, 'specific_issue' => 'Payment gateway timeout or errors'],

            // Connectivity Issues
            ['general_problem_id' => 74, 'specific_issue' => 'Wi-Fi connection drops frequently'],
            ['general_problem_id' => 74, 'specific_issue' => 'Bluetooth pairing issues with other devices'],
            ['general_problem_id' => 74, 'specific_issue' => 'Mobile data not working as expected'],
            ['general_problem_id' => 74, 'specific_issue' => 'Intermittent network connectivity'],
            ['general_problem_id' => 74, 'specific_issue' => 'Hotspot feature not functioning'],

            // Camera Problems
            ['general_problem_id' => 74, 'specific_issue' => 'Camera app crashes when opened'],
            ['general_problem_id' => 74, 'specific_issue' => 'Blurry or distorted images'],
            ['general_problem_id' => 74, 'specific_issue' => 'Flash not working during photo capture'],
            ['general_problem_id' => 74, 'specific_issue' => 'Unable to switch between front and rear cameras'],
            ['general_problem_id' => 74, 'specific_issue' => 'Video recording stops unexpectedly'],

            // Audio Issues
            ['general_problem_id' => 74, 'specific_issue' => 'No sound output from speakers'],
            ['general_problem_id' => 74, 'specific_issue' => 'Distorted or crackling audio during calls'],
            ['general_problem_id' => 74, 'specific_issue' => 'Microphone not capturing sound'],
            ['general_problem_id' => 74, 'specific_issue' => 'Headphones not detected when plugged in'],
            ['general_problem_id' => 74, 'specific_issue' => 'Volume controls not functioning'],

            // Storage Problems
            ['general_problem_id' => 74, 'specific_issue' => 'Insufficient storage space for new files'],
            ['general_problem_id' => 74, 'specific_issue' => 'Device not recognizing external storage devices'],
            ['general_problem_id' => 74, 'specific_issue' => 'Corrupted files or data loss'],
            ['general_problem_id' => 74, 'specific_issue' => 'Slow file transfer speeds'],
            ['general_problem_id' => 74, 'specific_issue' => 'Error messages when accessing storage'],

            // Display Problems
            ['general_problem_id' => 74, 'specific_issue' => 'Screen flickering or flashing'],
            ['general_problem_id' => 74, 'specific_issue' => 'Dead pixels or discoloration on the screen'],
            ['general_problem_id' => 74, 'specific_issue' => 'Screen brightness adjustment not working'],
            ['general_problem_id' => 74, 'specific_issue' => 'Touchscreen not responding to input'],
            ['general_problem_id' => 74, 'specific_issue' => 'Screen rotation not functioning properly'],
        ];

        SpecificProblem::insert($specificProblems);
    }
}
