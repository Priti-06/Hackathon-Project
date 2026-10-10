<?php
require_once __DIR__ . '/db.php';

$service = isset($_GET['service']) ? strtolower($_GET['service']) : 'all';

$rimsBuses = [
    [
        'bus_id' => 'CEZ-BUS-01',
        'route_name' => 'Route 01: Central Station → Civic Hub → CampusEZ Gate',
        'driver_name' => 'Bikash Nayak',
        'contact' => '+91 94371 88210',
        'current_location' => 'Near Central Flyover',
        'eta' => '8 Mins',
        'seats_available' => 14,
        'status' => 'On Route',
        'type' => 'College Bus'
    ],
    [
        'bus_id' => 'CEZ-BUS-02',
        'route_name' => 'Route 02: City Centre → Green Park → CampusEZ Campus',
        'driver_name' => 'Ramesh Sahoo',
        'contact' => '+91 98610 44192',
        'current_location' => 'North Boulevard',
        'eta' => '15 Mins',
        'seats_available' => 18,
        'status' => 'On Route',
        'type' => 'College Bus'
    ],
    [
        'bus_id' => 'CEZ-BUS-03',
        'route_name' => 'Route 03: Student Hostel Block → Main Academic Block',
        'driver_name' => 'Campus Shuttle Crew',
        'contact' => 'Internal Intercom #204',
        'current_location' => 'Hostel Block-B Terminal',
        'eta' => 'Every 10 Mins Loop',
        'seats_available' => 24,
        'status' => 'Running Loop',
        'type' => 'Internal Shuttle'
    ]
];

$amaBuses = [
    [
        'route_no' => 'Route 101',
        'bus_number' => 'IND-01-AX-5021',
        'service_name' => 'City Express Transit (Electric AC)',
        'origin_destination' => 'Central Station ⇄ Tech Park via CampusEZ',
        'current_stop' => 'Central Junction (2.1 km away)',
        'next_stop' => 'CampusEZ Central Campus Stop',
        'eta_mins' => 4,
        'speed_kmph' => 34,
        'fare_inr' => 15,
        'crowd_level' => 'Moderate Seating (12 Seats Free)',
        'agency' => 'City Transit Network (India)',
        'coordinates' => ['lat' => 28.6139, 'lng' => 77.2090]
    ],
    [
        'route_no' => 'Route 105',
        'bus_number' => 'IND-01-AY-8190',
        'service_name' => 'City Feeder (AC)',
        'origin_destination' => 'Sports Stadium ⇄ West Terminal via CampusEZ',
        'current_stop' => 'Sector 2 Market Square',
        'next_stop' => 'CampusEZ North Gate',
        'eta_mins' => 11,
        'speed_kmph' => 28,
        'fare_inr' => 20,
        'crowd_level' => 'Seats Available (22 Seats Free)',
        'agency' => 'City Transit Network (India)',
        'coordinates' => ['lat' => 28.6200, 'lng' => 77.2150]
    ],
    [
        'route_no' => 'Route 108',
        'bus_number' => 'IND-01-AZ-3312',
        'service_name' => 'Airport & City Link',
        'origin_destination' => 'International Airport ⇄ New Bus Stand via CampusEZ',
        'current_stop' => 'Civil Township Arterial',
        'next_stop' => 'CampusEZ Central Stop',
        'eta_mins' => 18,
        'speed_kmph' => 31,
        'fare_inr' => 15,
        'crowd_level' => 'Low Crowd (30 Seats Free)',
        'agency' => 'City Transit Network (India)',
        'coordinates' => ['lat' => 28.6300, 'lng' => 77.2200]
    ],
    [
        'route_no' => 'Route 112',
        'bus_number' => 'IND-01-BB-1104',
        'service_name' => 'Campus Special Link',
        'origin_destination' => 'National Institute ⇄ CampusEZ Ring Road',
        'current_stop' => 'University Avenue',
        'next_stop' => 'CampusEZ Main Entrance',
        'eta_mins' => 26,
        'speed_kmph' => 26,
        'fare_inr' => 10,
        'crowd_level' => 'Normal Seats (15 Seats Free)',
        'agency' => 'City Transit Network (India)',
        'coordinates' => ['lat' => 28.6100, 'lng' => 77.2000]
    ]
];

echo json_encode([
    'status' => 'success',
    'timestamp' => date('Y-m-d H:i:s'),
    'network' => 'CampusEZ & Transit Transportation (India)',
    'campus_stop' => 'Central Ring Road Stop (ID: CEZ-TRANSIT-042)',
    'rims_buses' => $rimsBuses,
    'ama_buses' => $amaBuses
]);
?>
