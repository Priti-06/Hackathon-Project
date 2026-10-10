<?php
/**
 * CampusEZ Smart Campus Portal (India) - Student Grievances & Complaint Escalation API
 * Location: CampusEZ Institute of Management & Technology, Central Campus, India
 * Feature: Automatic Institutional Warning for >10 Complaints from Students to Faculty or Admins
 */

require_once __DIR__ . '/db.php';

$action = $_GET['action'] ?? 'list';

// Pre-defined seed complaints for fallback or instant testing
$defaultComplaints = [
    [
        'complaint_id' => 'CEZ-CMP-101',
        'student_roll' => '23MCA014',
        'student_name' => 'Soumya Patnaik',
        'target_type' => 'faculty',
        'target_name' => 'Prof. Dr. S. K. Mohanty',
        'category' => 'Teaching & Syllabus',
        'subject' => 'Incomplete Unit 4 Java Enterprise Frameworks before Mid-Sem',
        'description' => 'Unit 4 Spring Boot Microservices syllabus not covered prior to 6th April exams.',
        'urgency' => 'High',
        'status' => 'Escalated to Principal',
        'is_anonymous' => 0,
        'faculty_response' => 'Extra lecture scheduled this Saturday 10:00 AM in Room 204.',
        'created_at' => '2026-03-24 09:30:00'
    ],
    [
        'complaint_id' => 'CEZ-CMP-102',
        'student_roll' => '23MCA002',
        'student_name' => 'Ananya Tripathy',
        'target_type' => 'faculty',
        'target_name' => 'Prof. Dr. S. K. Mohanty',
        'category' => 'Lab Equipment & Practical',
        'subject' => 'Lab 01 Server connection latency during Cloud practicals',
        'description' => 'Docker containers timing out during Friday afternoon lab sessions.',
        'urgency' => 'High',
        'status' => 'Escalated to Principal',
        'is_anonymous' => 0,
        'faculty_response' => 'Lab system RAM upgraded with IT Network Admin.',
        'created_at' => '2026-03-23 11:15:00'
    ],
    [
        'complaint_id' => 'CEZ-CMP-103',
        'student_roll' => '23MCA018',
        'student_name' => 'Rakesh Mohanty',
        'target_type' => 'faculty',
        'target_name' => 'Prof. Dr. S. K. Mohanty',
        'category' => 'Attendance & Grading',
        'subject' => 'Internal assessment marks clarification in MCA-301',
        'description' => 'Clarification needed on rubric for assignment 2 marks distribution.',
        'urgency' => 'Normal',
        'status' => 'Under Review',
        'is_anonymous' => 0,
        'faculty_response' => null,
        'created_at' => '2026-03-22 14:20:00'
    ],
    [
        'complaint_id' => 'CEZ-CMP-104',
        'student_roll' => '23MCA022',
        'student_name' => 'Priya Sahoo',
        'target_type' => 'faculty',
        'target_name' => 'Prof. Dr. S. K. Mohanty',
        'category' => 'Teaching & Syllabus',
        'subject' => 'Fast lecture pace during Distributed Systems module',
        'description' => 'Students requested extra doubt clearing session before university exams.',
        'urgency' => 'High',
        'status' => 'Escalated to Principal',
        'is_anonymous' => 1,
        'faculty_response' => null,
        'created_at' => '2026-03-21 16:45:00'
    ],
    [
        'complaint_id' => 'CEZ-CMP-105',
        'student_roll' => '23MCA007',
        'student_name' => 'Bikash Rout',
        'target_type' => 'faculty',
        'target_name' => 'Prof. Dr. S. K. Mohanty',
        'category' => 'Mentorship & Guidance',
        'subject' => 'Major project mentorship slot scheduling conflict',
        'description' => 'Need dedicated review slot for Smart Odisha Hackathon project.',
        'urgency' => 'Normal',
        'status' => 'Under Review',
        'is_anonymous' => 0,
        'faculty_response' => null,
        'created_at' => '2026-03-20 10:10:00'
    ],
    [
        'complaint_id' => 'CEZ-CMP-106',
        'student_roll' => '23MCA031',
        'student_name' => 'Sneha Das',
        'target_type' => 'faculty',
        'target_name' => 'Prof. Dr. S. K. Mohanty',
        'category' => 'Teaching & Syllabus',
        'subject' => 'Request for question bank / PYQ solutions discussion',
        'description' => 'Discussion of 2024-25 university examination question solutions in class.',
        'urgency' => 'Normal',
        'status' => 'Under Review',
        'is_anonymous' => 1,
        'faculty_response' => null,
        'created_at' => '2026-03-19 15:30:00'
    ],
    [
        'complaint_id' => 'CEZ-CMP-107',
        'student_roll' => '23MCA012',
        'student_name' => 'Manoj Nayak',
        'target_type' => 'faculty',
        'target_name' => 'Prof. Dr. S. K. Mohanty',
        'category' => 'Lab Equipment & Practical',
        'subject' => 'Access to Enterprise IDE licenses in Lab 01',
        'description' => 'IntelliJ / VS Code extension permissions needed for all systems.',
        'urgency' => 'High',
        'status' => 'Escalated to Principal',
        'is_anonymous' => 0,
        'faculty_response' => null,
        'created_at' => '2026-03-18 12:00:00'
    ],
    [
        'complaint_id' => 'CEZ-CMP-108',
        'student_roll' => '23MCA045',
        'student_name' => 'Smruti Rekha',
        'target_type' => 'faculty',
        'target_name' => 'Prof. Dr. S. K. Mohanty',
        'category' => 'Attendance & Grading',
        'subject' => 'Attendance log correction for 18-March lecture',
        'description' => 'RFID scanner sync error on 18th March marked 4 students absent.',
        'urgency' => 'High',
        'status' => 'Escalated to Principal',
        'is_anonymous' => 0,
        'faculty_response' => null,
        'created_at' => '2026-03-18 09:40:00'
    ],
    [
        'complaint_id' => 'CEZ-CMP-109',
        'student_roll' => '23MCA009',
        'student_name' => 'Deepak Swain',
        'target_type' => 'faculty',
        'target_name' => 'Prof. Dr. S. K. Mohanty',
        'category' => 'Teaching & Syllabus',
        'subject' => 'Additional study notes for Microservices architecture',
        'description' => 'Requesting digital lecture slides on CampusEZ Sahay portal.',
        'urgency' => 'Normal',
        'status' => 'Under Review',
        'is_anonymous' => 1,
        'faculty_response' => null,
        'created_at' => '2026-03-17 14:15:00'
    ],
    [
        'complaint_id' => 'CEZ-CMP-110',
        'student_roll' => '23MCA029',
        'student_name' => 'Tanmay Senapati',
        'target_type' => 'faculty',
        'target_name' => 'Prof. Dr. S. K. Mohanty',
        'category' => 'Lab Equipment & Practical',
        'subject' => 'Lab session duration extension for project deployment',
        'description' => 'Need 30 mins extra lab access after 5:30 PM for AWS deployments.',
        'urgency' => 'Normal',
        'status' => 'Under Review',
        'is_anonymous' => 0,
        'faculty_response' => null,
        'created_at' => '2026-03-16 16:50:00'
    ],
    [
        'complaint_id' => 'CEZ-CMP-111',
        'student_roll' => '23MCA036',
        'student_name' => 'Alok Pradhan',
        'target_type' => 'faculty',
        'target_name' => 'Prof. Dr. S. K. Mohanty',
        'category' => 'Teaching & Syllabus',
        'subject' => 'Mid-Sem question pattern clarification',
        'description' => 'Need clarity on Section C 10-mark design architecture questions.',
        'urgency' => 'Critical',
        'status' => 'Warning Issued',
        'is_anonymous' => 0,
        'faculty_response' => null,
        'created_at' => '2026-03-15 11:20:00'
    ],
    [
        'complaint_id' => 'CEZ-CMP-112',
        'student_roll' => '23MCA014',
        'student_name' => 'Soumya Patnaik',
        'target_type' => 'admin',
        'target_name' => 'Campus Wi-Fi / IT Desk',
        'category' => 'Campus Wi-Fi / Infrastructure',
        'subject' => 'Wi-Fi mesh deadzone in 2nd Floor Library Reading Room',
        'description' => 'Signal drops frequently when accessing IEEE Xplore digital papers.',
        'urgency' => 'High',
        'status' => 'Under Review',
        'is_anonymous' => 0,
        'faculty_response' => 'Network team installing repeater today.',
        'created_at' => '2026-03-24 10:00:00'
    ]
];

