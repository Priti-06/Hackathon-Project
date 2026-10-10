<?php
/**
 * CampusEZ - Smart Campus Admin API Endpoint
 * Location: CampusEZ Main Campus, India
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$action = $_GET['action'] ?? 'overview';

if ($action === 'overview') {
    echo json_encode([
        'status' => 'success',
        'timestamp' => date('Y-m-d H:i:s'),
        'institution' => 'CampusEZ Institute of Management & Technology (India)',
        'campus' => 'Central Campus, India - 110001',
        'kpi_metrics' => [
            'total_students' => [
                'count' => 1842,
                'growth' => '+4.2% YoY',
                'today_present' => 1735,
                'today_attendance_pct' => 94.2,
                'breakdown' => [
                    'mca' => 120,
                    'mba' => 180,
                    'bca' => 240,
                    'bba' => 200,
                    'bcom' => 1102
                ]
            ],
            'faculty_staff' => [
                'total_faculty' => 68,
                'on_campus' => 62,
                'on_academic_duty' => 4,
                'on_leave' => 2
            ],
            'financials' => [
                'total_semester_fees' => 16000000, // INR 1.60 Cr
                'collected_inr' => 14176000,     // INR 1.42 Cr
                'clearance_rate_pct' => 88.6,
                'pending_inr' => 1824000
            ],
            'canteen_revenue' => [
                'today_sales_inr' => 38640,
                'pre_orders_count' => 312,
                'upi_percentage' => 91.5
            ],
            'transportation' => [
                'active_buses' => 7,
                'ama_buses_tracked' => 4,
                'college_buses_running' => 3,
                'gps_telemetry_status' => '100% Operational'
            ],
            'maintenance' => [
                'pending_tickets' => 3,
                'resolved_this_week' => 18,
                'avg_resolution_time' => '1.8 Hours'
            ],
            'student_grievances' => [
                'total_complaints' => 12,
                'pending_review' => 11,
                'escalated_to_principal' => 6,
                'warning_threshold' => 10,
                'warning_triggered' => true,
                'affected_faculty' => 'Prof. Dr. S. K. Mohanty (11 Complaints)',
                'warning_status' => 'CRITICAL_ESCALATION_ACTIVE'
            ]
        ],
        'hardware_telemetry' => [
            [
                'node_id' => 'GATE-RFID-01',
                'location' => 'Main Campus Entrance Gate (Chhend Ring Rd)',
                'device' => 'Long-Range RFID Scanner Array',
                'status' => 'Online',
                'today_scans' => 1640,
                'latency_ms' => 18
            ],
            [
                'node_id' => 'BLOCK-A-RFID',
                'location' => 'Academic Block-A Ground Floor Door',
                'device' => 'Biometric + Smart Card Terminal',
                'status' => 'Online',
                'today_scans' => 890,
                'latency_ms' => 12
            ],
            [
                'node_id' => 'LIB-TURNSTILE',
                'location' => 'Biju Patnaik Central Library Turnstile',
                'device' => 'Barcode & Student RFID Flap Barrier',
                'status' => 'Online',
                'today_scans' => 420,
                'latency_ms' => 15
            ],
            [
                'node_id' => 'WIFI-CHHEND-AP',
                'location' => 'Campus Wi-Fi Core Mesh Network',
                'device' => 'Enterprise Aruba AP Controllers',
                'status' => 'Online',
                'today_scans' => 1280, // Connected devices
                'latency_ms' => 8
            ]
        ]
    ]);
    exit;
}

if ($action === 'broadcast' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true);

    $title = $data['title'] ?? 'Important Campus Notice';
    $target = $data['target'] ?? 'All Students';
    $content = $data['content'] ?? '';

    echo json_encode([
        'status' => 'success',
        'message' => "Circular dispatched to {$target} via SMS & WhatsApp Gateway.",
        'broadcast_id' => 'RIMS-BC-' . rand(1000, 9999),
        'recipients_count' => ($target === 'All Students' ? 1842 : 320),
        'dispatched_at' => date('Y-m-d H:i:s')
    ]);
    exit;
}

echo json_encode(['status' => 'error', 'message' => 'Invalid action']);
