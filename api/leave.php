<?php
require_once __DIR__ . '/db.php';

$action = isset($_GET['action']) ? $_GET['action'] : 'list';

if ($action === 'list') {
    if ($pdo) {
        $stmt = $pdo->query("SELECT * FROM leave_applications ORDER BY created_at DESC");
        $leaves = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(['status' => 'success', 'leaves' => $leaves]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Database connection failed']);
    }
    exit;
}

if ($action === 'apply' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    $leaveId = 'RIMS-LV-' . rand(890, 999);
    $roll = isset($input['roll_number']) ? $input['roll_number'] : '23MCA014';
    $name = isset($input['student_name']) ? $input['student_name'] : 'Soumya Patnaik';
    $type = isset($input['leave_type']) ? $input['leave_type'] : 'Medical Leave';
    $start = isset($input['start_date']) ? $input['start_date'] : date('Y-m-d');
    $end = isset($input['end_date']) ? $input['end_date'] : date('Y-m-d');
    $days = isset($input['total_days']) ? intval($input['total_days']) : 1;
    $reason = isset($input['reason']) ? $input['reason'] : 'Personal/Academic reason';
    $mentor = isset($input['mentor_name']) ? $input['mentor_name'] : 'Prof. Dr. S. K. Mohanty';

    if ($pdo) {
        $stmt = $pdo->prepare("INSERT INTO leave_applications (leave_id, roll_number, student_name, leave_type, start_date, end_date, total_days, reason, mentor_name, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending Review', datetime('now'))");
        if ($stmt) {
            $stmt->execute([$leaveId, $roll, $name, $type, $start, $end, $days, $reason, $mentor]);
        }
    }

    echo json_encode([
        'status' => 'success',
        'message' => 'Leave Application Submitted Successfully to HOD Desk',
        'leave_id' => $leaveId,
        'leave_type' => $type,
        'total_days' => $days,
        'assigned_mentor' => $mentor,
        'review_status' => 'Pending Review'
    ]);
    exit;
    exit;
}

if ($action === 'approve' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $leaveId = $input['leave_id'] ?? '';
    if ($pdo && $leaveId) {
        $stmt = $pdo->prepare("UPDATE leave_applications SET status = 'Approved' WHERE leave_id = ?");
        $stmt->execute([$leaveId]);
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error']);
    }
    exit;
}

if ($action === 'reject' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $leaveId = $input['leave_id'] ?? '';
    if ($pdo && $leaveId) {
        $stmt = $pdo->prepare("UPDATE leave_applications SET status = 'Rejected' WHERE leave_id = ?");
        $stmt->execute([$leaveId]);
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error']);
    }
    exit;
}
?>