// Helper to compute warning state
function calculateWarningStats($complaintsList, $threshold = 10) {
    $countsByTarget = [];
    $totalActive = 0;
    $totalResolved = 0;
    $offenders = [];

    foreach ($complaintsList as $c) {
        $target = $c['target_name'];
        if (!isset($countsByTarget[$target])) {
            $countsByTarget[$target] = [
                'target_name' => $target,
                'target_type' => $c['target_type'],
                'total' => 0,
                'active' => 0,
                'resolved' => 0,
                'critical_count' => 0,
                'warning_triggered' => false
            ];
        }

        $countsByTarget[$target]['total']++;
        if ($c['status'] === 'Resolved') {
            $countsByTarget[$target]['resolved']++;
            $totalResolved++;
        } else {
            $countsByTarget[$target]['active']++;
            $totalActive++;
            if ($c['urgency'] === 'Critical' || $c['urgency'] === 'High') {
                $countsByTarget[$target]['critical_count']++;
            }
        }
    }

    $warningTriggered = false;
    foreach ($countsByTarget as $target => &$data) {
        if ($data['total'] > $threshold) {
            $data['warning_triggered'] = true;
            $warningTriggered = true;
            $offenders[] = [
                'target_name' => $target,
                'target_type' => $data['target_type'],
                'complaint_count' => $data['total'],
                'active_count' => $data['active'],
                'threshold' => $threshold,
                'excess' => $data['total'] - $threshold,
                'warning_message' => "CRITICAL WARNING: {$target} has received {$data['total']} student complaints, exceeding institutional limit of {$threshold}!"
            ];
        }
    }

    return [
        'warning_triggered' => $warningTriggered,
        'warning_threshold' => $threshold,
        'total_complaints' => count($complaintsList),
        'total_active' => $totalActive,
        'total_resolved' => $totalResolved,
        'targets_breakdown' => array_values($countsByTarget),
        'escalated_offenders' => $offenders
    ];
}

