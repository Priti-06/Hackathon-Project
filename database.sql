-- =========================================================================
-- CampusEZ - Smart Campus Management Database Schema (XAMPP MySQL)
-- Database: rims_campus_db (CampusEZ India)
-- =========================================================================

CREATE DATABASE IF NOT EXISTS rims_campus_db;
USE rims_campus_db;

-- 1. Users Table (Students, Faculty, Admins)
CREATE TABLE IF NOT EXISTS users (
    roll_number VARCHAR(50) PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    role ENUM('student', 'faculty', 'admin') DEFAULT 'student',
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    department VARCHAR(100) NOT NULL,
    semester VARCHAR(50) DEFAULT '3rd Semester',
    wallet_balance_inr DECIMAL(8,2) DEFAULT 185.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Default Seed Users with Secure Hashed Passwords
-- Passwords:
-- Student: student@2026
-- Faculty: faculty@2026
-- Admin:   admin@2026
INSERT INTO users (roll_number, full_name, role, email, password_hash, department, semester, wallet_balance_inr)
VALUES 
('23MCA014', 'Soumya Patnaik', 'student', 'soumya.patnaik@campusez.in', '$2y$10$bC76G.svq8UW0FxdId71auIXKZaavkoMMP1./EgBMSxUHTOVzI6lS', 'Department of Computer Applications (MCA)', '3rd Semester', 185.00),
('CEZ-FAC-042', 'Prof. Dr. S. K. Mohanty', 'faculty', 'faculty@campusez.in', '$2y$10$XYagZ.VY3vg7c.AnICgIj.3xJ4Zy29MjG81rkzoQulVasX4nrGC9S', 'Department of Computer Applications (MCA & BCA)', 'Associate Professor', 450.00),
('CEZ-ADM-001', 'Dr. A. K. Panda', 'admin', 'admin@campusez.in', '$2y$10$TRbtk3W5H2llPNlYfO1dV.xem8rws1gBe1wkGBN6qmtP.dqxPyd6a', 'Executive Administration & Principal Office', 'Administrative Officer & Dean', 1000.00)
ON DUPLICATE KEY UPDATE 
    full_name=VALUES(full_name),
    role=VALUES(role),
    email=VALUES(email),
    password_hash=VALUES(password_hash),
    department=VALUES(department),
    semester=VALUES(semester),
    wallet_balance_inr=VALUES(wallet_balance_inr);

-- 2. Leave Applications Table
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

-- 3. Canteen Pre-Orders & UPI Payments
CREATE TABLE IF NOT EXISTS canteen_orders (
    token_number INT AUTO_INCREMENT PRIMARY KEY,
    order_id VARCHAR(30) NOT NULL,
    customer_roll VARCHAR(50) NOT NULL,
    customer_name VARCHAR(100) NOT NULL,
    item_name VARCHAR(100) NOT NULL,
    quantity INT DEFAULT 1,
    amount_inr DECIMAL(6,2) NOT NULL,
    pickup_slot VARCHAR(50) NOT NULL,
    payment_mode ENUM('UPI / QR Code', 'RIMS Pay Wallet', 'Cash on Pickup') NOT NULL,
    payment_status ENUM('PAID', 'PENDING') DEFAULT 'PAID',
    order_status ENUM('Preparing', 'Ready', 'Completed') DEFAULT 'Preparing',
    ordered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Examination Marks
CREATE TABLE IF NOT EXISTS exam_marks (
    mark_id INT AUTO_INCREMENT PRIMARY KEY,
    roll_number VARCHAR(50) NOT NULL,
    subject_code VARCHAR(20) NOT NULL,
    subject_name VARCHAR(100) NOT NULL,
    internal_marks INT NOT NULL,
    mid_sem_marks INT NOT NULL,
    total_internal INT NOT NULL,
    grade_letter VARCHAR(5) NOT NULL,
    grade_point DECIMAL(3,1) NOT NULL
);

-- 5. Campus Maintenance / Grievance Tickets
CREATE TABLE IF NOT EXISTS grievance_tickets (
    ticket_id VARCHAR(30) PRIMARY KEY,
    reported_by VARCHAR(50) NOT NULL,
    location VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    urgency ENUM('High', 'Normal', 'Low') DEFAULT 'Normal',
    status ENUM('Under Review', 'Assigned', 'Resolved') DEFAULT 'Under Review',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Student Complaints to Faculty & Admins (With 10+ Warning Escalation)
CREATE TABLE IF NOT EXISTS student_complaints (
    complaint_id VARCHAR(30) PRIMARY KEY,
    student_roll VARCHAR(50) NOT NULL,
    student_name VARCHAR(100) NOT NULL,
    target_type ENUM('faculty', 'admin') NOT NULL,
    target_name VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    urgency ENUM('Critical', 'High', 'Normal') DEFAULT 'High',
    status ENUM('Under Review', 'Escalated to Principal', 'Warning Issued', 'Resolved') DEFAULT 'Under Review',
    is_anonymous TINYINT(1) DEFAULT 0,
    faculty_response TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Sample Complaints (Initial 11 complaints to demonstrate >10 warning threshold)
INSERT INTO student_complaints (complaint_id, student_roll, student_name, target_type, target_name, category, subject, description, urgency, status, is_anonymous)
VALUES
('CEZ-CMP-101', '23MCA014', 'Soumya Patnaik', 'faculty', 'Prof. Dr. S. K. Mohanty', 'Teaching & Syllabus', 'Incomplete Unit 4 Java Enterprise Frameworks before Mid-Sem', 'Unit 4 Spring Boot Microservices syllabus not covered prior to 6th April exams.', 'High', 'Escalated to Principal', 0),
('CEZ-CMP-102', '23MCA002', 'Ananya Tripathy', 'faculty', 'Prof. Dr. S. K. Mohanty', 'Lab Equipment & Practical', 'Lab 01 Server connection latency during Cloud practicals', 'Docker containers timing out during Friday afternoon lab sessions.', 'High', 'Escalated to Principal', 0),
('CEZ-CMP-103', '23MCA018', 'Rakesh Mohanty', 'faculty', 'Prof. Dr. S. K. Mohanty', 'Attendance & Grading', 'Internal assessment marks clarification in MCA-301', 'Clarification needed on rubric for assignment 2 marks distribution.', 'Normal', 'Under Review', 0),
('CEZ-CMP-104', '23MCA022', 'Priya Sahoo', 'faculty', 'Prof. Dr. S. K. Mohanty', 'Teaching & Syllabus', 'Fast lecture pace during Distributed Systems module', 'Students requested extra doubt clearing session before university exams.', 'High', 'Escalated to Principal', 1),
('CEZ-CMP-105', '23MCA007', 'Bikash Rout', 'faculty', 'Prof. Dr. S. K. Mohanty', 'Mentorship & Guidance', 'Major project mentorship slot scheduling conflict', 'Need dedicated review slot for National Level Hackathon project.', 'Normal', 'Under Review', 0),
('CEZ-CMP-106', '23MCA031', 'Sneha Das', 'faculty', 'Prof. Dr. S. K. Mohanty', 'Teaching & Syllabus', 'Request for question bank / PYQ solutions discussion', 'Discussion of 2024-25 university examination question solutions in class.', 'Normal', 'Under Review', 1),
('CEZ-CMP-107', '23MCA012', 'Manoj Nayak', 'faculty', 'Prof. Dr. S. K. Mohanty', 'Lab Equipment & Practical', 'Access to Enterprise IDE licenses in Lab 01', 'IntelliJ / VS Code extension permissions needed for all systems.', 'High', 'Escalated to Principal', 0),
('CEZ-CMP-108', '23MCA045', 'Smruti Rekha', 'faculty', 'Prof. Dr. S. K. Mohanty', 'Attendance & Grading', 'Attendance log correction for 18-March lecture', 'RFID scanner sync error on 18th March marked 4 students absent.', 'High', 'Escalated to Principal', 0),
('CEZ-CMP-109', '23MCA009', 'Deepak Swain', 'faculty', 'Prof. Dr. S. K. Mohanty', 'Teaching & Syllabus', 'Additional study notes for Microservices architecture', 'Requesting digital lecture slides on CampusEZ Sahay portal.', 'Normal', 'Under Review', 1),
('CEZ-CMP-110', '23MCA029', 'Tanmay Senapati', 'faculty', 'Prof. Dr. S. K. Mohanty', 'Lab Equipment & Practical', 'Lab session duration extension for project deployment', 'Need 30 mins extra lab access after 5:30 PM for AWS deployments.', 'Normal', 'Under Review', 0),
('CEZ-CMP-111', '23MCA036', 'Alok Pradhan', 'faculty', 'Prof. Dr. S. K. Mohanty', 'Teaching & Syllabus', 'Mid-Sem question pattern clarification', 'Need clarity on Section C 10-mark design architecture questions.', 'Critical', 'Warning Issued', 0)
ON DUPLICATE KEY UPDATE subject=VALUES(subject);
