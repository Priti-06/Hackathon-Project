<?php
/**
 * CampusEZ - Smart Campus Backend Database Connection & Schema Provisioner (India)
 * Supports XAMPP MySQL PDO with automated database creation, table provisioning & SQLite fallback
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

$host    = '127.0.0.1';
$dbName  = 'rims_campus_db';
$dbUser  = 'root';
$dbPass  = '';
$charset = 'utf8mb4';

$pdo = null;
$dbDriver = 'none';

// Default Accounts Configuration:
$defaultSeedAccounts = [
    [
        'roll_number' => '23MCA014',
        'full_name' => 'Soumya Patnaik',
        'role' => 'student',
        'email' => 'soumya.patnaik@campusez.in',
        'plain_pass' => 'student@2026',
        'department' => 'Department of Computer Applications (MCA)',
        'semester' => '3rd Semester',
        'wallet_balance_inr' => 185.00,
        'is_hosteler' => 0
    ],
    [
        'roll_number' => '23MCA015',
        'full_name' => 'Rahul Sharma (Hosteler)',
        'role' => 'student',
        'email' => 'hostel@campusez.in',
        'plain_pass' => 'hostel@2026',
        'department' => 'Department of Computer Applications (MCA)',
        'semester' => '3rd Semester',
        'wallet_balance_inr' => 250.00,
        'is_hosteler' => 1
    ],
    [
        'roll_number' => 'CEZ-FAC-042',
        'full_name' => 'Prof. Dr. S. K. Mohanty',
        'role' => 'faculty',
        'email' => 'faculty@campusez.in',
        'plain_pass' => 'faculty@2026',
        'department' => 'Department of Computer Applications (MCA & BCA)',
        'semester' => 'Associate Professor',
        'wallet_balance_inr' => 450.00,
        'is_hosteler' => 0
    ],
    [
        'roll_number' => 'CEZ-ADM-001',
        'full_name' => 'Dr. A. K. Panda',
        'role' => 'admin',
        'email' => 'admin@campusez.in',
        'plain_pass' => 'admin@2026',
        'department' => 'Executive Administration & Principal Office',
        'semester' => 'Administrative Officer & Dean',
        'wallet_balance_inr' => 1000.00,
        'is_hosteler' => 0
    ]
];

try {
    // 1. Connect to MySQL server to ensure database exists
    $rootPdo = new PDO("mysql:host=$host;charset=$charset", $dbUser, $dbPass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
    $rootPdo->exec("CREATE DATABASE IF NOT EXISTS `$dbName` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");

    // 2. Connect to the specific database
    $dsn = "mysql:host=$host;dbname=$dbName;charset=$charset";
    $pdo = new PDO($dsn, $dbUser, $dbPass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false
    ]);
    $dbDriver = 'mysql';

    // 3. Ensure tables exist in MySQL
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS users (
            roll_number VARCHAR(50) PRIMARY KEY,
            full_name VARCHAR(100) NOT NULL,
            role ENUM('student', 'faculty', 'admin') DEFAULT 'student',
            email VARCHAR(100) UNIQUE NOT NULL,
            password_hash VARCHAR(255) NOT NULL,
            department VARCHAR(100) NOT NULL,
            semester VARCHAR(50) DEFAULT '3rd Semester',
            wallet_balance_inr DECIMAL(8,2) DEFAULT 185.00,
            is_hosteler BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS leave_applications (
            leave_id VARCHAR(30) PRIMARY KEY,
            roll_number VARCHAR(50) NOT NULL,
            student_name VARCHAR(100) NOT NULL,
            leave_type VARCHAR(50) NOT NULL,
            start_date DATE NOT NULL,
            end_date DATE NOT NULL,
            total_days INT NOT NULL,
            reason TEXT NOT NULL,
            mentor_name VARCHAR(100) NOT NULL,
            status ENUM('Pending Review', 'Approved', 'Rejected') DEFAULT 'Pending Review',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS canteen_orders (
            token_number INT AUTO_INCREMENT PRIMARY KEY,
            order_id VARCHAR(30) NOT NULL,
            customer_roll VARCHAR(50) NOT NULL,
            customer_name VARCHAR(100) NOT NULL,
            item_name VARCHAR(100) NOT NULL,
            quantity INT DEFAULT 1,
            amount_inr DECIMAL(6,2) NOT NULL,
            pickup_slot VARCHAR(50) NOT NULL,
            payment_mode VARCHAR(50) NOT NULL,
            payment_status VARCHAR(20) DEFAULT 'PAID',
            order_status VARCHAR(20) DEFAULT 'Preparing',
            ordered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS student_complaints (
            complaint_id VARCHAR(30) PRIMARY KEY,
            student_roll VARCHAR(50) NOT NULL,
            student_name VARCHAR(100) NOT NULL,
            target_type VARCHAR(20) NOT NULL,
            target_name VARCHAR(100) NOT NULL,
            category VARCHAR(100) NOT NULL,
            subject VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            urgency VARCHAR(20) DEFAULT 'High',
            status VARCHAR(50) DEFAULT 'Under Review',
            is_anonymous TINYINT(1) DEFAULT 0,
            faculty_response TEXT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    ");

    // 4. Seed / Synchronize Official Accounts in MySQL
    $stmtSeed = $pdo->prepare("
        INSERT INTO users (roll_number, full_name, role, email, password_hash, department, semester, wallet_balance_inr, is_hosteler)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE 
            full_name = VALUES(full_name),
            role = VALUES(role),
            email = VALUES(email),
            password_hash = VALUES(password_hash),
            department = VALUES(department),
            semester = VALUES(semester),
            wallet_balance_inr = VALUES(wallet_balance_inr),
            is_hosteler = VALUES(is_hosteler)
    ");

    foreach ($defaultSeedAccounts as $acc) {
        $hash = password_hash($acc['plain_pass'], PASSWORD_BCRYPT);
        $stmtSeed->execute([
            $acc['roll_number'],
            $acc['full_name'],
            $acc['role'],
            $acc['email'],
            $hash,
            $acc['department'],
            $acc['semester'],
            $acc['wallet_balance_inr'],
            $acc['is_hosteler']
        ]);
    }

} catch (Exception $e) {
    // Fallback to SQLite in local api folder if MySQL service is inaccessible
    try {
        $sqliteFile = __DIR__ . '/rims_campus.sqlite';
        $pdo = new PDO("sqlite:" . $sqliteFile, null, null, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_SILENT,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]);
        $dbDriver = 'sqlite';

        // Initialize SQLite tables
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS users (
                roll_number TEXT PRIMARY KEY,
                full_name TEXT NOT NULL,
                role TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                department TEXT NOT NULL,
                semester TEXT DEFAULT '3rd Semester',
                wallet_balance_inr REAL DEFAULT 185.00,
                is_hosteler INTEGER DEFAULT 0,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP
            );
            CREATE TABLE IF NOT EXISTS leave_applications (
                leave_id TEXT PRIMARY KEY,
                roll_number TEXT,
                student_name TEXT,
                leave_type TEXT,
                start_date TEXT,
                end_date TEXT,
                total_days INTEGER,
                reason TEXT,
                mentor_name TEXT,
                status TEXT,
                created_at TEXT
            );
            CREATE TABLE IF NOT EXISTS canteen_orders (
                token_number INTEGER PRIMARY KEY AUTOINCREMENT,
                order_id TEXT,
                customer_roll TEXT,
                customer_name TEXT,
                item_name TEXT,
                amount_inr REAL,
                pickup_slot TEXT,
                payment_mode TEXT,
                payment_status TEXT,
                order_status TEXT,
                ordered_at TEXT
            );
            CREATE TABLE IF NOT EXISTS student_complaints (
                complaint_id TEXT PRIMARY KEY,
                student_roll TEXT,
                student_name TEXT,
                target_type TEXT,
                target_name TEXT,
                category TEXT,
                subject TEXT,
                description TEXT,
                urgency TEXT,
                status TEXT,
                is_anonymous INTEGER DEFAULT 0,
                faculty_response TEXT,
                created_at TEXT
            );
        ");

        // Seed users in SQLite
        $stmtSqliteSeed = $pdo->prepare("
            INSERT OR REPLACE INTO users (roll_number, full_name, role, email, password_hash, department, semester, wallet_balance_inr)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ");
        foreach ($defaultSeedAccounts as $acc) {
            $hash = password_hash($acc['plain_pass'], PASSWORD_BCRYPT);
            $stmtSqliteSeed->execute([
                $acc['roll_number'],
                $acc['full_name'],
                $acc['role'],
                $acc['email'],
                $hash,
                $acc['department'],
                $acc['semester'],
                $acc['wallet_balance_inr']
            ]);
        }
    } catch (Exception $ex) {
        $pdo = null;
        $dbDriver = 'failed';
    }
}
?>