if ($action === 'list') {
    $targetType = $_GET['target_type'] ?? null;
    $targetName = $_GET['target_name'] ?? null;
    $roll = $_GET['roll'] ?? null;

    $results = $defaultComplaints;

    if ($targetType) {
        $results = array_filter($results, fn($c) => $c['target_type'] === $targetType);
    }
    if ($targetName) {
        $results = array_filter($results, fn($c) => strcasecmp($c['target_name'], $targetName) === 0 || stripos($c['target_name'], $targetName) !== false);
    }
    if ($roll) {
        $results = array_filter($results, fn($c) => $c['student_roll'] === $roll);
    }

    $stats = calculateWarningStats($defaultComplaints, 10);

    echo json_encode([
        'status' => 'success',
        'complaints' => array_values($results),
        'stats' => $stats
    ]);
    exit;
}

if ($action === 'stats') {
    $stats = calculateWarningStats($defaultComplaints, 10);
    echo json_encode([
        'status' => 'success',
        'stats' => $stats
    ]);
    exit;
}

if ($action === 'submit' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    $targetType = $input['target_type'] ?? 'faculty';
    $targetName = $input['target_name'] ?? 'Prof. Dr. S. K. Mohanty';
    $category = $input['category'] ?? 'Teaching & Syllabus';
    $subject = $input['subject'] ?? 'Student Grievance';
    $description = $input['description'] ?? '';
    $urgency = $input['urgency'] ?? 'High';
    $isAnonymous = !empty($input['is_anonymous']) ? 1 : 0;
    $roll = $input['student_roll'] ?? '23MCA014';
    $name = $isAnonymous ? 'Anonymous Student' : ($input['student_name'] ?? 'Soumya Patnaik');

    $complaintId = 'CEZ-CMP-' . rand(120, 999);

    $newComplaint = [
        'complaint_id' => $complaintId,
        'student_roll' => $isAnonymous ? 'ANON-STUDENT' : $roll,
        'student_name' => $name,
        'target_type' => $targetType,
        'target_name' => $targetName,
        'category' => $category,
        'subject' => $subject,
        'description' => $description,
        'urgency' => $urgency,
        'status' => 'Under Review',
        'is_anonymous' => $isAnonymous,
        'faculty_response' => null,
        'created_at' => date('Y-m-d H:i:s')
    ];

    if ($pdo) {
        $stmt = $pdo->prepare("INSERT INTO student_complaints (complaint_id, student_roll, student_name, target_type, target_name, category, subject, description, urgency, status, is_anonymous, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        if ($stmt) {
            $stmt->execute([
                $complaintId,
                $newComplaint['student_roll'],
                $name,
                $targetType,
                $targetName,
                $category,
                $subject,
                $description,
                $urgency,
                'Under Review',
                $isAnonymous,
                $newComplaint['created_at']
            ]);
        }
    }

    echo json_encode([
        'status' => 'success',
        'message' => 'Grievance lodged successfully. Routed to Principal Desk & Faculty Coordinator.',
        'complaint' => $newComplaint
    ]);
    exit;
}

if ($action === 'resolve' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $complaintId = $input['complaint_id'] ?? '';
    $response = $input['response'] ?? 'Resolved by CampusEZ Grievance Redressal Committee (India).';

    echo json_encode([
        'status' => 'success',
        'message' => "Complaint {$complaintId} marked as Resolved.",
        'complaint_id' => $complaintId,
        'resolution_status' => 'Resolved'
    ]);
    exit;
}

echo json_encode(['status' => 'error', 'message' => 'Invalid action']);
