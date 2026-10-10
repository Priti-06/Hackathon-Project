<?php
require_once __DIR__ . '/db.php';

$day = isset($_GET['day']) ? strtolower($_GET['day']) : 'monday';

$allDaysTimetable = [
    'monday' => [
        ['type' => 'class', 'timeRange' => '09:00 AM - 10:00 AM', 'duration' => '1 Hour (Slot 1)', 'subject' => 'MCA-301: Advanced Java & Enterprise Frameworks', 'faculty' => 'Prof. Dr. S. K. Mohanty', 'room' => 'Room 204, Academic Block-A', 'status' => 'scheduled', 'statusText' => 'Scheduled'],
        ['type' => 'class', 'timeRange' => '10:00 AM - 11:00 AM', 'duration' => '1 Hour (Slot 2)', 'subject' => 'MCA-302: Cloud Computing & Virtualization', 'faculty' => 'Dr. P. K. Nayak', 'room' => 'Room 204, Academic Block-A', 'status' => 'scheduled', 'statusText' => 'Scheduled'],
        ['type' => 'break', 'timeRange' => '11:00 AM - 11:15 AM', 'duration' => '15 Mins Short Break', 'title' => '☕ Campus Tea & Snack Break', 'desc' => 'Visit CampusEZ Canteen for hot Chai & Samosa or use Fast-Pass pickup'],
        ['type' => 'class', 'timeRange' => '11:15 AM - 12:15 PM', 'duration' => '1 Hour (Slot 3)', 'subject' => 'MCA-303: Design & Analysis of Algorithms', 'faculty' => 'Dr. Ananya Panda', 'room' => 'Room 206, Academic Block-A', 'status' => 'scheduled', 'statusText' => 'Scheduled'],
        ['type' => 'class', 'timeRange' => '12:15 PM - 01:15 PM', 'duration' => '1 Hour (Slot 4)', 'subject' => 'MCA-304: Software Engineering & Agile Methodologies', 'faculty' => 'Prof. R. C. Mishra', 'room' => 'Room 204, Academic Block-A', 'status' => 'suspended', 'statusText' => '🚫 Class Suspended (Faculty on University Duty - Study in Central Library)'],
        ['type' => 'break', 'timeRange' => '01:15 PM - 02:30 PM', 'duration' => '1 Hour 15 Mins Lunch Break', 'title' => '🍛 Official Lunch Break & Canteen Rush Hour', 'desc' => 'Pre-ordered Veg Lunch Thali (₹40) ready for pickup at Counter 1'],
        ['type' => 'class', 'timeRange' => '02:30 PM - 03:30 PM', 'duration' => '1 Hour (Slot 5)', 'subject' => 'MCA-305: Python & Machine Learning Practical Lab (Session 1)', 'faculty' => 'Dr. Ananya Panda', 'room' => 'Computer Lab 02, 1st Floor', 'status' => 'scheduled', 'statusText' => 'Scheduled &bull; AI Lab Session'],
        ['type' => 'class', 'timeRange' => '03:30 PM - 04:30 PM', 'duration' => '1 Hour (Slot 6)', 'subject' => 'MCA-305: Python & Machine Learning Practical Lab (Session 2)', 'faculty' => 'Dr. Ananya Panda', 'room' => 'Computer Lab 02, 1st Floor', 'status' => 'scheduled', 'statusText' => 'Scheduled &bull; Hands-on Coding'],
        ['type' => 'class', 'timeRange' => '04:30 PM - 05:30 PM', 'duration' => '1 Hour (Slot 7)', 'subject' => 'MCA-306: Web Tech & Major Project Mentorship', 'faculty' => 'Prof. Dr. S. K. Mohanty', 'room' => 'Computer Lab 01, Ground Floor', 'status' => 'scheduled', 'statusText' => 'Scheduled &bull; Project Review']
    ],
    'tuesday' => [
        ['type' => 'class', 'timeRange' => '09:00 AM - 10:00 AM', 'duration' => '1 Hour (Slot 1)', 'subject' => 'MCA-303: Design & Analysis of Algorithms', 'faculty' => 'Dr. Ananya Panda', 'room' => 'Room 204, Academic Block-A', 'status' => 'scheduled', 'statusText' => 'Scheduled'],
        ['type' => 'class', 'timeRange' => '10:00 AM - 11:00 AM', 'duration' => '1 Hour (Slot 2)', 'subject' => 'MCA-301: Advanced Java Frameworks', 'faculty' => 'Prof. Dr. S. K. Mohanty', 'room' => 'Room 204, Academic Block-A', 'status' => 'scheduled', 'statusText' => 'Scheduled'],
        ['type' => 'break', 'timeRange' => '11:00 AM - 11:15 AM', 'duration' => '15 Mins Short Break', 'title' => '☕ Campus Tea & Snack Break', 'desc' => 'Short break'],
        ['type' => 'class', 'timeRange' => '11:15 AM - 12:15 PM', 'duration' => '1 Hour (Slot 3)', 'subject' => 'MCA-302: Cloud Computing Architecture', 'faculty' => 'Dr. P. K. Nayak', 'room' => 'Room 206, Academic Block-A', 'status' => 'scheduled', 'statusText' => 'Scheduled'],
        ['type' => 'class', 'timeRange' => '12:15 PM - 01:15 PM', 'duration' => '1 Hour (Slot 4)', 'subject' => 'MCA-304: Software Testing & Quality Assurance', 'faculty' => 'Prof. R. C. Mishra', 'room' => 'Room 204, Academic Block-A', 'status' => 'scheduled', 'statusText' => 'Scheduled'],
        ['type' => 'break', 'timeRange' => '01:15 PM - 02:30 PM', 'duration' => '1 Hour 15 Mins Lunch Break', 'title' => '🍛 Official Lunch Break', 'desc' => 'Canteen pre-order pickup'],
        ['type' => 'class', 'timeRange' => '02:30 PM - 03:30 PM', 'duration' => '1 Hour (Slot 5)', 'subject' => 'MCA-306: Cloud Computing Practical Lab (Session 1)', 'faculty' => 'Dr. P. K. Nayak', 'room' => 'Computer Lab 02, 1st Floor', 'status' => 'scheduled', 'statusText' => 'Scheduled Lab'],
        ['type' => 'class', 'timeRange' => '03:30 PM - 04:30 PM', 'duration' => '1 Hour (Slot 6)', 'subject' => 'MCA-306: Cloud Computing Practical Lab (Session 2)', 'faculty' => 'Dr. P. K. Nayak', 'room' => 'Computer Lab 02, 1st Floor', 'status' => 'scheduled', 'statusText' => 'Scheduled Lab'],
        ['type' => 'class', 'timeRange' => '04:30 PM - 05:30 PM', 'duration' => '1 Hour (Slot 7)', 'subject' => 'MCA-307: Aptitude & Technical Interview Prep', 'faculty' => 'Prof. S. R. Dash', 'room' => 'Kalam Seminar Hall', 'status' => 'scheduled', 'statusText' => 'Scheduled &bull; Placement Training']
    ],
    'wednesday' => [
        ['type' => 'class', 'timeRange' => '09:00 AM - 10:00 AM', 'duration' => '1 Hour (Slot 1)', 'subject' => 'MCA-302: Cloud Virtualization & Containers', 'faculty' => 'Dr. P. K. Nayak', 'room' => 'Room 204, Academic Block-A', 'status' => 'scheduled', 'statusText' => 'Scheduled'],
        ['type' => 'class', 'timeRange' => '10:00 AM - 11:00 AM', 'duration' => '1 Hour (Slot 2)', 'subject' => 'MCA-304: Software Project Management', 'faculty' => 'Prof. R. C. Mishra', 'room' => 'Room 204, Academic Block-A', 'status' => 'scheduled', 'statusText' => 'Scheduled'],
        ['type' => 'break', 'timeRange' => '11:00 AM - 11:15 AM', 'duration' => '15 Mins Short Break', 'title' => '☕ Campus Tea & Snack Break', 'desc' => 'Short break'],
        ['type' => 'class', 'timeRange' => '11:15 AM - 12:15 PM', 'duration' => '1 Hour (Slot 3)', 'subject' => 'MCA-301: Spring Boot & Microservices Lab', 'faculty' => 'Prof. Dr. S. K. Mohanty', 'room' => 'Computer Lab 01, Ground Floor', 'status' => 'scheduled', 'statusText' => 'Scheduled'],
        ['type' => 'class', 'timeRange' => '12:15 PM - 01:15 PM', 'duration' => '1 Hour (Slot 4)', 'subject' => 'MCA-301: Spring Boot & Microservices Lab (Contd)', 'faculty' => 'Prof. Dr. S. K. Mohanty', 'room' => 'Computer Lab 01, Ground Floor', 'status' => 'scheduled', 'statusText' => 'Scheduled'],
        ['type' => 'break', 'timeRange' => '01:15 PM - 02:30 PM', 'duration' => '1 Hour 15 Mins Lunch Break', 'title' => '🍛 Official Lunch Break', 'desc' => 'Canteen lunch'],
        ['type' => 'class', 'timeRange' => '02:30 PM - 03:30 PM', 'duration' => '1 Hour (Slot 5)', 'subject' => 'MCA-308: Mobile Application Dev with Flutter', 'faculty' => 'Dr. A. K. Panda', 'room' => 'Room 206, Academic Block-A', 'status' => 'scheduled', 'statusText' => 'Scheduled'],
        ['type' => 'class', 'timeRange' => '03:30 PM - 04:30 PM', 'duration' => '1 Hour (Slot 6)', 'subject' => 'MCA-303: Algorithm Complexity & Dynamic Prog', 'faculty' => 'Dr. Ananya Panda', 'room' => 'Room 206, Academic Block-A', 'status' => 'scheduled', 'statusText' => 'Scheduled'],
        ['type' => 'class', 'timeRange' => '04:30 PM - 05:30 PM', 'duration' => '1 Hour (Slot 7)', 'subject' => 'LIB-101: Library Research & Case Studies', 'faculty' => 'Library Staff', 'room' => 'Biju Patnaik Central Library', 'status' => 'scheduled', 'statusText' => 'Scheduled']
    ],
    'thursday' => [
        ['type' => 'class', 'timeRange' => '09:00 AM - 10:00 AM', 'duration' => '1 Hour (Slot 1)', 'subject' => 'MCA-305: Python AI & Neural Network Theory', 'faculty' => 'Dr. Ananya Panda', 'room' => 'Room 204, Academic Block-A', 'status' => 'scheduled', 'statusText' => 'Scheduled'],
        ['type' => 'class', 'timeRange' => '10:00 AM - 11:00 AM', 'duration' => '1 Hour (Slot 2)', 'subject' => 'MCA-301: Enterprise Java Beans & Security', 'faculty' => 'Prof. Dr. S. K. Mohanty', 'room' => 'Room 204, Academic Block-A', 'status' => 'scheduled', 'statusText' => 'Scheduled'],
        ['type' => 'break', 'timeRange' => '11:00 AM - 11:15 AM', 'duration' => '15 Mins Short Break', 'title' => '☕ Campus Tea & Snack Break', 'desc' => 'Short break'],
        ['type' => 'class', 'timeRange' => '11:15 AM - 12:15 PM', 'duration' => '1 Hour (Slot 3)', 'subject' => 'MCA-302: Cloud Storage & Distributed DB', 'faculty' => 'Dr. P. K. Nayak', 'room' => 'Room 206, Academic Block-A', 'status' => 'scheduled', 'statusText' => 'Scheduled'],
        ['type' => 'class', 'timeRange' => '12:15 PM - 01:15 PM', 'duration' => '1 Hour (Slot 4)', 'subject' => 'MCA-308: Flutter Mobile App Lab', 'faculty' => 'Dr. A. K. Panda', 'room' => 'Computer Lab 01, Ground Floor', 'status' => 'scheduled', 'statusText' => 'Scheduled'],
        ['type' => 'break', 'timeRange' => '01:15 PM - 02:30 PM', 'duration' => '1 Hour 15 Mins Lunch Break', 'title' => '🍛 Official Lunch Break', 'desc' => 'Canteen lunch'],
        ['type' => 'class', 'timeRange' => '02:30 PM - 03:30 PM', 'duration' => '1 Hour (Slot 5)', 'subject' => 'MCA-304: Software Quality Assurance Lab', 'faculty' => 'Prof. R. C. Mishra', 'room' => 'Computer Lab 02, 1st Floor', 'status' => 'scheduled', 'statusText' => 'Scheduled'],
        ['type' => 'class', 'timeRange' => '03:30 PM - 04:30 PM', 'duration' => '1 Hour (Slot 6)', 'subject' => 'MCA-304: Software Quality Assurance Lab (Contd)', 'faculty' => 'Prof. R. C. Mishra', 'room' => 'Computer Lab 02, 1st Floor', 'status' => 'scheduled', 'statusText' => 'Scheduled'],
        ['type' => 'class', 'timeRange' => '04:30 PM - 05:30 PM', 'duration' => '1 Hour (Slot 7)', 'subject' => 'SEM-301: Technical Research Seminar', 'faculty' => 'Prof. Dr. S. K. Mohanty', 'room' => 'Kalam Seminar Hall', 'status' => 'scheduled', 'statusText' => 'Scheduled']
    ],
    'friday' => [
        ['type' => 'class', 'timeRange' => '09:00 AM - 10:00 AM', 'duration' => '1 Hour (Slot 1)', 'subject' => 'MCA-303: Graph Algorithms & Dynamic Trees', 'faculty' => 'Dr. Ananya Panda', 'room' => 'Room 204, Academic Block-A', 'status' => 'scheduled', 'statusText' => 'Scheduled'],
        ['type' => 'class', 'timeRange' => '10:00 AM - 11:00 AM', 'duration' => '1 Hour (Slot 2)', 'subject' => 'MCA-302: Serverless Computing & AWS Lambda', 'faculty' => 'Dr. P. K. Nayak', 'room' => 'Room 204, Academic Block-A', 'status' => 'scheduled', 'statusText' => 'Scheduled'],
        ['type' => 'break', 'timeRange' => '11:00 AM - 11:15 AM', 'duration' => '15 Mins Short Break', 'title' => '☕ Campus Tea & Snack Break', 'desc' => 'Short break'],
        ['type' => 'class', 'timeRange' => '11:15 AM - 12:15 PM', 'duration' => '1 Hour (Slot 3)', 'subject' => 'MCA-301: Advanced Java Full Stack Demo', 'faculty' => 'Prof. Dr. S. K. Mohanty', 'room' => 'Room 204, Academic Block-A', 'status' => 'scheduled', 'statusText' => 'Scheduled'],
        ['type' => 'class', 'timeRange' => '12:15 PM - 01:15 PM', 'duration' => '1 Hour (Slot 4)', 'subject' => 'MCA-305: Machine Learning Model Deployment', 'faculty' => 'Dr. Ananya Panda', 'room' => 'Computer Lab 02, 1st Floor', 'status' => 'scheduled', 'statusText' => 'Scheduled'],
        ['type' => 'break', 'timeRange' => '01:15 PM - 02:30 PM', 'duration' => '1 Hour 15 Mins Lunch Break', 'title' => '🍛 Official Lunch Break', 'desc' => 'Canteen lunch'],
        ['type' => 'class', 'timeRange' => '02:30 PM - 03:30 PM', 'duration' => '1 Hour (Slot 5)', 'subject' => 'MCA-309: Industrial Internship & Review', 'faculty' => 'Placement Cell', 'room' => 'Room 102, Placement Block', 'status' => 'scheduled', 'statusText' => 'Scheduled'],
        ['type' => 'class', 'timeRange' => '03:30 PM - 04:30 PM', 'duration' => '1 Hour (Slot 6)', 'subject' => 'MCA-309: Industrial Internship & Review (Contd)', 'faculty' => 'Placement Cell', 'room' => 'Room 102, Placement Block', 'status' => 'scheduled', 'statusText' => 'Scheduled'],
        ['type' => 'class', 'timeRange' => '04:30 PM - 05:30 PM', 'duration' => '1 Hour (Slot 7)', 'subject' => 'CLUB-101: RIMS Coding Club & Hackathon Workshop', 'faculty' => 'Student Tech Leads', 'room' => 'Computer Lab 01, Ground Floor', 'status' => 'scheduled', 'statusText' => 'Scheduled']
    ],
    'saturday' => [
        ['type' => 'class', 'timeRange' => '09:00 AM - 10:00 AM', 'duration' => '1 Hour (Slot 1)', 'subject' => 'TCS-301: TCS & National Level Placement Mock Test', 'faculty' => 'Training & Placement Cell', 'room' => 'Computer Lab 01 & 02', 'status' => 'scheduled', 'statusText' => 'Scheduled &bull; Online Test'],
        ['type' => 'class', 'timeRange' => '10:00 AM - 11:00 AM', 'duration' => '1 Hour (Slot 2)', 'subject' => 'TCS-301: Technical Coding Assessment Review', 'faculty' => 'Prof. Dr. S. K. Mohanty', 'room' => 'Kalam Seminar Hall', 'status' => 'scheduled', 'statusText' => 'Scheduled &bull; Code Review'],
        ['type' => 'break', 'timeRange' => '11:00 AM - 11:15 AM', 'duration' => '15 Mins Short Break', 'title' => '☕ Campus Tea Break', 'desc' => 'Short break'],
        ['type' => 'class', 'timeRange' => '11:15 AM - 12:15 PM', 'duration' => '1 Hour (Slot 3)', 'subject' => 'GD-301: Soft Skills & Group Discussion Practice', 'faculty' => 'Prof. S. R. Dash', 'room' => 'Conference Hall, 2nd Floor', 'status' => 'scheduled', 'statusText' => 'Scheduled'],
        ['type' => 'class', 'timeRange' => '12:15 PM - 01:15 PM', 'duration' => '1 Hour (Slot 4)', 'subject' => 'MENTOR-101: Faculty Mentor-Mentee Meeting', 'faculty' => 'All Department Mentors', 'room' => 'Respective Faculty Cabins', 'status' => 'scheduled', 'statusText' => 'Scheduled'],
        ['type' => 'break', 'timeRange' => '01:15 PM - 02:30 PM', 'duration' => '1 Hour 15 Mins Lunch Break', 'title' => '🍛 Half-Day Lunch & Campus Dispersal', 'desc' => 'Weekend bus service active']
    ]
];

$responseSchedule = isset($allDaysTimetable[$day]) ? $allDaysTimetable[$day] : $allDaysTimetable['monday'];

echo json_encode([
    'status' => 'success',
    'day' => $day,
    'institute' => 'CampusEZ Institute of Management & Technology (India)',
    'department' => 'MCA 2nd Year (3rd Semester)',
    'schedule' => $responseSchedule
]);
?>
