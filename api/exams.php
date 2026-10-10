<?php
require_once __DIR__ . '/db.php';

$action = isset($_GET['action']) ? $_GET['action'] : 'all';

$marksData = [
    'student' => [
        'name' => 'Soumya Patnaik',
        'roll_number' => '23MCA014',
        'reg_number' => '2305202014',
        'course' => 'Master of Computer Applications (MCA)',
        'semester' => '3rd Semester (Regular)',
        'sgpa' => 8.74,
        'cgpa' => 8.62,
        'standing' => 'First Class with Distinction'
    ],
    'marks' => [
        ['code' => 'MCA-301', 'name' => 'Advanced Java & Enterprise Frameworks', 'faculty' => 'Prof. Dr. S. K. Mohanty', 'internal' => 28, 'mid_sem' => 18, 'total' => 46, 'grade' => 'O', 'point' => 10.0, 'status' => 'Passed'],
        ['code' => 'MCA-302', 'name' => 'Cloud Computing & Virtualization', 'faculty' => 'Dr. P. K. Nayak', 'internal' => 27, 'mid_sem' => 17, 'total' => 44, 'grade' => 'E', 'point' => 9.0, 'status' => 'Passed'],
        ['code' => 'MCA-303', 'name' => 'Design & Analysis of Algorithms', 'faculty' => 'Dr. Ananya Panda', 'internal' => 26, 'mid_sem' => 16, 'total' => 42, 'grade' => 'E', 'point' => 9.0, 'status' => 'Passed'],
        ['code' => 'MCA-304', 'name' => 'Software Engineering & Agile Methodologies', 'faculty' => 'Prof. R. C. Mishra', 'internal' => 25, 'mid_sem' => 17, 'total' => 42, 'grade' => 'A', 'point' => 8.0, 'status' => 'Passed'],
        ['code' => 'MCA-305', 'name' => 'Python & Machine Learning Practical Lab', 'faculty' => 'Dr. Ananya Panda', 'internal' => 29, 'mid_sem' => 19, 'total' => 48, 'grade' => 'O', 'point' => 10.0, 'status' => 'Passed'],
        ['code' => 'MCA-306', 'name' => 'Cloud Computing Practical Lab', 'faculty' => 'Dr. P. K. Nayak', 'internal' => 28, 'mid_sem' => 18, 'total' => 46, 'grade' => 'O', 'point' => 10.0, 'status' => 'Passed']
    ],
    'question_pattern' => [
        'exam_title' => 'University Semester Theory Examination Blueprint & Marking Scheme',
        'total_marks' => 70,
        'duration' => '3 Hours',
        'sections' => [
            [
                'section_name' => 'Section A: Short Conceptual Questions (Compulsory)',
                'structure' => '10 Questions of 2 Marks each',
                'marks' => '10 × 2 = 20 Marks',
                'description' => 'Covers all 5 syllabus modules uniformly. Tests core definitions, syntax, and fundamental theorems.'
            ],
            [
                'section_name' => 'Section B: Analytical & Problem-Solving Questions',
                'structure' => 'Answer any 5 Questions out of 7 Questions (6 Marks each)',
                'marks' => '5 × 6 = 30 Marks',
                'description' => 'Algorithmic traces, architecture block diagrams, code snippets, and design tradeoffs.'
            ],
            [
                'section_name' => 'Section C: Long Comprehensive / Case Study Questions',
                'structure' => 'Answer any 2 Questions out of 3 Questions (10 Marks each)',
                'marks' => '2 × 10 = 20 Marks',
                'description' => 'Full enterprise application architecture, complete code implementation, or database schema design.'
            ]
        ]
    ],
    'previous_year_questions' => [
        ['id' => 'PYQ-2025-01', 'subject' => 'MCA-301: Advanced Java & Enterprise Frameworks', 'year' => '2025 (Winter)', 'semester' => '3rd Sem', 'downloads' => 420, 'file_size' => '1.8 MB PDF'],
        ['id' => 'PYQ-2025-02', 'subject' => 'MCA-302: Cloud Computing & Virtualization', 'year' => '2025 (Winter)', 'semester' => '3rd Sem', 'downloads' => 380, 'file_size' => '2.1 MB PDF'],
        ['id' => 'PYQ-2025-03', 'subject' => 'MCA-303: Design & Analysis of Algorithms', 'year' => '2025 (Winter)', 'semester' => '3rd Sem', 'downloads' => 510, 'file_size' => '2.4 MB PDF'],
        ['id' => 'PYQ-2024-01', 'subject' => 'MCA-301: Advanced Java (Spring & Hibernate)', 'year' => '2024 (Winter)', 'semester' => '3rd Sem', 'downloads' => 640, 'file_size' => '1.9 MB PDF'],
        ['id' => 'PYQ-2024-02', 'subject' => 'MCA-304: Software Engineering & Agile Testing', 'year' => '2024 (Winter)', 'semester' => '3rd Sem', 'downloads' => 310, 'file_size' => '1.6 MB PDF'],
        ['id' => 'PYQ-2023-01', 'subject' => 'MCA-305: Python & Machine Learning Essentials', 'year' => '2023 (Winter)', 'semester' => '3rd Sem', 'downloads' => 580, 'file_size' => '2.0 MB PDF']
    ]
];

echo json_encode(['status' => 'success', 'data' => $marksData]);
?>
