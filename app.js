/**
 * CampusEZ - Smart Campus Portal
 * Complete Multi-Section Interactive Application Logic & Backend Integration
 * Location: CampusEZ Institute of Management & Technology, Central Campus, India
 */

const rimsApp = {
  // Application State
  isLoggedIn: false,
  pendingTargetSection: null,
  currentRole: 'student', // 'student' | 'faculty' | 'admin'
  currentSection: 'section-student-dashboard',
  currentTimetableDay: 'monday',
  userWalletBalance: 185, // in INR (₹)
  activeCanteenCategory: 'all',
  activePaymentMode: 'upi',
  activeProfileTab: 'tab-prof-academic',
  canteenCart: {}, // itemId -> { id, name, price, emoji, qty }

  // Institutional Profile State
  profileData: {
    student: {
      name: 'Soumya Patnaik',
      initials: 'SP',
      role: 'student',
      rollNo: '23MCA014',
      regNo: '2305202014',
      degree: 'Master of Computer Applications (MCA - 2 Year Regular)',
      department: 'Department of Computer Applications (Academic Block-A)',
      batch: '2024 – 2026 (2nd Year Postgraduate)',
      semester: '3rd Semester (Winter 2025-26)',
      status: 'Active Regular Student',
      cgpa: '8.84',
      attendance: '86.4%',
      balance: '185.00',
      rfid: 'RF-CEZ-8842-IN',
      blood: 'O+ (Positive)',
      dob: '14-Aug-2002 (Age: 23 Years)',
      gender: 'Male',
      cemail: 'soumya.patnaik@campusez.in',
      pemail: 'soumya.p2002@gmail.com',
      phone: '+91 98610 44219',
      altPhone: '+91 94370 81234',
      emergency: '+91 94370 81234 (Sri S. K. Patnaik - Father)',
      hostel: 'Central Student Hostel (Block-B, Room #214), CampusEZ Main Campus, India - 110001',
      permanent: 'HIG-42, Phase-2, Central Enclave, New Delhi, India - 110001',
      father: 'Sri Sudhir Kumar Patnaik (National Infrastructure Authority)',
      mother: 'Smt. Rashmi Rekha Patnaik',
      mentor: 'Dr. Ananya Panda (Associate Prof, Cabin 204)',
      barcode: 'CEZ*23MCA014*2026',
      validThru: '30-JUNE-2026',
      bio: 'MCA postgraduate candidate passionate about Cloud Infrastructure, Distributed Java Microservices & AI Engineering. Team Lead for Smart India Hackathon.'
    },
    faculty: {
      name: 'Prof. Dr. S. K. Mohanty',
      initials: 'SM',
      role: 'faculty',
      rollNo: 'CEZ-FAC-042',
      regNo: 'Ph.D. (Central University, India)',
      degree: 'Associate Professor & Post-Graduate Coordinator',
      department: 'Department of Computer Applications (MCA & BCA)',
      batch: '14 Years Academic & Research Service',
      semester: 'Senior Associate Professor & Head Mentor',
      status: 'Permanent Faculty • PG Board Member',
      cgpa: '18 Papers',
      attendance: '96.2%',
      balance: '450.00',
      rfid: 'RF-FAC-2012-IN',
      blood: 'B+ (Positive)',
      dob: '22-May-1981 (Age: 44 Years)',
      gender: 'Male',
      cemail: 'sk.mohanty@campusez.in',
      pemail: 'sk.mohanty.research@gmail.com',
      phone: '+91 98611 77332',
      altPhone: '+91 94371 99882',
      emergency: '+91 94371 99882 (Family)',
      hostel: 'CampusEZ Faculty Quarters (Block-A, Flat #102), Central Campus, India',
      permanent: 'Plot 418, Civil Enclave, New Delhi, India - 110001',
      father: 'Late Sri B. C. Mohanty (Educationist)',
      mother: 'Smt. Pravati Mohanty',
      mentor: 'PG Academic Dean & Principal Desk',
      barcode: 'CEZ*FAC*042*PERM',
      validThru: 'PERMANENT TENURE',
      bio: 'Associate Professor in Computer Applications at CampusEZ India with 14+ years of teaching and doctoral research in Distributed Computing, Enterprise Cloud Architecture & AI Systems.'
    }
  },

  // 1. Timetable Database for all 6 distinct days with exact 1-hour slots & breaks
  timetableSchedule: {
    monday: [
      {
        type: 'class',
        timeRange: '09:00 AM - 10:00 AM',
        duration: '1 Hour (Slot 1)',
        subject: 'MCA-301: Advanced Java & Enterprise Frameworks',
        faculty: 'Prof. Dr. S. K. Mohanty',
        room: 'Room 204, Academic Block-A',
        status: 'scheduled',
        statusText: 'Scheduled &bull; Class On-Going'
      },
      {
        type: 'class',
        timeRange: '10:00 AM - 11:00 AM',
        duration: '1 Hour (Slot 2)',
        subject: 'MCA-302: Cloud Computing & Virtualization',
        faculty: 'Dr. P. K. Nayak',
        room: 'Room 204, Academic Block-A',
        status: 'scheduled',
        statusText: 'Scheduled'
      },
      {
        type: 'break',
        timeRange: '11:00 AM - 11:15 AM',
        duration: '15 Mins Short Break',
        title: '☕ Campus Tea & Snack Break',
        desc: 'Visit RIMS Canteen for hot Chai & Samosa or use Fast-Pass pre-order pickup'
      },
      {
        type: 'class',
        timeRange: '11:15 AM - 12:15 PM',
        duration: '1 Hour (Slot 3)',
        subject: 'MCA-303: Design & Analysis of Algorithms',
        faculty: 'Dr. Ananya Panda',
        room: 'Room 206, Academic Block-A',
        status: 'scheduled',
        statusText: 'Scheduled'
      },
      {
        type: 'class',
        timeRange: '12:15 PM - 01:15 PM',
        duration: '1 Hour (Slot 4)',
        subject: 'MCA-304: Software Engineering & Agile Methodologies',
        faculty: 'Prof. R. C. Mishra',
        room: 'Room 204, Academic Block-A',
        status: 'suspended',
        statusText: '🚫 Class Suspended (Faculty on University Duty - Study in Central Library)'
      },
      {
        type: 'break',
        timeRange: '01:15 PM - 02:30 PM',
        duration: '1 Hour 15 Mins Lunch Break',
        title: '🍛 Official Lunch Break & Canteen Rush Hour',
        desc: 'Pre-ordered Veg Lunch Thali (₹40) ready for pickup at Counter 1'
      },
      {
        type: 'class',
        timeRange: '02:30 PM - 03:30 PM',
        duration: '1 Hour (Slot 5)',
        subject: 'MCA-305: Python & Machine Learning Practical Lab (Session 1)',
        faculty: 'Dr. Ananya Panda',
        room: 'Computer Lab 02, 1st Floor',
        status: 'scheduled',
        statusText: 'Scheduled &bull; AI Lab Session'
      },
      {
        type: 'class',
        timeRange: '03:30 PM - 04:30 PM',
        duration: '1 Hour (Slot 6)',
        subject: 'MCA-305: Python & Machine Learning Practical Lab (Session 2)',
        faculty: 'Dr. Ananya Panda',
        room: 'Computer Lab 02, 1st Floor',
        status: 'scheduled',
        statusText: 'Scheduled &bull; Hands-on Coding'
      },
      {
        type: 'class',
        timeRange: '04:30 PM - 05:30 PM',
        duration: '1 Hour (Slot 7)',
        subject: 'MCA-306: Web Tech & Major Project Mentorship',
        faculty: 'Prof. Dr. S. K. Mohanty',
        room: 'Computer Lab 01, Ground Floor',
        status: 'scheduled',
        statusText: 'Scheduled &bull; Project Review'
      }
    ],
    tuesday: [
      {
        type: 'class',
        timeRange: '09:00 AM - 10:00 AM',
        duration: '1 Hour (Slot 1)',
        subject: 'MCA-303: Design & Analysis of Algorithms',
        faculty: 'Dr. Ananya Panda',
        room: 'Room 204, Academic Block-A',
        status: 'scheduled',
        statusText: 'Scheduled'
      },
      {
        type: 'class',
        timeRange: '10:00 AM - 11:00 AM',
        duration: '1 Hour (Slot 2)',
        subject: 'MCA-301: Advanced Java Frameworks',
        faculty: 'Prof. Dr. S. K. Mohanty',
        room: 'Room 204, Academic Block-A',
        status: 'scheduled',
        statusText: 'Scheduled'
      },
      {
        type: 'break',
        timeRange: '11:00 AM - 11:15 AM',
        duration: '15 Mins Short Break',
        title: '☕ Campus Tea & Snack Break',
        desc: 'Short recreation break in food court'
      },
      {
        type: 'class',
        timeRange: '11:15 AM - 12:15 PM',
        duration: '1 Hour (Slot 3)',
        subject: 'MCA-302: Cloud Computing Architecture',
        faculty: 'Dr. P. K. Nayak',
        room: 'Room 206, Academic Block-A',
        status: 'scheduled',
        statusText: 'Scheduled'
      },
      {
        type: 'class',
        timeRange: '12:15 PM - 01:15 PM',
        duration: '1 Hour (Slot 4)',
        subject: 'MCA-304: Software Testing & Quality Assurance',
        faculty: 'Prof. R. C. Mishra',
        room: 'Room 204, Academic Block-A',
        status: 'scheduled',
        statusText: 'Scheduled'
      },
      {
        type: 'break',
        timeRange: '01:15 PM - 02:30 PM',
        duration: '1 Hour 15 Mins Lunch Break',
        title: '🍛 Official Lunch Break',
        desc: 'Canteen pre-order pickup'
      },
      {
        type: 'class',
        timeRange: '02:30 PM - 03:30 PM',
        duration: '1 Hour (Slot 5)',
        subject: 'MCA-306: Cloud Computing Practical Lab (Session 1)',
        faculty: 'Dr. P. K. Nayak',
        room: 'Computer Lab 02, 1st Floor',
        status: 'scheduled',
        statusText: 'Scheduled Lab'
      },
      {
        type: 'class',
        timeRange: '03:30 PM - 04:30 PM',
        duration: '1 Hour (Slot 6)',
        subject: 'MCA-306: Cloud Computing Practical Lab (Session 2)',
        faculty: 'Dr. P. K. Nayak',
        room: 'Computer Lab 02, 1st Floor',
        status: 'scheduled',
        statusText: 'Scheduled Lab'
      },
      {
        type: 'class',
        timeRange: '04:30 PM - 05:30 PM',
        duration: '1 Hour (Slot 7)',
        subject: 'MCA-307: Aptitude & Technical Interview Prep',
        faculty: 'Prof. S. R. Dash',
        room: 'Kalam Seminar Hall',
        status: 'scheduled',
        statusText: 'Scheduled &bull; Placement Cell'
      }
    ],
    wednesday: [
      {
        type: 'class',
        timeRange: '09:00 AM - 10:00 AM',
        duration: '1 Hour (Slot 1)',
        subject: 'MCA-302: Cloud Virtualization & Containers (Docker/K8s)',
        faculty: 'Dr. P. K. Nayak',
        room: 'Room 204, Academic Block-A',
        status: 'scheduled',
        statusText: 'Scheduled'
      },
      {
        type: 'class',
        timeRange: '10:00 AM - 11:00 AM',
        duration: '1 Hour (Slot 2)',
        subject: 'MCA-304: Software Project Management & DevOps',
        faculty: 'Prof. R. C. Mishra',
        room: 'Room 204, Academic Block-A',
        status: 'scheduled',
        statusText: 'Scheduled'
      },
      {
        type: 'break',
        timeRange: '11:00 AM - 11:15 AM',
        duration: '15 Mins Short Break',
        title: '☕ Campus Tea & Snack Break',
        desc: 'Grab a quick filter coffee or samosa'
      },
      {
        type: 'class',
        timeRange: '11:15 AM - 12:15 PM',
        duration: '1 Hour (Slot 3)',
        subject: 'MCA-301: Spring Boot & Microservices Lab (Session 1)',
        faculty: 'Prof. Dr. S. K. Mohanty',
        room: 'Computer Lab 01, Ground Floor',
        status: 'scheduled',
        statusText: 'Scheduled Lab Block'
      },
      {
        type: 'class',
        timeRange: '12:15 PM - 01:15 PM',
        duration: '1 Hour (Slot 4)',
        subject: 'MCA-301: Spring Boot & Microservices Lab (Session 2)',
        faculty: 'Prof. Dr. S. K. Mohanty',
        room: 'Computer Lab 01, Ground Floor',
        status: 'scheduled',
        statusText: 'Scheduled Lab Block'
      },
      {
        type: 'break',
        timeRange: '01:15 PM - 02:30 PM',
        duration: '1 Hour 15 Mins Lunch Break',
        title: '🍛 Official Lunch Break',
        desc: 'Hot Paneer Thali ready for collection'
      },
      {
        type: 'class',
        timeRange: '02:30 PM - 03:30 PM',
        duration: '1 Hour (Slot 5)',
        subject: 'MCA-308: Mobile Application Dev with Flutter',
        faculty: 'Dr. A. K. Panda',
        room: 'Room 206, Academic Block-A',
        status: 'scheduled',
        statusText: 'Scheduled'
      },
      {
        type: 'class',
        timeRange: '03:30 PM - 04:30 PM',
        duration: '1 Hour (Slot 6)',
        subject: 'MCA-303: Dynamic Programming & Graph Theory',
        faculty: 'Dr. Ananya Panda',
        room: 'Room 206, Academic Block-A',
        status: 'scheduled',
        statusText: 'Scheduled'
      },
      {
        type: 'class',
        timeRange: '04:30 PM - 05:30 PM',
        duration: '1 Hour (Slot 7)',
        subject: 'LIB-101: Central Library Research & Case Studies',
        faculty: 'Library In-charge',
        room: 'Biju Patnaik Central Library',
        status: 'scheduled',
        statusText: 'Scheduled Self-Study'
      }
    ],
    thursday: [
      {
        type: 'class',
        timeRange: '09:00 AM - 10:00 AM',
        duration: '1 Hour (Slot 1)',
        subject: 'MCA-305: Python AI & Neural Network Theory',
        faculty: 'Dr. Ananya Panda',
        room: 'Room 204, Academic Block-A',
        status: 'scheduled',
        statusText: 'Scheduled'
      },
      {
        type: 'class',
        timeRange: '10:00 AM - 11:00 AM',
        duration: '1 Hour (Slot 2)',
        subject: 'MCA-301: Enterprise Java Security & JWT',
        faculty: 'Prof. Dr. S. K. Mohanty',
        room: 'Room 204, Academic Block-A',
        status: 'scheduled',
        statusText: 'Scheduled'
      },
      {
        type: 'break',
        timeRange: '11:00 AM - 11:15 AM',
        duration: '15 Mins Short Break',
        title: '☕ Campus Tea & Snack Break',
        desc: 'Short break'
      },
      {
        type: 'class',
        timeRange: '11:15 AM - 12:15 PM',
        duration: '1 Hour (Slot 3)',
        subject: 'MCA-302: Cloud Storage & Distributed NoSQL DB',
        faculty: 'Dr. P. K. Nayak',
        room: 'Room 206, Academic Block-A',
        status: 'scheduled',
        statusText: 'Scheduled'
      },
      {
        type: 'class',
        timeRange: '12:15 PM - 01:15 PM',
        duration: '1 Hour (Slot 4)',
        subject: 'MCA-308: Flutter UI & State Management Lab',
        faculty: 'Dr. A. K. Panda',
        room: 'Computer Lab 01, Ground Floor',
        status: 'scheduled',
        statusText: 'Scheduled Lab'
      },
      {
        type: 'break',
        timeRange: '01:15 PM - 02:30 PM',
        duration: '1 Hour 15 Mins Lunch Break',
        title: '🍛 Official Lunch Break',
        desc: 'Canteen food pickup'
      },
      {
        type: 'class',
        timeRange: '02:30 PM - 03:30 PM',
        duration: '1 Hour (Slot 5)',
        subject: 'MCA-304: Software Quality Assurance & Selenium Lab (Session 1)',
        faculty: 'Prof. R. C. Mishra',
        room: 'Computer Lab 02, 1st Floor',
        status: 'scheduled',
        statusText: 'Scheduled'
      },
      {
        type: 'class',
        timeRange: '03:30 PM - 04:30 PM',
        duration: '1 Hour (Slot 6)',
        subject: 'MCA-304: Software Quality Assurance & Selenium Lab (Session 2)',
        faculty: 'Prof. R. C. Mishra',
        room: 'Computer Lab 02, 1st Floor',
        status: 'scheduled',
        statusText: 'Scheduled'
      },
      {
        type: 'class',
        timeRange: '04:30 PM - 05:30 PM',
        duration: '1 Hour (Slot 7)',
        subject: 'SEM-301: Technical Research Paper Presentation',
        faculty: 'Prof. Dr. S. K. Mohanty',
        room: 'Kalam Seminar Hall',
        status: 'scheduled',
        statusText: 'Scheduled Seminar'
      }
    ],
    friday: [
      {
        type: 'class',
        timeRange: '09:00 AM - 10:00 AM',
        duration: '1 Hour (Slot 1)',
        subject: 'MCA-303: Graph Algorithms, Trees & NP-Completeness',
        faculty: 'Dr. Ananya Panda',
        room: 'Room 204, Academic Block-A',
        status: 'scheduled',
        statusText: 'Scheduled'
      },
      {
        type: 'class',
        timeRange: '10:00 AM - 11:00 AM',
        duration: '1 Hour (Slot 2)',
        subject: 'MCA-302: Serverless Computing & AWS Lambda',
        faculty: 'Dr. P. K. Nayak',
        room: 'Room 204, Academic Block-A',
        status: 'scheduled',
        statusText: 'Scheduled'
      },
      {
        type: 'break',
        timeRange: '11:00 AM - 11:15 AM',
        duration: '15 Mins Short Break',
        title: '☕ Campus Tea & Snack Break',
        desc: 'Short break'
      },
      {
        type: 'class',
        timeRange: '11:15 AM - 12:15 PM',
        duration: '1 Hour (Slot 3)',
        subject: 'MCA-301: Full Stack React & Spring Integration',
        faculty: 'Prof. Dr. S. K. Mohanty',
        room: 'Room 204, Academic Block-A',
        status: 'scheduled',
        statusText: 'Scheduled'
      },
      {
        type: 'class',
        timeRange: '12:15 PM - 01:15 PM',
        duration: '1 Hour (Slot 4)',
        subject: 'MCA-305: Machine Learning Model Deployment (Flask API)',
        faculty: 'Dr. Ananya Panda',
        room: 'Computer Lab 02, 1st Floor',
        status: 'scheduled',
        statusText: 'Scheduled'
      },
      {
        type: 'break',
        timeRange: '01:15 PM - 02:30 PM',
        duration: '1 Hour 15 Mins Lunch Break',
        title: '🍛 Official Lunch Break',
        desc: 'Canteen lunch'
      },
      {
        type: 'class',
        timeRange: '02:30 PM - 03:30 PM',
        duration: '1 Hour (Slot 5)',
        subject: 'MCA-309: Industrial Internship & Resume Building',
        faculty: 'Training & Placement Cell',
        room: 'Room 102, Placement Block',
        status: 'scheduled',
        statusText: 'Scheduled'
      },
      {
        type: 'class',
        timeRange: '03:30 PM - 04:30 PM',
        duration: '1 Hour (Slot 6)',
        subject: 'MCA-309: Technical Mock Interview Drill',
        faculty: 'Training & Placement Cell',
        room: 'Room 102, Placement Block',
        status: 'scheduled',
        statusText: 'Scheduled'
      },
      {
        type: 'class',
        timeRange: '04:30 PM - 05:30 PM',
        duration: '1 Hour (Slot 7)',
        subject: 'CLUB-101: RIMS Coding Club & Hackathon Workshop',
        faculty: 'Student Tech Leads',
        room: 'Computer Lab 01, Ground Floor',
        status: 'scheduled',
        statusText: 'Scheduled Activity'
      }
    ],
    saturday: [
      {
        type: 'class',
        timeRange: '09:00 AM - 10:00 AM',
        duration: '1 Hour (Slot 1)',
        subject: 'TCS-301: TCS / National Placement Mock Test (NQT Pattern)',
        faculty: 'Training & Placement Cell',
        room: 'Computer Lab 01 & 02',
        status: 'scheduled',
        statusText: 'Scheduled &bull; Online Assessment'
      },
      {
        type: 'class',
        timeRange: '10:00 AM - 11:00 AM',
        duration: '1 Hour (Slot 2)',
        subject: 'TCS-301: Technical Coding Assessment Solutions Review',
        faculty: 'Prof. Dr. S. K. Mohanty',
        room: 'Kalam Seminar Hall',
        status: 'scheduled',
        statusText: 'Scheduled &bull; Problem Discussion'
      },
      {
        type: 'break',
        timeRange: '11:00 AM - 11:15 AM',
        duration: '15 Mins Short Break',
        title: '☕ Campus Tea Break',
        desc: 'Recreation & Networking'
      },
      {
        type: 'class',
        timeRange: '11:15 AM - 12:15 PM',
        duration: '1 Hour (Slot 3)',
        subject: 'GD-301: Corporate Communication & Group Discussion Practice',
        faculty: 'Prof. S. R. Dash',
        room: 'Conference Hall, 2nd Floor',
        status: 'scheduled',
        statusText: 'Scheduled &bull; Soft Skills Drill'
      },
      {
        type: 'class',
        timeRange: '12:15 PM - 01:15 PM',
        duration: '1 Hour (Slot 4)',
        subject: 'MENTOR-101: Faculty Mentor-Mentee One-on-One Interaction',
        faculty: 'All MCA Faculty Mentors',
        room: 'Respective Faculty Cabins',
        status: 'scheduled',
        statusText: 'Scheduled &bull; Academic Guidance'
      },
      {
        type: 'break',
        timeRange: '01:15 PM - 02:30 PM',
        duration: '1 Hour 15 Mins Lunch Break',
        title: '🍛 Half-Day Lunch & Campus Dispersal',
        desc: 'RIMS Campus Bus service departures at 2:00 PM & 2:30 PM'
      }
    ]
  },

  // 2. Full Canteen Menu Items (with Indian Rupee ₹ Prices)
  canteenMenu: [
    {
      id: 'food-01',
      category: 'lunch',
      name: 'RIMS Special Veg Lunch Thali',
      desc: 'Steamed Rice, Yellow Dal Tadka, Paneer Masala, Mixed Veg, Crispy Papad & Fresh Salad',
      price: 40,
      emoji: '🍛',
      prepTime: 'Hot & Ready'
    },
    {
      id: 'food-02',
      category: 'lunch',
      name: 'Special Egg Curry Thali',
      desc: '2-Egg Curry, Rice, Dal, Aloo Bhaja, Papad & Salad',
      price: 55,
      emoji: '🍳',
      prepTime: '5 Mins'
    },
    {
      id: 'food-03',
      category: 'lunch',
      name: 'Paneer Butter Masala Thali',
      desc: 'Rich Shahi Paneer, 3 Butter Rotis, Jeera Rice, Dal Fry & Gulab Jamun',
      price: 65,
      emoji: '🍲',
      prepTime: '5 Mins'
    },
    {
      id: 'food-04',
      category: 'lunch',
      name: 'RIMS Hyderabadi Veg Biryani',
      desc: 'Fragrant Basmati rice cooked with spiced vegetables, served with cool Boondi Raita',
      price: 50,
      emoji: '🍚',
      prepTime: 'Hot & Ready'
    },
    {
      id: 'food-05',
      category: 'breakfast',
      name: 'Hot Samosa & Masala Chai Combo (2 Pcs)',
      desc: 'Freshly fried potato samosas with green mint chutney & hot spiced tea',
      price: 20,
      emoji: '🥟',
      prepTime: 'Ready'
    },
    {
      id: 'food-06',
      category: 'breakfast',
      name: 'Crispy South Indian Masala Dosa',
      desc: 'Golden crisp dosa filled with spiced potato masala, hot sambar & coconut chutney',
      price: 35,
      emoji: '🥞',
      prepTime: '3 Mins'
    },
    {
      id: 'food-07',
      category: 'breakfast',
      name: 'Steamed Idli Sambar (2 Pcs)',
      desc: 'Soft fluffy steamed idlis with piping hot lentil sambar',
      price: 25,
      emoji: '🥣',
      prepTime: 'Ready'
    },
    {
      id: 'food-08',
      category: 'breakfast',
      name: 'Fresh Puri Sabji (3 Pcs)',
      desc: 'Puffed puris served with spicy Odia Aloo Dum sabji',
      price: 30,
      emoji: '🫓',
      prepTime: '3 Mins'
    },
    {
      id: 'food-09',
      category: 'breakfast',
      name: 'Grilled Paneer & Veg Sandwich',
      desc: 'Toasted multi-grain bread with spiced paneer, capsicum & cheese slice',
      price: 35,
      emoji: '🥪',
      prepTime: '4 Mins'
    },
    {
      id: 'food-10',
      category: 'beverages',
      name: 'Special RIMS Masala Chai',
      desc: 'Freshly brewed aromatic tea with ginger & cardamom',
      price: 10,
      emoji: '☕',
      prepTime: 'Ready'
    },
    {
      id: 'food-11',
      category: 'beverages',
      name: 'South Indian Filter Coffee',
      desc: 'Rich frothy freshly ground roasted filter coffee',
      price: 15,
      emoji: '☕',
      prepTime: '1 Min'
    },
    {
      id: 'food-12',
      category: 'beverages',
      name: 'Chilled Sweet Punjabi Lassi',
      desc: 'Creamy sweet yogurt drink topped with malai',
      price: 25,
      emoji: '🥤',
      prepTime: 'Ready'
    },
    {
      id: 'food-13',
      category: 'beverages',
      name: 'Cold Coffee with Ice Cream',
      desc: 'Blended chilled chocolate coffee topped with vanilla scoop',
      price: 35,
      emoji: '🧋',
      prepTime: '2 Mins'
    },
    {
      id: 'food-14',
      category: 'beverages',
      name: 'Fresh Gulab Jamun (2 Pcs)',
      desc: 'Warm soft cottage cheese dumplings soaked in saffron sugar syrup',
      price: 20,
      emoji: '🍮',
      prepTime: 'Ready'
    }
  ],

  // 3. Leave Applications History
  leaveApplications: [
    {
      leave_id: 'RIMS-LV-882',
      student_name: 'Soumya Patnaik',
      roll_number: '23MCA014',
      leave_type: 'Academic / Placement Interview Leave',
      start_date: '2026-03-26',
      end_date: '2026-03-27',
      total_days: 2,
      reason: 'Attending TCS Technical Interview & Assessment round at National Placement Center (India)',
      mentor_name: 'Prof. Dr. S. K. Mohanty',
      status: 'Approved',
      condonation: 'Attendance credited (100% Condoned)',
      created_at: '2026-03-20'
    },
    {
      leave_id: 'CEZ-LV-840',
      student_name: 'Soumya Patnaik',
      roll_number: '23MCA014',
      leave_type: 'Medical Leave (Viral Fever)',
      start_date: '2026-02-12',
      end_date: '2026-02-14',
      total_days: 3,
      reason: 'Doctor prescribed medical rest. Prescription submitted to CampusEZ Academic office',
      mentor_name: 'Prof. Dr. S. K. Mohanty',
      status: 'Approved',
      condonation: 'Medical attendance condonation granted by HOD',
      created_at: '2026-02-11'
    }
  ],

  // 4. Sample PYQ Questions Store
  pyqQuestions: {
    'MCA-301 Advanced Java 2025': [
      { q: "Q1. (a) Explain Spring Boot auto-configuration mechanism with `@EnableAutoConfiguration`.", m: "2 Marks" },
      { q: "Q1. (b) Differentiate between `SessionFactory` and `EntityManagerFactory` in Hibernate JPA.", m: "2 Marks" },
      { q: "Q2. Design a RESTful API using Spring Boot with `@RestController`, `@GetMapping`, and `@PostMapping` for Student Admission System.", m: "6 Marks" },
      { q: "Q3. Explain Hibernate second-level caching with Redis/Ehcache architecture and write configuration snippet.", m: "10 Marks" }
    ],
    'MCA-302 Cloud Computing 2025': [
      { q: "Q1. (a) State the differences between Type-1 and Type-2 Hypervisors with diagrams.", m: "2 Marks" },
      { q: "Q1. (b) What is SLA (Service Level Agreement) penalty management in AWS cloud?", m: "2 Marks" },
      { q: "Q2. Explain container orchestration in Kubernetes with Pods, Deployments, and Ingress Controller.", m: "6 Marks" },
      { q: "Q3. Describe AWS Cloud Architecture for a high-availability multi-region web application with Auto-Scaling and ELB.", m: "10 Marks" }
    ],
    'MCA-303 Algorithms 2025': [
      { q: "Q1. (a) Solve the recurrence relation T(n) = 2T(n/2) + O(n) using Master's Theorem.", m: "2 Marks" },
      { q: "Q1. (b) Define Dynamic Programming optimal substructure property with 0/1 Knapsack.", m: "2 Marks" },
      { q: "Q2. Write Dijkstra's single-source shortest path algorithm and trace it on a 6-vertex directed graph.", m: "6 Marks" },
      { q: "Q3. Prove that Fractional Knapsack solves with greedy choice whereas 0/1 Knapsack requires Dynamic Programming.", m: "10 Marks" }
    ],
    'default': [
      { q: "Q1. Define time complexity and space complexity of merge sort and quick sort algorithms.", m: "2 Marks" },
      { q: "Q2. Explain the 5 layers of university examination assessment framework.", m: "6 Marks" },
      { q: "Q3. Write an enterprise case study architecture with database indexing and microservices.", m: "10 Marks" }
    ]
  },

  // 5. Library Desks
  librarySeats: [
    { id: 'D-01', status: 'taken' }, { id: 'D-02', status: 'free' }, { id: 'D-03', status: 'free' }, { id: 'D-04', status: 'taken' },
    { id: 'D-05', status: 'free' }, { id: 'D-06', status: 'free' }, { id: 'D-07', status: 'taken' }, { id: 'D-08', status: 'my' },
    { id: 'D-09', status: 'free' }, { id: 'D-10', status: 'taken' }, { id: 'D-11', status: 'free' }, { id: 'D-12', status: 'free' },
    { id: 'D-13', status: 'taken' }, { id: 'D-14', status: 'free' }, { id: 'D-15', status: 'free' }, { id: 'D-16', status: 'free' },
    { id: 'D-17', status: 'free' }, { id: 'D-18', status: 'taken' }, { id: 'D-19', status: 'free' }, { id: 'D-20', status: 'free' },
    { id: 'D-21', status: 'free' }, { id: 'D-22', status: 'taken' }, { id: 'D-23', status: 'free' }, { id: 'D-24', status: 'free' }
  ],

  // 6. Admin Grievance Tickets
  grievanceTickets: [
    { id: 'CEZ-TKT-104', location: 'Academic Block-A, Room 204', category: 'Classroom Projector / AV Issue', urgency: 'High', status: 'Technician Assigned', time: '15m ago' },
    { id: 'CEZ-TKT-103', location: 'Boys Hostel Block-B, 2nd Floor', category: 'Hostel Water Supply / Plumbing', urgency: 'High', status: 'Plumber on Site', time: '45m ago' },
    { id: 'CEZ-TKT-102', location: 'Central Library', category: 'Campus Wi-Fi / Internet Problem', urgency: 'Normal', status: 'Under Review', time: '2h ago' },
    { id: 'CEZ-TKT-099', location: 'Computer Lab 02, 1st Floor', category: 'Electricity / Fan / Light', urgency: 'Normal', status: 'Resolved', time: 'Yesterday' }
  ],

  // 6.1 Student Complaints to Faculty / Admins (With >10 Warning Escalation Protocol)
  warningThreshold: 10,
  complaintTargetType: 'faculty',
  complaintsList: [
    { id: 'CEZ-CMP-101', roll: '23MCA014', studentName: 'Soumya Patnaik', targetType: 'faculty', targetName: 'Prof. Dr. S. K. Mohanty', category: 'Teaching & Syllabus', subject: 'Incomplete Unit 4 Java Enterprise Frameworks before Mid-Sem', desc: 'Unit 4 Spring Boot Microservices syllabus not covered prior to 6th April exams.', urgency: 'High', status: 'Escalated to Principal', isAnon: false, facultyReply: 'Extra lecture scheduled this Saturday 10:00 AM in Room 204.', time: '2h ago' },
    { id: 'CEZ-CMP-102', roll: '23MCA002', studentName: 'Ananya Tripathy', targetType: 'faculty', targetName: 'Prof. Dr. S. K. Mohanty', category: 'Lab Equipment & Practical', subject: 'Lab 01 Server connection latency during Cloud practicals', desc: 'Docker containers timing out during Friday afternoon lab sessions.', urgency: 'High', status: 'Escalated to Principal', isAnon: false, facultyReply: 'Lab system RAM upgraded with IT Network Admin.', time: '4h ago' },
    { id: 'CEZ-CMP-103', roll: '23MCA018', studentName: 'Rakesh Mohanty', targetType: 'faculty', targetName: 'Prof. Dr. S. K. Mohanty', category: 'Attendance & Grading', subject: 'Internal assessment marks clarification in MCA-301', desc: 'Clarification needed on rubric for assignment 2 marks distribution.', urgency: 'Normal', status: 'Under Review', isAnon: false, facultyReply: null, time: '1d ago' },
    { id: 'CEZ-CMP-104', roll: '23MCA022', studentName: 'Priya Sahoo', targetType: 'faculty', targetName: 'Prof. Dr. S. K. Mohanty', category: 'Teaching & Syllabus', subject: 'Fast lecture pace during Distributed Systems module', desc: 'Students requested extra doubt clearing session before university exams.', urgency: 'High', status: 'Escalated to Principal', isAnon: true, facultyReply: null, time: '1d ago' },
    { id: 'CEZ-CMP-105', roll: '23MCA007', studentName: 'Bikash Rout', targetType: 'faculty', targetName: 'Prof. Dr. S. K. Mohanty', category: 'Mentorship & Guidance', subject: 'Major project mentorship slot scheduling conflict', desc: 'Need dedicated review slot for Smart India Hackathon project.', urgency: 'Normal', status: 'Under Review', isAnon: false, facultyReply: null, time: '2d ago' },
    { id: 'CEZ-CMP-106', roll: '23MCA031', studentName: 'Sneha Das', targetType: 'faculty', targetName: 'Prof. Dr. S. K. Mohanty', category: 'Teaching & Syllabus', subject: 'Request for question bank / PYQ solutions discussion', desc: 'Discussion of past year question solutions in class.', urgency: 'Normal', status: 'Under Review', isAnon: true, facultyReply: null, time: '2d ago' },
    { id: 'CEZ-CMP-107', roll: '23MCA012', studentName: 'Manoj Nayak', targetType: 'faculty', targetName: 'Prof. Dr. S. K. Mohanty', category: 'Lab Equipment & Practical', subject: 'Access to Enterprise IDE licenses in Lab 01', desc: 'IntelliJ / VS Code extension permissions needed for all systems.', urgency: 'High', status: 'Escalated to Principal', isAnon: false, facultyReply: null, time: '3d ago' },
    { id: 'CEZ-CMP-108', roll: '23MCA045', studentName: 'Smruti Rekha', targetType: 'faculty', targetName: 'Prof. Dr. S. K. Mohanty', category: 'Attendance & Grading', subject: 'Attendance log correction for 18-March lecture', desc: 'RFID scanner sync error on 18th March marked 4 students absent.', urgency: 'High', status: 'Escalated to Principal', isAnon: false, facultyReply: null, time: '3d ago' },
    { id: 'CEZ-CMP-109', roll: '23MCA009', studentName: 'Deepak Swain', targetType: 'faculty', targetName: 'Prof. Dr. S. K. Mohanty', category: 'Teaching & Syllabus', subject: 'Additional study notes for Microservices architecture', desc: 'Requesting digital lecture slides on CampusEZ Sahay portal.', urgency: 'Normal', status: 'Under Review', isAnon: true, facultyReply: null, time: '4d ago' },
    { id: 'CEZ-CMP-110', roll: '23MCA029', studentName: 'Tanmay Senapati', targetType: 'faculty', targetName: 'Prof. Dr. S. K. Mohanty', category: 'Lab Equipment & Practical', subject: 'Lab session duration extension for project deployment', desc: 'Need 30 mins extra lab access after 5:30 PM for AWS deployments.', urgency: 'Normal', status: 'Under Review', isAnon: false, facultyReply: null, time: '4d ago' },
    { id: 'CEZ-CMP-111', roll: '23MCA036', studentName: 'Alok Pradhan', targetType: 'faculty', targetName: 'Prof. Dr. S. K. Mohanty', category: 'Teaching & Syllabus', subject: 'Mid-Sem question pattern clarification', desc: 'Need clarity on Section C 10-mark design architecture questions.', urgency: 'Critical', status: 'Warning Issued', isAnon: false, facultyReply: null, time: '5d ago' },
    { id: 'CEZ-CMP-112', roll: '23MCA014', studentName: 'Soumya Patnaik', targetType: 'admin', targetName: 'Campus Wi-Fi / IT Desk', category: 'Campus Infrastructure', subject: 'Wi-Fi mesh deadzone in 2nd Floor Library Reading Room', desc: 'Signal drops frequently when accessing IEEE Xplore digital papers.', urgency: 'High', status: 'Under Review', isAnon: false, facultyReply: 'Network team installing repeater today.', time: '2h ago' }
  ],

  // 7. Dual AI Knowledge Base (Students & Admins)
  sahayDatabase: {
    exam: "The **3rd Semester Examinations** for MCA, MBA, BCA & BBA begin on **06-April-2026 (Monday)**. Your verified admit card is ready under the **'Exam Hub, Marks & PYQs'** section with registration number **2305202014**.",
    admit: "To download your official Hall Ticket, click the **'Exam Hub, Marks & PYQs'** section in the left menu, switch to the *'Official Admit Card'* tab, and click **'Download PDF Admit Card'** or **'Print Hall Ticket'**.",
    leave: "You can apply for Medical, Academic/Interview, or Personal leave in the **'Leave Application Portal'**. Once approved by your mentor & HOD, attendance condonation is automatically credited to protect your 75% requirement.",
    placement: "Top companies visiting CampusEZ this semester include **TCS, Infosys, Nalco, Wipro, and National Technology Labs**. Pre-placement registrations are ongoing in Room 102.",
    attendance: "As per academic regulations, a minimum of **75% aggregate attendance** is mandatory to appear in semester theory and lab exams. You currently have **86.4% Safe attendance**.",
    admin_notice: "Administrators can dispatch emergency notices to all students or specific hostel blocks via the **'SMS / WhatsApp Broadcast'** section with 1-click delivery.",
    admin_rooms: "Admins can mark any class as suspended or reassign lecture rooms under **'Suspend / Reschedule Class'**. Student timetables update immediately.",
    bus: "Campus Shuttle #01 runs on **Central Station &rarr; Civic Hub &rarr; Tech Park &rarr; CampusEZ Main Gate**. Bus #02 covers **City Centre & Green Park**. Live GPS tracking and real-time Google Maps are active on the right side.",
    library: "Central Campus Library is open from **8:30 AM to 8:00 PM**. You can reserve quiet study desks and renew issued books with 1-click in the Central Library section."
  },

  charts: {},

  // Initialization
  init() {
    this.renderTimetable('monday');
    this.renderCanteenMenu('all');
    this.fetchLeaves();
    this.renderLibrarySeats();
    this.renderProfile();
    this.renderStudentComplaints();
    this.renderFacultyComplaints();
    this.renderFacultyWarningBanner();

    this.bindEvents();

    // Always start on clean public landing page by default
    this.showLandingPage();
  },

  // 0. Landing Page & Portal View Switcher
  showLandingPage() {
    this.isLoggedIn = false;
    document.body.classList.add('landing-active');
    document.body.classList.remove('portal-active');

    const landing = document.getElementById('campusez-landing-page');
    const portal = document.querySelector('.campus-layout');
    const announcement = document.querySelector('.top-announcement-bar');
    const bottomNav = document.getElementById('mobile-bottom-nav');
    
    if (landing) landing.style.display = 'block';
    if (portal) portal.style.display = 'none';
    if (announcement) announcement.style.display = 'none';
    if (bottomNav) bottomNav.style.display = 'none';

    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.closeSidebar();
  },

  // Gatekeeper: Request access to a role or section through the Sign In process
  requestSectionAccess(role = 'student', targetSection = null) {
    if (this.isLoggedIn) {
      this.openPortal(role);
      if (targetSection) {
        this.showSection(targetSection);
      }
    } else {
      this.pendingTargetSection = targetSection;
      this.openLoginModal(role);
    }
  },

  openPortal(role = 'student') {
    this.isLoggedIn = true;
    document.body.classList.remove('landing-active');
    document.body.classList.add('portal-active');

    const landing = document.getElementById('campusez-landing-page');
    const portal = document.querySelector('.campus-layout');
    const announcement = document.querySelector('.top-announcement-bar');
    const bottomNav = document.getElementById('mobile-bottom-nav');

    if (landing) landing.style.display = 'none';
    if (portal) portal.style.display = 'flex';
    if (announcement) announcement.style.display = 'flex';
    if (bottomNav && window.innerWidth <= 768) bottomNav.style.display = 'flex';

    this.setRole(role);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  logout() {
    this.isLoggedIn = false;
    this.pendingTargetSection = null;
    fetch('api/auth.php?action=logout', { method: 'POST' })
      .then(() => {
        window.location.reload();
      })
      .catch(() => {
        window.location.reload();
      });
  },

  applyProgramTheme(program) {
    if (program !== 'MBA' && program !== 'MCA') return;
    
    // We only need to do this if program is MBA, since default is MCA
    if (program === 'MBA') {
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
      let node;
      while ((node = walker.nextNode())) {
        let val = node.nodeValue;
        
        if (val.includes('MCA')) val = val.replace(/MCA/g, 'MBA');
        if (val.includes('Master of Computer Applications')) val = val.replace(/Master of Computer Applications/g, 'Master of Business Administration');
        if (val.includes('Computer Applications')) val = val.replace(/Computer Applications/g, 'Business Administration');
        
        // Subject Replacements
        if (val.includes('Advanced Java & Enterprise Frameworks')) val = val.replace(/Advanced Java & Enterprise Frameworks/g, 'Strategic Marketing Management');
        if (val.includes('Advanced Java Enterprise Frameworks & Microservices')) val = val.replace(/Advanced Java Enterprise Frameworks & Microservices/g, 'Strategic Marketing Management');
        if (val.includes('Advanced Java (Spring Boot & Hibernate)')) val = val.replace(/Advanced Java \(Spring Boot & Hibernate\)/g, 'Strategic Marketing Management');
        if (val.includes('Advanced Java')) val = val.replace(/Advanced Java/g, 'Marketing Mgt');
        
        if (val.includes('Cloud Computing & Virtualization Lab')) val = val.replace(/Cloud Computing & Virtualization Lab/g, 'Financial Analytics & Modeling Lab');
        if (val.includes('Cloud Computing & Virtualization')) val = val.replace(/Cloud Computing & Virtualization/g, 'Financial Analytics & Modeling');
        if (val.includes('Cloud Computing')) val = val.replace(/Cloud Computing/g, 'Financial Analytics');
        
        if (val.includes('Design & Analysis of Algorithms')) val = val.replace(/Design & Analysis of Algorithms/g, 'Organizational Behavior & Ethics');
        if (val.includes('Algorithms')) val = val.replace(/Algorithms/g, 'Org. Behavior');
        
        if (val.includes('Software Engineering & Agile Testing')) val = val.replace(/Software Engineering & Agile Testing/g, 'Human Resource Management');
        if (val.includes('Software Eng')) val = val.replace(/Software Eng/g, 'HR Management');
        
        if (val.includes('Python & Machine Learning')) val = val.replace(/Python & Machine Learning/g, 'Business Economics & Statistics');
        if (val.includes('Python AI & ML Practical Lab 02')) val = val.replace(/Python AI & ML Practical Lab 02/g, 'Business Economics & Statistics Lab');
        if (val.includes('Python AI & ML')) val = val.replace(/Python AI & ML/g, 'Business Economics');
        
        if (val.includes('Major Hackathon Project Mentorship')) val = val.replace(/Major Hackathon Project Mentorship/g, 'Corporate Strategy Capstone Mentorship');

        node.nodeValue = val;
      }
      
      // 2. Update dynamic JS state objects (like Timetable)
      let scheduleStr = JSON.stringify(this.timetableSchedule);
      
      scheduleStr = scheduleStr.replace(/MCA/g, 'MBA');
      scheduleStr = scheduleStr.replace(/Master of Computer Applications/g, 'Master of Business Administration');
      scheduleStr = scheduleStr.replace(/Computer Applications/g, 'Business Administration');
      
      scheduleStr = scheduleStr.replace(/Advanced Java & Enterprise Frameworks/g, 'Strategic Marketing Management');
      scheduleStr = scheduleStr.replace(/Advanced Java Enterprise Frameworks & Microservices/g, 'Strategic Marketing Management');
      scheduleStr = scheduleStr.replace(/Advanced Java \(Spring Boot & Hibernate\)/g, 'Strategic Marketing Management');
      scheduleStr = scheduleStr.replace(/Advanced Java/g, 'Marketing Mgt');
      
      scheduleStr = scheduleStr.replace(/Cloud Computing & Virtualization Lab/g, 'Financial Analytics & Modeling Lab');
      scheduleStr = scheduleStr.replace(/Cloud Computing & Virtualization/g, 'Financial Analytics & Modeling');
      scheduleStr = scheduleStr.replace(/Cloud Computing/g, 'Financial Analytics');
      
      scheduleStr = scheduleStr.replace(/Design & Analysis of Algorithms/g, 'Organizational Behavior & Ethics');
      scheduleStr = scheduleStr.replace(/Algorithms/g, 'Org. Behavior');
      
      scheduleStr = scheduleStr.replace(/Software Engineering & Agile Testing/g, 'Human Resource Management');
      scheduleStr = scheduleStr.replace(/Software Eng/g, 'HR Management');
      
      scheduleStr = scheduleStr.replace(/Python & Machine Learning/g, 'Business Economics & Statistics');
      scheduleStr = scheduleStr.replace(/Python AI & ML Practical Lab 02/g, 'Business Economics & Statistics Lab');
      scheduleStr = scheduleStr.replace(/Python AI & ML/g, 'Business Economics');
      
      scheduleStr = scheduleStr.replace(/Major Hackathon Project Mentorship/g, 'Corporate Strategy Capstone Mentorship');
      
      this.timetableSchedule = JSON.parse(scheduleStr);
      this.renderTimetable(this.currentTimetableDay || 'monday');
    }
  },

  // 1. Clean Multi-Section Switcher (Only One Section Shown at a Time)
  showSection(sectionId) {
    this.currentSection = sectionId;

    // Hide all sections, display target
    document.querySelectorAll('.portal-section').forEach(sec => {
      sec.classList.remove('active');
    });

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.classList.add('active');
    }

    // Refresh section-specific dynamic data
    if (sectionId === 'section-canteen') {
      this.renderCanteenMenu(this.activeCanteenCategory || 'all');
    } else if (sectionId === 'section-leave') {
      this.fetchLeaves();
    } else if (sectionId === 'section-library') {
      this.renderLibrarySeats();
    } else if (sectionId === 'section-timetable') {
      this.renderTimetable(this.currentTimetableDay || 'monday');
    } else if (sectionId === 'section-profile') {
      this.renderProfile();
    } else if (sectionId === 'section-complaints') {
      this.renderStudentComplaints();
    } else if (sectionId === 'section-faculty-complaints' || sectionId === 'section-faculty-dashboard') {
      this.renderFacultyComplaints();
      this.renderFacultyWarningBanner();
    }

    // Update Top Navigation Section Title Tag
    const sectionTitleMap = {
      'section-student-dashboard': 'Student Dashboard Overview',
      'section-profile': 'Official Institutional Profile & Digital Smart ID Card',
      'section-timetable': 'Class Timetable (1-Hr Slots & 6 Days)',
      'section-exams-admit': 'Exam Hub, Marks, Pattern & PYQs',
      'section-canteen': 'CampusEZ Canteen & Food Court Details',
      'section-leave': 'Online Leave Application Portal',
      'section-attendance': 'Attendance Tracker (75% Rule)',
      'section-library': 'Central Knowledge & Digital Library',
      'section-bus': 'Campus Bus Live GPS & Real Google Map',
      'section-complaints': 'Student Grievance & Redressal Desk',
      'section-fees': 'Semester Fees & No-Dues Desk',
      'section-hostel': 'Hostel Maintenance & Administration',
      'section-faculty-dashboard': 'Faculty Overview & Class Control',
      'section-faculty-attendance': '1-Click RFID Class Attendance',
      'section-faculty-complaints': 'Student Feedback & Grievance Monitor'
    };

    const titleEl = document.getElementById('current-section-title');
    if (titleEl) {
      titleEl.textContent = sectionTitleMap[sectionId] || 'RIMS Campus Portal';
    }

    // Update active nav-item in sidebar
    document.querySelectorAll('.sidebar-nav .nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.section === sectionId);
    });

    // Update active bottom navigation item
    document.querySelectorAll('.bottom-nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.bottomSection === sectionId);
    });

    // Close mobile sidebar if open and hide backdrop
    this.closeSidebar();

    // Scroll to top of main body
    const scrollContainer = document.querySelector('.main-body-scroll');
    if (scrollContainer) scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
  },

  // Mobile Drawer Navigation Controllers
  closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (sidebar) sidebar.classList.remove('open-mobile');
    if (backdrop) backdrop.classList.remove('active');
  },

  toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (sidebar) {
      const isOpen = sidebar.classList.toggle('open-mobile');
      if (backdrop) backdrop.classList.toggle('active', isOpen);
    }
  },

  // 1.1 Profile Management & Live Rendering
  renderProfile() {
    const prof = this.profileData[this.currentRole] || this.profileData.student;

    // Header / Hero Elements
    const heroAvatar = document.getElementById('prof-hero-avatar');
    if (heroAvatar) heroAvatar.innerHTML = `<span>${prof.initials}</span>`;

    const heroName = document.getElementById('prof-hero-name');
    if (heroName) heroName.textContent = prof.name;

    const heroSub = document.getElementById('prof-hero-subtitle');
    if (heroSub) heroSub.textContent = `${prof.degree} • ${prof.semester}`;

    const heroRoll = document.getElementById('prof-hero-roll');
    if (heroRoll) heroRoll.textContent = prof.rollNo;

    const heroReg = document.getElementById('prof-hero-reg');
    if (heroReg) heroReg.textContent = prof.regNo;

    const heroRfid = document.getElementById('prof-hero-rfid');
    if (heroRfid) heroRfid.textContent = prof.rfid;

    const heroBlood = document.getElementById('prof-hero-blood');
    if (heroBlood) heroBlood.textContent = prof.blood;

    const statusBadge = document.getElementById('prof-status-badge');
    if (statusBadge) {
      statusBadge.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${prof.status}`;
    }

    // Stats Grid
    const statCgpa = document.getElementById('prof-stat-cgpa');
    if (statCgpa) statCgpa.textContent = prof.cgpa;

    const statAtt = document.getElementById('prof-stat-attendance');
    if (statAtt) statAtt.textContent = prof.attendance;

    const statBal = document.getElementById('prof-stat-balance');
    if (statBal) statBal.textContent = prof.balance;

    const walletBalPill = document.getElementById('prof-wallet-bal');
    if (walletBalPill) walletBalPill.textContent = prof.balance;

    // Tab 1: Academic
    const acadDegree = document.getElementById('prof-acad-degree');
    if (acadDegree) acadDegree.textContent = prof.degree;

    const acadDept = document.getElementById('prof-acad-dept');
    if (acadDept) acadDept.textContent = prof.department;

    const acadBatch = document.getElementById('prof-acad-batch');
    if (acadBatch) acadBatch.textContent = prof.batch;

    const acadSem = document.getElementById('prof-acad-sem');
    if (acadSem) acadSem.innerHTML = `<span class="badge-tag ${this.currentRole === 'faculty' ? 'badge-green' : 'badge-blue'}">${prof.semester}</span>`;

    const acadMentor = document.getElementById('prof-acad-mentor');
    if (acadMentor) acadMentor.textContent = prof.mentor;

    // Tab 2: Personal & Contact
    const pName = document.getElementById('prof-personal-name');
    if (pName) pName.textContent = prof.name;

    const pDob = document.getElementById('prof-personal-dob');
    if (pDob) pDob.textContent = prof.dob;

    const pGender = document.getElementById('prof-personal-gender');
    if (pGender) pGender.textContent = prof.gender;

    const pBlood = document.getElementById('prof-personal-blood');
    if (pBlood) pBlood.textContent = prof.blood;

    const pBio = document.getElementById('prof-personal-bio');
    if (pBio) pBio.textContent = `"${prof.bio}"`;

    const cEmail = document.getElementById('prof-contact-cemail');
    if (cEmail) cEmail.textContent = prof.cemail;

    const pEmail = document.getElementById('prof-contact-pemail');
    if (pEmail) pEmail.textContent = prof.pemail;

    const pPhone = document.getElementById('prof-contact-phone');
    if (pPhone) pPhone.textContent = prof.phone;

    const pAltPhone = document.getElementById('prof-contact-altphone');
    if (pAltPhone) pAltPhone.textContent = prof.altPhone;

    const pEmerg = document.getElementById('prof-contact-emergency');
    if (pEmerg) pEmerg.innerHTML = `<i class="fa-solid fa-phone-volume"></i> ${prof.emergency}`;

    const pHostel = document.getElementById('prof-contact-hostel');
    if (pHostel) pHostel.textContent = prof.hostel;

    const pPerm = document.getElementById('prof-contact-permanent');
    if (pPerm) pPerm.textContent = prof.permanent;

    const pFather = document.getElementById('prof-parent-father');
    if (pFather) pFather.innerHTML = `<strong>${prof.father}</strong>`;

    const pMother = document.getElementById('prof-parent-mother');
    if (pMother) pMother.innerHTML = `<strong>${prof.mother}</strong>`;

    // Tab 3: Virtual Smart Card
    const cardEmuName = document.getElementById('card-emu-name');
    if (cardEmuName) cardEmuName.textContent = prof.name.toUpperCase();

    const cardEmuType = document.getElementById('card-emu-type-tag');
    if (cardEmuType) {
      cardEmuType.textContent = this.currentRole === 'faculty' ? 'FACULTY SMART ID • SECURE ACCESS' : 'SMART STUDENT ID • NFC ENABLED';
    }

    const cardEmuMeta = document.getElementById('card-emu-meta');
    if (cardEmuMeta) {
      cardEmuMeta.textContent = this.currentRole === 'faculty' ? `EMP: ${prof.rollNo} • ${prof.regNo}` : `ROLL: ${prof.rollNo} • REG: ${prof.regNo}`;
    }

    const cardEmuRfid = document.getElementById('card-emu-rfid');
    if (cardEmuRfid) cardEmuRfid.textContent = prof.rfid;

    // Faculty vs Student Adaptations for Subjects
    const subjectsHeading = document.getElementById('prof-subjects-heading');
    if (subjectsHeading) {
      subjectsHeading.textContent = this.currentRole === 'faculty' ? 'Assigned Teaching Subjects & Lab Modules' : 'Currently Enrolled Subject Modules (Semester 3)';
    }

    // Modal ID Card Elements
    const modalAvatar = document.getElementById('modal-id-avatar');
    if (modalAvatar) modalAvatar.textContent = prof.initials;

    const modalName = document.getElementById('modal-id-name');
    if (modalName) modalName.textContent = prof.name.toUpperCase();

    const modalCourse = document.getElementById('modal-id-course');
    if (modalCourse) modalCourse.textContent = prof.degree;

    const modalRoll = document.getElementById('modal-id-roll');
    if (modalRoll) modalRoll.textContent = prof.rollNo;

    const modalReg = document.getElementById('modal-id-reg');
    if (modalReg) modalReg.textContent = prof.regNo;

    const modalBlood = document.getElementById('modal-id-blood');
    if (modalBlood) modalBlood.textContent = prof.blood;

    const modalValid = document.getElementById('modal-id-valid');
    if (modalValid) modalValid.textContent = prof.validThru;

    const modalEmerg = document.getElementById('modal-id-emergency');
    if (modalEmerg) modalEmerg.textContent = prof.phone;

    const modalBarcode = document.getElementById('modal-id-barcode');
    if (modalBarcode) modalBarcode.textContent = prof.barcode;
  },

  switchProfileTab(tabId) {
    this.activeProfileTab = tabId;
    document.querySelectorAll('.prof-tab-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.tab === tabId);
    });
    document.querySelectorAll('.profile-tab-pane').forEach(p => {
      p.classList.toggle('active', p.id === tabId);
    });
  },

  openIdCardModal() {
    this.renderProfile();
    const modal = document.getElementById('rims-idcard-modal');
    if (modal) modal.classList.add('active');
  },

  openEditProfileModal() {
    const prof = this.profileData[this.currentRole] || this.profileData.student;
    const phoneIn = document.getElementById('edit-prof-phone');
    const emailIn = document.getElementById('edit-prof-pemail');
    const bloodIn = document.getElementById('edit-prof-blood');
    const addrIn = document.getElementById('edit-prof-address');
    const emergIn = document.getElementById('edit-prof-emergency');
    const bioIn = document.getElementById('edit-prof-bio');

    if (phoneIn) phoneIn.value = prof.phone;
    if (emailIn) emailIn.value = prof.pemail;
    if (bloodIn) bloodIn.value = prof.blood;
    if (addrIn) addrIn.value = prof.permanent;
    if (emergIn) emergIn.value = prof.emergency;
    if (bioIn) bioIn.value = prof.bio;

    const modal = document.getElementById('rims-edit-profile-modal');
    if (modal) modal.classList.add('active');
  },

  handleProfileUpdate(e) {
    e.preventDefault();
    const prof = this.profileData[this.currentRole] || this.profileData.student;

    const phoneIn = document.getElementById('edit-prof-phone');
    const emailIn = document.getElementById('edit-prof-pemail');
    const bloodIn = document.getElementById('edit-prof-blood');
    const addrIn = document.getElementById('edit-prof-address');
    const emergIn = document.getElementById('edit-prof-emergency');
    const bioIn = document.getElementById('edit-prof-bio');

    if (phoneIn) prof.phone = phoneIn.value.trim();
    if (emailIn) prof.pemail = emailIn.value.trim();
    if (bloodIn) prof.blood = bloodIn.value;
    if (addrIn) prof.permanent = addrIn.value.trim();
    if (emergIn) prof.emergency = emergIn.value.trim();
    if (bioIn) prof.bio = bioIn.value.trim();

    this.renderProfile();
    this.closeModals();
    this.showToast('Profile Updated', 'Your institutional profile & contact details have been successfully saved.', 'success');
  },

  simulateRfidTap() {
    const cardEl = document.getElementById('prof-smart-card-widget');
    if (cardEl) {
      cardEl.style.boxShadow = '0 0 35px rgba(59, 130, 246, 0.9), 0 0 20px rgba(16, 185, 129, 0.8)';
      cardEl.style.transform = 'scale(1.02)';
      cardEl.style.transition = 'all 0.3s ease';
      setTimeout(() => {
        cardEl.style.boxShadow = '';
        cardEl.style.transform = '';
      }, 1200);
    }

    const prof = this.profileData[this.currentRole] || this.profileData.student;
    this.showToast('RFID Turnstile Scan', `Access Granted: Block-A Smart Door Unlocked! Scanner Log: #${prof.rfid} [${prof.name}]`, 'success');
  },

  printIdCard() {
    this.showToast('Printing ID Card', 'Opening official RIMS PVC ID print layout...', 'info');
    setTimeout(() => {
      window.print();
    }, 400);
  },

  downloadStudentDossier() {
    const prof = this.profileData[this.currentRole] || this.profileData.student;
    this.showToast('Exporting Dossier', `Official verified profile dossier PDF generated for ${prof.name} (${prof.rollNo}).`, 'success');
  },

  handleChangePassword(e) {
    e.preventDefault();
    const curr = document.getElementById('prof-curr-pass');
    const nw = document.getElementById('prof-new-pass');
    const conf = document.getElementById('prof-confirm-pass');

    if (nw && conf && nw.value !== conf.value) {
      this.showToast('Password Mismatch', 'New password and confirmation do not match.', 'warning');
      return;
    }

    if (curr) curr.value = '';
    if (nw) nw.value = '';
    if (conf) conf.value = '';

    this.showToast('Security Updated', 'Single Sign-On password updated across RIMS campus servers.', 'success');
  },

  logoutAllOtherSessions() {
    this.showToast('Sessions Terminated', 'All remote device sessions logged out successfully. Only this active session remains.', 'info');
  },

  // 1.5 Authentication & Login Handling
  openLoginModal(defaultRole = 'student') {
    const modal = document.getElementById('rims-login-modal');
    if (!modal) return;
    this.fillDemoLogin(defaultRole);
    modal.classList.add('active');
  },

  // 1-Click Fast Instant Login Method (routes through the exact same authentication pipeline)
  async quickLogin(role = 'student') {
    let username = '23MCA014';
    let password = 'student@2026';
    if (role === 'faculty') {
      username = 'CEZ-FAC-042';
      password = 'faculty@2026';
    } else if (role === 'admin') {
      username = 'CEZ-ADM-001';
      password = 'admin@2026';
    }
    this.fillDemoLogin(role);
    await this.executeLogin(username, password, role);
  },

  fillDemoLogin(role) {
    const roleSelect = document.getElementById('login-role');
    const usernameInput = document.getElementById('login-username');
    const passwordInput = document.getElementById('login-password');
    const label = document.getElementById('login-username-label');

    if (roleSelect) roleSelect.value = role;

    // Update the visual tabs if they exist
    const tabs = document.querySelectorAll('.role-tab-btn');
    if (tabs.length > 0) {
      tabs.forEach(tab => {
        tab.style.background = 'transparent';
        tab.style.color = '#64748b';
      });
      const activeTab = document.getElementById('tab-btn-' + role);
      if (activeTab) {
        if (role === 'student') {
          activeTab.style.background = '#3b82f6';
          activeTab.style.color = 'white';
        } else if (role === 'faculty') {
          activeTab.style.background = '#10b981';
          activeTab.style.color = 'white';
        } else if (role === 'admin') {
          activeTab.style.background = '#8b5cf6';
          activeTab.style.color = 'white';
        }
      }
    }

    if (role === 'student') {
      if (usernameInput) usernameInput.value = '23MCA014';
      if (passwordInput) passwordInput.value = 'student@2026';
      if (label) label.innerHTML = '<i class="fa-solid fa-id-card"></i> Student Roll No / Reg No / Email:';
    } else if (role === 'faculty') {
      if (usernameInput) usernameInput.value = 'faculty@campusez.in';
      if (passwordInput) passwordInput.value = 'faculty@2026';
      if (label) label.innerHTML = '<i class="fa-solid fa-envelope"></i> Faculty Employee ID / Email:';
    } else if (role === 'admin') {
      if (usernameInput) usernameInput.value = 'CEZ-ADM-001';
      if (passwordInput) passwordInput.value = 'admin@2026';
      if (label) label.innerHTML = '<i class="fa-solid fa-shield-halved"></i> Administrator Officer ID / Email:';
    }
  },

  onLoginRoleChange(role) {
    this.fillDemoLogin(role);
  },

  togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    const eye = document.getElementById(`${inputId}-eye`);
    if (!input) return;

    if (input.type === 'password') {
      input.type = 'text';
      if (eye) { eye.classList.remove('fa-eye'); eye.classList.add('fa-eye-slash'); }
    } else {
      input.type = 'password';
      if (eye) { eye.classList.remove('fa-eye-slash'); eye.classList.add('fa-eye'); }
    }
  },

  async handleLoginSubmit(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    const roleSelect = document.getElementById('login-role');
    const role = roleSelect ? roleSelect.value : 'student';
    const usernameInput = document.getElementById('login-username');
    const username = usernameInput ? usernameInput.value.trim() : '';
    const passwordInput = document.getElementById('login-password');
    const password = passwordInput ? passwordInput.value.trim() : '';

    if (!username) {
      this.showToast('Sign In Failed', 'Please enter your Roll Number (e.g. 23MCA014) or College Email.', 'warning');
      return;
    }

    if (!password) {
      this.showToast('Sign In Failed', 'Please enter your password.', 'warning');
      return;
    }

    await this.executeLogin(username, password, role);
  },

  async executeLogin(username, password, role) {
    // this.showToast('Authenticating...', 'Verifying credentials with CampusEZ MySQL Single Sign-On Server...', 'info');

    try {
      const response = await fetch('api/auth.php?action=login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role })
      });
      const data = await response.json();
      
      if (data && data.status === 'success') {
        this.closeModals();
        const actualRole = data.role || role;

        if (actualRole === 'admin') {
          // this.showToast('Admin Authenticated', `Welcome back, ${data.user ? data.user.name : 'Administrator'}! Opening Executive Command Center...`, 'success');
          setTimeout(() => { window.location.href = 'admin.html'; }, 500);
          return true;
        }

        this.isLoggedIn = true;
        if (data.user) {
          this.currentUser = data.user;
          this.updateTopLoginBadge(data.user);
        }
        
        this.openPortal(actualRole);
        
        if (this.pendingTargetSection) {
          this.showSection(this.pendingTargetSection);
          this.pendingTargetSection = null;
        }
        
        if (data.user) {
          if (this.profileData[actualRole]) {
            this.profileData[actualRole].name = data.user.name || this.profileData[actualRole].name;
            this.profileData[actualRole].rollNo = data.user.roll_number || this.profileData[actualRole].rollNo;
            this.profileData[actualRole].regNo = data.user.reg_no || this.profileData[actualRole].regNo;
            this.profileData[actualRole].cemail = data.user.email || this.profileData[actualRole].cemail;
            this.profileData[actualRole].department = data.user.department || this.profileData[actualRole].department;
            
            if (actualRole === 'student') {
              const r = (data.user.roll_number || '').toUpperCase();
              this.applyProgramTheme(r.includes('MBA') ? 'MBA' : 'MCA');
            }
            
            this.renderProfile();
          }
        }
        
        this.showToast('Sign In Successful', `Welcome back, ${data.user ? data.user.name : 'User'}! Authenticated via CampusEZ SSO.`, 'success');
        return true;
      } else {
        const errMsg = (data && data.message) ? data.message : 'Invalid username or password. Please verify your credentials.';
        this.showToast('Authentication Failed', errMsg, 'warning');
        return false;
      }
    } catch (e) {
      console.warn('Network error, checking local fallback:', e);
      const u = username.toLowerCase();
      const isValidStudent = (u === '23mca014' || u === 'soumya.patnaik@campusez.in' || u === 'soumya' || u === 'student') && (password === 'student@2026' || password === '123456');
      const isValidMBA = (u === '23mba014' || u === 'mba') && (password === 'student@2026' || password === '123456');
      const isValidFaculty = (u === 'cez-fac-042' || u === 'faculty@campusez.in' || u === 'faculty' || u === 'mohanty') && (password === 'faculty@2026' || password === '123456');
      const isValidAdmin = (u === 'cez-adm-001' || u === 'admin@campusez.in' || u === 'admin' || u === 'panda') && (password === 'admin@2026' || password === '123456');
      const isValidHostel = (u === '23mca015' || u === 'hostel@campusez.in' || u === 'hostel') && (password === 'hostel@2026' || password === '123456');

      if (isValidStudent || isValidMBA || isValidFaculty || isValidAdmin || isValidHostel) {
        this.closeModals();
        const resolvedRole = isValidFaculty ? 'faculty' : (isValidAdmin ? 'admin' : 'student');
        
        if (isValidHostel) {
          this.currentUser = { is_hosteler: true, name: 'Rahul Sharma' };
        } else {
          this.currentUser = { is_hosteler: false };
        }

        if (resolvedRole === 'admin') {
          // this.showToast('Admin Authenticated', 'Redirecting to Executive Admin Portal...', 'success');
          setTimeout(() => { window.location.href = 'admin.html'; }, 500);
          return true;
        }
        this.isLoggedIn = true;
        this.openPortal(resolvedRole);
        
        if (resolvedRole === 'student') {
          this.applyProgramTheme(isValidMBA ? 'MBA' : 'MCA');
        }
        
        if (this.pendingTargetSection) {
          this.showSection(this.pendingTargetSection);
          this.pendingTargetSection = null;
        }
        const prof = this.profileData[resolvedRole] || this.profileData.student;
        this.showToast('Sign In Successful', `Welcome, ${prof.name}! Accessing portal.`, 'success');
        return true;
      } else {
        this.showToast('Authentication Failed', 'Invalid username or password. Please verify credentials.', 'warning');
        return false;
      }
    }
  },

  updateTopLoginBadge(user) {
    const topAvatar = document.getElementById('top-user-avatar');
    const topName = document.getElementById('top-user-name');
    const topRoleBadge = document.getElementById('top-user-role-badge');

    const sidebarAvatar = document.getElementById('sidebar-user-avatar');
    const sidebarName = document.getElementById('sidebar-user-name');
    const sidebarDetail = document.getElementById('sidebar-user-detail');

    if (topAvatar && user.avatar_initials) topAvatar.textContent = user.avatar_initials;
    if (topName && user.name) topName.textContent = user.name;
    if (topRoleBadge) {
      if (user.role === 'student') {
        topRoleBadge.innerHTML = `Student &bull; MCA (${user.username || '23MCA014'})`;
      } else if (user.role === 'faculty') {
        topRoleBadge.innerHTML = `Faculty &bull; Associate Prof (MCA)`;
      } else {
        topRoleBadge.innerHTML = `Admin &bull; Executive Office`;
      }
    }

    if (sidebarAvatar && user.avatar_initials) sidebarAvatar.innerHTML = `<span>${user.avatar_initials}</span>`;
    if (sidebarName && user.name) sidebarName.textContent = user.name;
    if (sidebarDetail) {
      if (user.role === 'student') {
        sidebarDetail.textContent = `MCA 2nd Year • Roll: ${user.username || '23MCA014'}`;
      } else if (user.role === 'faculty') {
        sidebarDetail.textContent = 'Associate Professor • MCA Dept';
      }
    }

    this.renderProfile();
  },

  openPortal(role) {
    document.body.classList.remove('landing-active');
    document.body.classList.add('portal-active');
    this.setRole(role);
  },

  showLandingPage() {
    this.isLoggedIn = false;
    document.body.classList.remove('portal-active');
    document.body.classList.add('landing-active');
    fetch('api/auth.php?action=logout').catch(e => console.warn(e));
  },

  // 2. Role Switcher
  setRole(role) {
    this.currentRole = role;

    document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
    const activeBtn = document.getElementById(`btn-role-${role}`);
    if (activeBtn) activeBtn.classList.add('active');

    const navStudent = document.getElementById('nav-student');
    const navFaculty = document.getElementById('nav-faculty');

    const topAvatar = document.getElementById('top-user-avatar');
    const topName = document.getElementById('top-user-name');
    const topRoleBadge = document.getElementById('top-user-role-badge');

    const sidebarAvatar = document.getElementById('sidebar-user-avatar');
    const sidebarName = document.getElementById('sidebar-user-name');
    const sidebarDetail = document.getElementById('sidebar-user-detail');

    if (role === 'student') {
      if (navStudent) navStudent.style.display = 'flex';
      if (navFaculty) navFaculty.style.display = 'none';

      if (topAvatar) topAvatar.textContent = this.currentUser ? this.currentUser.avatar_initials || 'ST' : 'SP';
      if (topName) topName.textContent = this.currentUser ? this.currentUser.name || 'Student' : 'Soumya Patnaik';
      if (topRoleBadge) topRoleBadge.innerHTML = this.currentUser ? `Student &bull; ${this.currentUser.roll_number || '23MCA014'}` : 'Student &bull; MCA 23MCA014';

      if (sidebarAvatar) sidebarAvatar.innerHTML = `<span>${this.currentUser ? this.currentUser.avatar_initials || 'ST' : 'SP'}</span>`;
      if (sidebarName) sidebarName.textContent = this.currentUser ? this.currentUser.name || 'Student' : 'Soumya Patnaik';
      if (sidebarDetail) sidebarDetail.textContent = this.currentUser ? `${this.currentUser.department || 'MCA'} • Roll: ${this.currentUser.roll_number || '23MCA014'}` : 'MCA 2nd Year • Roll: 23MCA014';

      const hostelNavBtn = document.querySelector('button[data-section="section-hostel"]');
      if (hostelNavBtn) {
        if (this.currentUser && this.currentUser.is_hosteler) {
          hostelNavBtn.style.display = 'flex';
        } else {
          hostelNavBtn.style.display = 'none';
        }
      }

      this.renderProfile();
      this.showSection('section-student-dashboard');
      // this.showToast('Student Mode', 'Switched to Student Portal for Soumya Patnaik (MCA 3rd Sem).', 'info');
    } else if (role === 'faculty') {
      if (navStudent) navStudent.style.display = 'none';
      if (navFaculty) navFaculty.style.display = 'flex';

      if (topAvatar) topAvatar.textContent = 'SM';
      if (topName) topName.textContent = 'Prof. Dr. S. K. Mohanty';
      if (topRoleBadge) topRoleBadge.innerHTML = 'Faculty &bull; Associate Prof (MCA)';

      if (sidebarAvatar) sidebarAvatar.innerHTML = '<span>SM</span>';
      if (sidebarName) sidebarName.textContent = 'Prof. Dr. S. K. Mohanty';
      if (sidebarDetail) sidebarDetail.textContent = 'Associate Professor • MCA Dept';

      this.renderProfile();
      this.showSection('section-faculty-dashboard');
      // this.showToast('Faculty Mode', 'Switched to Teacher Desk for Prof. Dr. S. K. Mohanty.', 'info');
    }
  },

  // 3. Render Timetable with exact 1-hour slots & Suspended classes for all 6 days
  renderTimetable(dayKey) {
    this.currentTimetableDay = dayKey;
    const container = document.getElementById('timetable-slots-container');
    const dayDisplay = document.getElementById('timetable-display-day');
    if (dayDisplay) {
      dayDisplay.textContent = dayKey.charAt(0).toUpperCase() + dayKey.slice(1);
    }

    if (!container) return;

    const slots = this.timetableSchedule[dayKey] || this.timetableSchedule['monday'];

    container.innerHTML = slots.map(slot => {
      if (slot.type === 'break') {
        return `
          <div class="slot-card break-slot">
            <div class="break-icon"><i class="fa-solid fa-mug-hot"></i></div>
            <div class="slot-time-col">
              <span class="slot-time-range">${slot.timeRange}</span>
              <span class="slot-duration">${slot.duration}</span>
            </div>
            <div class="break-info-col">
              <h4>${slot.title}</h4>
              <p>${slot.desc}</p>
            </div>
          </div>
        `;
      }

      const isSuspended = slot.status === 'suspended';

      return `
        <div class="slot-card ${isSuspended ? 'slot-suspended' : 'slot-active-now'}">
          <div class="slot-time-col">
            <span class="slot-time-range">${slot.timeRange}</span>
            <span class="slot-duration">${slot.duration}</span>
          </div>

          <div class="slot-info-col">
            <div class="slot-title-row">
              <h4 class="slot-subject-title">${slot.subject}</h4>
              <span class="status-badge ${isSuspended ? 'badge-danger' : 'badge-green'}">
                ${isSuspended ? '🚫 Class Suspended' : '✅ Scheduled'}
              </span>
            </div>

            <div class="slot-meta-row">
              <span><i class="fa-solid fa-user-tie"></i> ${slot.faculty}</span>
              <span><i class="fa-solid fa-door-open"></i> ${slot.room}</span>
            </div>

            ${isSuspended ? `<p class="slot-reason-text"><i class="fa-solid fa-circle-exclamation"></i> ${slot.statusText}</p>` : ''}
          </div>
        </div>
      `;
    }).join('');
  },

  switchTimetableDay(dayKey) {
    document.querySelectorAll('.day-switcher-bar .day-pill').forEach(p => {
      p.classList.remove('active');
      if (p.textContent.toLowerCase().includes(dayKey)) {
        p.classList.add('active');
      }
    });

    this.renderTimetable(dayKey);
    const dayName = dayKey.charAt(0).toUpperCase() + dayKey.slice(1);
    this.showToast('Schedule Loaded', `Displaying distinct timetable for ${dayName}.`, 'info');
  },

  // Suspend / Restore Class (Admin Feature)
  suspendClass(subjectCode) {
    const mondaySlots = this.timetableSchedule.monday;
    const target = mondaySlots.find(s => s.subject && s.subject.includes(subjectCode));
    if (target) {
      target.status = 'suspended';
      target.statusText = '🚫 Suspended by Admin Notice (Self Study in Central Library)';
      this.renderTimetable(this.currentTimetableDay);
      this.showToast('Class Suspended', `${subjectCode} marked suspended. Student timetables updated instantly.`, 'warning');
    }
  },

  restoreClass(subjectCode) {
    const mondaySlots = this.timetableSchedule.monday;
    const target = mondaySlots.find(s => s.subject && s.subject.includes(subjectCode));
    if (target) {
      target.status = 'scheduled';
      target.statusText = 'Scheduled';
      this.renderTimetable(this.currentTimetableDay);
      this.showToast('Class Restored', `${subjectCode} marked active and scheduled as usual.`, 'success');
    }
  },

  // 4. Exam Sub-Tabs Switcher (Marks, Admit Card, Question Pattern, PYQs)
  switchExamTab(tabKey) {
    const tabs = ['marks', 'admit', 'pattern', 'pyq'];
    tabs.forEach(t => {
      const btn = document.getElementById(`tab-btn-${t}`);
      const view = document.getElementById(`subview-${t}`);
      if (btn) btn.classList.toggle('active', t === tabKey);
      if (view) view.style.display = (t === tabKey) ? 'block' : 'none';
    });

    const tabNameMap = {
      marks: 'Semester Marks (SGPA 8.74)',
      admit: 'Official University Admit Card',
      pattern: 'Exam Question Pattern & Blueprint (70 Marks)',
      pyq: 'Previous Year Question Papers (PYQs)'
    };
    this.showToast('Exam Hub Tab', `Switched to: ${tabNameMap[tabKey]}`, 'info');
  },

  previewPyq(title) {
    const modal = document.getElementById('pyq-preview-modal');
    const titleEl = document.getElementById('pyq-modal-title');
    const bodyEl = document.getElementById('pyq-preview-body');

    if (!modal) return;

    if (titleEl) titleEl.textContent = `University Examination Question Paper: ${title}`;

    const questions = this.pyqQuestions[title] || this.pyqQuestions['default'];
    if (bodyEl) {
      bodyEl.innerHTML = `
        <div class="pyq-header-notice">
          <strong>NATIONAL UNIVERSITY OF TECHNOLOGY & SCIENCE, INDIA</strong>
          <span>Time: 3 Hours &bull; Total Marks: 70 &bull; Section A, B & C</span>
        </div>
        <div class="pyq-questions-stream">
          ${questions.map(item => `
            <div class="pyq-q-item">
              <p>${item.q}</p>
              <span class="pyq-marks-badge">[${item.m}]</span>
            </div>
          `).join('')}
        </div>
      `;
    }

    modal.classList.add('active');
  },

  downloadPyq(filename) {
    this.showToast('Downloading PYQ PDF', `Downloading official University Question Paper "${filename}" (2.1 MB)...`, 'success');
  },

  downloadAdmitPdf() {
    this.showToast('Downloading Admit Card', 'Generating official University Admit Card PDF for Soumya Patnaik (2305202014)...', 'success');
    setTimeout(() => {
      window.print();
    }, 800);
  },

  printAdmitCard() {
    window.print();
  },

  printGradeSheet() {
    this.showToast('Printing Grade Sheet', 'Preparing printable MCA 3rd Semester Grade Sheet...', 'info');
    setTimeout(() => {
      window.print();
    }, 600);
  },

  // 5. Canteen Details & Full Menu Rendering
  renderCanteenMenu(category) {
    this.activeCanteenCategory = category;
    const container = document.getElementById('canteen-menu-container');
    if (!container) return;

    let items = this.canteenMenu;
    if (category !== 'all') {
      items = this.canteenMenu.filter(item => item.category === category);
    }

    container.innerHTML = items.map(item => {
      const isEgg = item.name.toLowerCase().includes('egg');
      const counterNum = item.category === 'lunch' ? '1 (Main Meals)' : (item.category === 'breakfast' ? '2 (Snacks Desk)' : '3 (Beverages Desk)');

      return `
        <div class="menu-card-full" id="card-item-${item.id}">
          <div class="menu-card-header">
            <div class="menu-emoji-icon">${item.emoji}</div>
            <div style="display:flex; flex-direction:column; align-items:flex-end; gap:4px;">
              <span class="diet-tag-pill ${isEgg ? 'diet-egg' : 'diet-veg'}">
                ${isEgg ? '🟡 Contains Egg' : '🟢 100% Pure Veg'}
              </span>
              <span class="status-badge badge-green">${item.prepTime}</span>
            </div>
          </div>

          <h4 class="menu-item-name">${item.name}</h4>
          <p class="menu-item-desc">${item.desc}</p>

          <div class="menu-card-footer">
            <strong class="menu-price-tag">₹${item.price}.00</strong>
            <span class="counter-tag" style="margin: 0; padding: 0; border: none;"><i class="fa-solid fa-store text-blue"></i> Counter ${counterNum}</span>
          </div>
        </div>
      `;
    }).join('');
  },

  filterCanteenCategory(category) {
    document.querySelectorAll('.menu-category-tabs .cat-pill').forEach(p => p.classList.remove('active'));
    if (event && event.target) event.target.classList.add('active');
    this.renderCanteenMenu(category);
  },

  changeItemQty(itemId, delta) {
    const item = this.canteenMenu.find(i => i.id === itemId);
    if (!item) return;

    if (!this.canteenCart[itemId]) {
      if (delta > 0) {
        this.canteenCart[itemId] = {
          id: item.id,
          name: item.name,
          price: item.price,
          emoji: item.emoji,
          qty: delta
        };
        this.showToast('Item Added', `1x ${item.name} added to canteen order tray.`, 'info');
      }
    } else {
      this.canteenCart[itemId].qty += delta;
      if (this.canteenCart[itemId].qty <= 0) {
        delete this.canteenCart[itemId];
        this.showToast('Item Removed', `${item.name} removed from order tray.`, 'info');
      }
    }

    this.renderCanteenMenu(this.activeCanteenCategory);
  },

  renderCartTray() {
    const tray = document.getElementById('canteen-cart-tray');
    const countEl = document.getElementById('cart-tray-items-count');
    const previewEl = document.getElementById('cart-tray-items-preview');
    const totalEl = document.getElementById('cart-tray-total-price');

    if (!tray) return;

    const cartKeys = Object.keys(this.canteenCart);
    let totalItems = 0;
    let totalPrice = 0;
    const previewNames = [];

    cartKeys.forEach(k => {
      const entry = this.canteenCart[k];
      totalItems += entry.qty;
      totalPrice += (entry.qty * entry.price);
      previewNames.push(`${entry.qty}x ${entry.name}`);
    });

    if (totalItems > 0) {
      tray.style.display = 'flex';
      if (countEl) countEl.textContent = `${totalItems} Item${totalItems > 1 ? 's' : ''} Selected`;
      if (previewEl) previewEl.textContent = previewNames.join(' • ');
      if (totalEl) totalEl.textContent = `₹${totalPrice.toFixed(2)}`;
    } else {
      tray.style.display = 'none';
    }
  },

  clearCanteenCart() {
    this.canteenCart = {};
    this.renderCanteenMenu(this.activeCanteenCategory);
    this.showToast('Cart Cleared', 'All items removed from your canteen pre-order tray.', 'info');
  },

  openCanteenCheckout(singleItemName, singlePrice) {
    const timeSlot = document.getElementById('pickup-time-slot') ? document.getElementById('pickup-time-slot').value : '1:15 PM Lunch Break';
    const breakdownList = document.getElementById('checkout-items-breakdown-list');
    const grandTotalEl = document.getElementById('checkout-grand-total');
    const slotEl = document.getElementById('checkout-selected-slot');
    const modal = document.getElementById('canteen-checkout-modal');

    // If cart is empty, add default or single item
    if (Object.keys(this.canteenCart).length === 0) {
      const defaultItem = singleItemName 
        ? this.canteenMenu.find(i => i.name === singleItemName) 
        : this.canteenMenu[0];
      if (defaultItem) {
        this.canteenCart[defaultItem.id] = {
          id: defaultItem.id,
          name: defaultItem.name,
          price: defaultItem.price,
          emoji: defaultItem.emoji,
          qty: 1
        };
        this.renderCartTray();
      }
    }

    let grandTotal = 0;
    let html = '';

    Object.values(this.canteenCart).forEach(item => {
      const subtotal = item.qty * item.price;
      grandTotal += subtotal;
      html += `
        <div class="order-summary-row">
          <span>${item.qty}x ${item.name}</span>
          <strong class="text-emerald">₹${subtotal.toFixed(2)}</strong>
        </div>
      `;
    });

    if (breakdownList) breakdownList.innerHTML = html;
    if (grandTotalEl) grandTotalEl.textContent = `₹${grandTotal.toFixed(2)}`;
    if (slotEl) slotEl.textContent = timeSlot;

    this.selectPaymentMode('upi');
    if (modal) modal.classList.add('active');
  },

  selectPaymentMode(mode) {
    this.activePaymentMode = mode;
    ['upi', 'wallet', 'cash'].forEach(m => {
      const opt = document.getElementById(`opt-${m}`);
      if (opt) opt.classList.toggle('active', m === mode);
    });

    const qrBox = document.getElementById('upi-qr-box');
    if (qrBox) {
      if (mode === 'upi') {
        qrBox.style.display = 'flex';
      } else {
        qrBox.style.display = 'none';
      }
    }
  },

  async completeCanteenOrder() {
    const cartEntries = Object.values(this.canteenCart);
    if (cartEntries.length === 0) return;

    let grandTotal = 0;
    const itemsSummaryArr = [];

    cartEntries.forEach(item => {
      grandTotal += (item.qty * item.price);
      itemsSummaryArr.push(`${item.qty}x ${item.name}`);
    });

    const itemsSummary = itemsSummaryArr.join(' + ');
    const timeSlot = document.getElementById('pickup-time-slot') ? document.getElementById('pickup-time-slot').value : '1:15 PM Lunch Break';
    const payModeLabel = this.activePaymentMode === 'upi' ? 'UPI QR Code (Paid)' : (this.activePaymentMode === 'wallet' ? 'RIMS Campus Pay' : 'Cash on Counter');

    if (this.activePaymentMode === 'wallet') {
      if (this.userWalletBalance < grandTotal) {
        this.showToast('Insufficient Balance', `You need ₹${grandTotal} in your RIMS Pay wallet. Choose UPI QR mode instead.`, 'warning');
        return;
      }
      this.userWalletBalance -= grandTotal;
    }

    const tokenNum = Math.floor(40 + Math.random() * 55);

    // Call Backend API
    try {
      fetch('api/canteen.php?action=order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          item_name: itemsSummary,
          amount: grandTotal,
          pickup_slot: timeSlot,
          payment_mode: payModeLabel,
          customer_roll: '23MCA014',
          customer_name: 'Soumya Patnaik'
        })
      }).catch(err => console.log('API fallback:', err));
    } catch (e) {
      console.log('Local fallback');
    }

    const tokenBox = document.getElementById('canteen-live-token');
    if (tokenBox) {
      tokenBox.innerHTML = `
        <div class="token-circle"><i class="fa-solid fa-receipt"></i></div>
        <div class="token-info-text">
          <strong>Active Order Token #${tokenNum} &bull; <span class="text-emerald">Kitchen Preparing on Schedule</span></strong>
          <p>${itemsSummary} &bull; Pickup Slot: <strong>${timeSlot}</strong> &bull; Paid: ₹${grandTotal.toFixed(2)} (${payModeLabel}) &bull; Counter 1</p>
        </div>
        <button class="btn btn-emerald-sm" onclick="rimsApp.showTokenQR()">
          <i class="fa-solid fa-qrcode"></i> Show Pickup QR
        </button>
      `;
    }

    this.clearCanteenCart();
    this.closeModals();
    this.showToast('Pre-Order Placed!', `Token #${tokenNum} created for ${itemsSummary} (₹${grandTotal}). Will be hot & ready for ${timeSlot}!`, 'success');
  },

  showTokenQR() {
    this.showToast('Contactless Token QR', 'Displaying digital pickup QR code. Show at RIMS Canteen counter to grab your food!', 'info');
  },

  closeModals() {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
  },

  // 6. Online Leave Application Portal (Submit & History)
  fetchLeaves() {
    fetch('api/leave.php?action=list')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          this.leaveApplications = data.leaves || [];
          this.renderLeaveHistory();
        }
      })
      .catch(err => console.error('Failed to fetch leaves:', err));
  },

  renderLeaveHistory() {
    const container = document.getElementById('leave-history-container');
    if (!container) return;

    container.innerHTML = this.leaveApplications.map(l => {
      const isApproved = l.status === 'Approved';
      return `
        <div class="leave-item-card">
          <div class="leave-card-top">
            <div class="leave-type-title">
              <strong>${l.leave_type}</strong>
              <span class="leave-dates-tag"><i class="fa-solid fa-calendar-days"></i> ${l.start_date} to ${l.end_date} (${l.total_days} Day${l.total_days > 1 ? 's' : ''})</span>
            </div>
            <span class="status-badge ${isApproved ? 'badge-green' : 'badge-amber'}">
              <i class="fa-solid ${isApproved ? 'fa-check' : 'fa-hourglass-half'}"></i> ${l.status}
            </span>
          </div>

          <p class="leave-reason-text">"${l.reason}"</p>

          <div class="leave-card-footer">
            <span><i class="fa-solid fa-user-tie"></i> Reviewer: <strong>${l.mentor_name}</strong></span>
            <span class="text-emerald font-bold"><i class="fa-solid fa-shield-check"></i> ${l.condonation}</span>
          </div>
        </div>
      `;
    }).join('');
  },

  async handleLeaveApplication(event) {
    event.preventDefault();
    const type = document.getElementById('leave-type').value;
    const mentor = document.getElementById('leave-mentor').value;
    const start = document.getElementById('leave-start-date').value;
    const end = document.getElementById('leave-end-date').value;
    const reason = document.getElementById('leave-reason').value;

    if (!start || !end || !reason) {
      this.showToast('Incomplete Form', 'Please fill in all leave application details.', 'warning');
      return;
    }

    const startDateObj = new Date(start);
    const endDateObj = new Date(end);
    const diffTime = Math.abs(endDateObj - startDateObj);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    const newLeave = {
      leave_id: 'RIMS-LV-' + Math.floor(890 + Math.random() * 100),
      student_name: 'Soumya Patnaik',
      roll_number: '23MCA014',
      leave_type: type,
      start_date: start,
      end_date: end,
      total_days: diffDays,
      reason: reason,
      mentor_name: mentor,
      status: 'Pending Review',
      condonation: 'Awaiting HOD Digital Verification',
      created_at: new Date().toISOString().split('T')[0]
    };

    // Call Backend API
    try {
      await fetch('api/leave.php?action=apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLeave)
      });
    } catch (e) {
      console.log('Leave API error:', e);
    }

    this.fetchLeaves();
    event.target.reset();

    this.showToast('Leave Submitted!', `Application sent to ${mentor}. Status: Pending Review.`, 'success');
  },

  // 7. Transportation Switcher, Google Maps Route Switcher & Live GPS Buffering Refresh
  switchTransitTab(tabKey) {
    const btnAma = document.getElementById('btn-transit-amabus');
    const btnCollege = document.getElementById('btn-transit-college');
    const streamAma = document.getElementById('stream-amabus');
    const streamCollege = document.getElementById('stream-college');

    if (tabKey === 'amabus') {
      if (btnAma) btnAma.classList.add('active');
      if (btnCollege) btnCollege.classList.remove('active');
      if (streamAma) streamAma.style.display = 'flex';
      if (streamCollege) streamCollege.style.display = 'none';
      this.showToast('Ama Bus Network', 'Showing live running Ama Bus / Mo Bus (CRUT Odisha) timings at RIMS stop.', 'info');
    } else {
      if (btnCollege) btnCollege.classList.add('active');
      if (btnAma) btnAma.classList.remove('active');
      if (streamAma) streamAma.style.display = 'none';
      if (streamCollege) streamCollege.style.display = 'flex';
      this.showToast('College Shuttles', 'Showing dedicated RIMS College Buses & Internal Hostel Shuttle.', 'info');
    }
  },

  focusMapRoute(routeKey) {
    document.querySelectorAll('.map-route-pills .map-pill').forEach(p => p.classList.remove('active'));
    if (event && event.target) event.target.classList.add('active');

    const mapIframe = document.getElementById('campus-google-map');
    if (!mapIframe) return;

    if (routeKey === 'rims-campus') {
      mapIframe.src = "https://maps.google.com/maps?q=India+Gate,+New+Delhi,+India&t=&z=14&ie=UTF8&iwloc=&output=embed";
      this.showToast('Map Centered', 'Showing CampusEZ Main Academic Campus (India).', 'info');
    } else if (routeKey === 'amabus-101') {
      mapIframe.src = "https://maps.google.com/maps?q=Central+Station,+New+Delhi,+India&t=&z=14&ie=UTF8&iwloc=&output=embed";
      this.showToast('Transit 101', 'Tracking Route 101: Central Station ⇄ Tech Park ⇄ CampusEZ Ring Road.', 'info');
    } else if (routeKey === 'amabus-105') {
      mapIframe.src = "https://maps.google.com/maps?q=Sports+Stadium,+New+Delhi,+India&t=&z=14&ie=UTF8&iwloc=&output=embed";
      this.showToast('Transit 105', 'Tracking Route 105: Sports Stadium ⇄ West Terminal ⇄ CampusEZ.', 'info');
    } else if (routeKey === 'amabus-108') {
      mapIframe.src = "https://maps.google.com/maps?q=Airport,+New+Delhi,+India&t=&z=14&ie=UTF8&iwloc=&output=embed";
      this.showToast('Transit 108', 'Tracking Route 108: International Airport ⇄ Bus Stand ⇄ CampusEZ.', 'info');
    } else if (routeKey === 'panposh') {
      mapIframe.src = "https://maps.google.com/maps?q=Connaught+Place,+New+Delhi,+India&t=&z=15&ie=UTF8&iwloc=&output=embed";
      this.showToast('Campus Shuttle 01', 'Tracking CampusEZ Shuttle #01 on Central Corridor.', 'info');
    }
  },

  refreshBusGps(btnEl) {
    const icon = document.getElementById('bus-gps-icon');
    const text = document.getElementById('bus-gps-text');

    if (icon) icon.classList.add('fa-spin');
    if (text) text.textContent = 'Buffering Ama Bus Satellites...';
    if (btnEl) btnEl.classList.add('buffering-state');

    this.showToast('GPS Telemetry', 'Pinging CRUT Odisha & Ama Bus GPS satellites for real-time speed & arrivals...', 'info');

    // Call Backend API
    try {
      fetch('api/bus.php')
        .then(res => res.json())
        .then(data => console.log('Ama Bus telemetry payload:', data))
        .catch(err => console.log('Bus API fallback:', err));
    } catch (e) {
      console.log('Local fallback');
    }

    setTimeout(() => {
      if (icon) icon.classList.remove('fa-spin');
      if (text) text.textContent = 'Refresh Ama Bus GPS';
      if (btnEl) btnEl.classList.remove('buffering-state');

      const mapIframe = document.getElementById('campus-google-map');
      if (mapIframe) {
        const currentSrc = mapIframe.src;
        mapIframe.src = currentSrc;
      }

      this.showToast('Ama Bus Synced', 'Live Telemetry Locked: Route 101 (4m away), Route 105 (11m away), Route 108 (18m away) running on schedule!', 'success');
    }, 1300);
  },

  refreshAttendance(btnEl) {
    const icon = document.getElementById('rfid-sync-icon');
    const text = document.getElementById('rfid-sync-text');

    if (icon) icon.classList.add('fa-spin');
    if (text) text.textContent = 'Buffering RFID Logs...';
    if (btnEl) btnEl.classList.add('buffering-state');

    this.showToast('RFID Syncing', 'Polling Academic Block-A & Computer Lab door RFID reader logs...', 'info');

    setTimeout(() => {
      if (icon) icon.classList.remove('fa-spin');
      if (text) text.textContent = 'Sync RFID Scanners';
      if (btnEl) btnEl.classList.remove('buffering-state');

      this.showToast('RFID Refreshed', 'Attendance synced with RIMS Academic Server: 86.4% Safe attendance confirmed!', 'success');
    }, 1200);
  },

  // 8. Central Library Functions
  renderLibrarySeats() {
    const container = document.getElementById('rims-library-seats');
    if (!container) return;

    container.innerHTML = this.librarySeats.map(s => {
      let cssClass = 'st-free';
      let title = `Desk #${s.id} (Free)`;

      if (s.status === 'taken') {
        cssClass = 'st-taken';
        title = `Desk #${s.id} (Occupied)`;
      } else if (s.status === 'my') {
        cssClass = 'st-my';
        title = `Desk #${s.id} (Your Current Reservation)`;
      }

      return `<div class="seat-item ${cssClass}" title="${title}" onclick="rimsApp.selectLibrarySeat('${s.id}')">${s.id}</div>`;
    }).join('');
  },

  selectLibrarySeat(seatId) {
    const seat = this.librarySeats.find(s => s.id === seatId);
    if (!seat) return;

    if (seat.status === 'taken') {
      this.showToast('Desk Occupied', `Desk #${seatId} is currently in use by another student.`, 'warning');
      return;
    }

    this.librarySeats.forEach(s => {
      if (s.status === 'my') s.status = 'free';
    });

    seat.status = 'my';
    this.renderLibrarySeats();
    this.showToast('Desk Reserved!', `Quiet Desk #${seatId} booked for next 2 hours at Biju Patnaik Central Library.`, 'success');
  },

  bookLibrarySeat(label) {
    this.showToast('Check-in Confirmed', `Checked into ${label}. Power socket and high-speed Wi-Fi active.`, 'success');
  },

  renewBook(title) {
    this.showToast('Book Renewed!', `"${title}" extended for 14 more days. New return deadline: 11-Apr-2026.`, 'success');
  },

  // 9. RIMS Sahay AI Chat System (Students & Administrators)
  handleChatSubmit(e) {
    e.preventDefault();
    const input = document.getElementById('sahay-user-input');
    if (!input || !input.value.trim()) return;

    const query = input.value.trim();
    input.value = '';

    this.appendChatMessage(query, 'user');

    setTimeout(() => {
      const reply = this.getSahayAnswer(query);
      this.appendChatMessage(reply, 'bot');
    }, 500);
  },

  sendSahayQuery(question) {
    this.appendChatMessage(question, 'user');
    setTimeout(() => {
      const reply = this.getSahayAnswer(question);
      this.appendChatMessage(reply, 'bot');
    }, 450);
  },

  appendChatMessage(text, sender) {
    const thread = document.getElementById('sahay-chat-thread');
    if (!thread) return;

    const bubble = document.createElement('div');
    bubble.className = `chat-bubble bubble-${sender}`;

    if (sender === 'bot') {
      bubble.innerHTML = `
        <div class="bot-avatar"><i class="fa-solid fa-robot"></i></div>
        <div class="bubble-text">
          <p>${text}</p>
          <span class="chat-time">Just now</span>
        </div>
      `;
    } else {
      bubble.innerHTML = `
        <div class="bubble-text">
          <p>${text}</p>
          <span class="chat-time">Just now</span>
        </div>
      `;
    }

    thread.appendChild(bubble);
    thread.scrollTop = thread.scrollHeight;
  },

  getSahayAnswer(query) {
    const q = query.toLowerCase();
    if (q.includes('exam') || q.includes('mid') || q.includes('semester') || q.includes('date')) {
      return this.sahayDatabase.exam;
    } else if (q.includes('admit') || q.includes('hall ticket') || q.includes('card')) {
      return this.sahayDatabase.admit;
    } else if (q.includes('leave') || q.includes('apply') || q.includes('condonation') || q.includes('sick')) {
      return this.sahayDatabase.leave;
    } else if (q.includes('placement') || q.includes('job') || q.includes('tcs') || q.includes('nalco') || q.includes('company')) {
      return this.sahayDatabase.placement;
    } else if (q.includes('attendance') || q.includes('75') || q.includes('absent') || q.includes('cutoff')) {
      return this.sahayDatabase.attendance;
    } else if (q.includes('notice') || q.includes('broadcast') || q.includes('sms') || q.includes('whatsapp')) {
      return this.sahayDatabase.admin_notice;
    } else if (q.includes('suspend') || q.includes('reschedule') || q.includes('room') || q.includes('hall')) {
      return this.sahayDatabase.admin_rooms;
    } else if (q.includes('bus') || q.includes('panposh') || q.includes('station') || q.includes('route') || q.includes('map') || q.includes('location')) {
      return this.sahayDatabase.bus;
    } else if (q.includes('library') || q.includes('book') || q.includes('read') || q.includes('desk')) {
      return this.sahayDatabase.library;
    } else {
      return `Namaskar! I am checking CampusEZ India database records for "${query}". You can check today's timetable, download your admit card, track your 75% attendance cutoff, reserve library desks, or apply for leave!`;
    }
  },

  // 10. Faculty Actions
  submitFacultyAttendance() {
    this.showToast('Attendance Uploaded!', 'MCA-301 attendance recorded on CampusEZ Academic Server. Absent student alerts dispatched.', 'success');
  },



  showNotificationModal() {
    this.showToast('Campus Notifications', '2 new circulars: Mid-Semester Exam Hall Tickets and National Campus Recruitment (India).', 'info');
  },

  // 11. Student Complaints & Faculty Escalation Warning System
  setComplaintTargetType(type) {
    this.complaintTargetType = type;
    const btnFac = document.getElementById('btn-target-faculty');
    const btnAdm = document.getElementById('btn-target-admin');
    const grpFac = document.getElementById('group-target-faculty');
    const grpAdm = document.getElementById('group-target-admin');

    if (btnFac && btnAdm) {
      btnFac.classList.toggle('active', type === 'faculty');
      btnAdm.classList.toggle('active', type === 'admin');
    }
    if (grpFac) grpFac.style.display = type === 'faculty' ? 'block' : 'none';
    if (grpAdm) grpAdm.style.display = type === 'admin' ? 'block' : 'none';

    if (type === 'faculty') {
      document.querySelectorAll('#btn-target-admin .target-sub-pill').forEach(p => p.classList.remove('selected-pill'));
      const activeFac = document.querySelector('#btn-target-faculty .target-sub-pill.selected-pill');
      if (!activeFac) {
        const first = document.getElementById('pill-fac-teaching');
        if (first) first.classList.add('selected-pill');
      }
    } else {
      document.querySelectorAll('#btn-target-faculty .target-sub-pill').forEach(p => p.classList.remove('selected-pill'));
      const activeAdm = document.querySelector('#btn-target-admin .target-sub-pill.selected-pill');
      if (!activeAdm) {
        const first = document.getElementById('pill-admin-wifi');
        if (first) first.classList.add('selected-pill');
        const selectEl = document.getElementById('complaint-target-admin');
        if (selectEl) selectEl.value = 'Campus Wi-Fi / IT Desk';
      }
    }
  },

  selectAdminDeskDirect(deskValue, pillElement) {
    this.setComplaintTargetType('admin');

    const selectEl = document.getElementById('complaint-target-admin');
    if (selectEl) {
      selectEl.value = deskValue;
    }

    document.querySelectorAll('#btn-target-admin .target-sub-pill').forEach(p => p.classList.remove('selected-pill'));
    if (pillElement) {
      pillElement.classList.add('selected-pill');
    }

    if (deskValue === 'Campus Wi-Fi / IT Desk') {
      this.selectComplaintCategory('Campus Infrastructure');
      const locInput = document.getElementById('complaint-location');
      if (locInput && !locInput.value) locInput.value = 'Academic Block-A / Computer Lab (Wi-Fi)';
      this.showToast('Department Selected', 'Target: Campus Wi-Fi & IT Network Desk', 'info');
    } else if (deskValue === 'Hostel Administration') {
      this.selectComplaintCategory('Campus Infrastructure');
      const locInput = document.getElementById('complaint-location');
      if (locInput && !locInput.value) locInput.value = 'Student Hostel Block-B';
      this.showToast('Department Selected', 'Target: Hostel Administration & Maintenance', 'info');
    } else if (deskValue === 'Campus Canteen Committee') {
      this.selectComplaintCategory('Campus Infrastructure');
      const locInput = document.getElementById('complaint-location');
      if (locInput && !locInput.value) locInput.value = 'Central Canteen / Food Court';
      this.showToast('Department Selected', 'Target: Campus Canteen & Food Quality Committee', 'info');
    } else if (deskValue === 'Examination & Marks Cell') {
      this.selectComplaintCategory('Attendance & Grading');
      const locInput = document.getElementById('complaint-location');
      if (locInput && !locInput.value) locInput.value = 'Examination Section / Controller Office';
      this.showToast('Department Selected', 'Target: Examination & University Marks Cell', 'info');
    }

    const grpAdm = document.getElementById('group-target-admin');
    if (grpAdm) {
      grpAdm.style.display = 'block';
      grpAdm.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  },

  selectFacultyQuickTopic(topic, pillElement) {
    this.setComplaintTargetType('faculty');

    document.querySelectorAll('#btn-target-faculty .target-sub-pill').forEach(p => p.classList.remove('selected-pill'));
    if (pillElement) {
      pillElement.classList.add('selected-pill');
    }

    if (topic === 'Teaching pace' || topic === 'Syllabus coverage') {
      this.selectComplaintCategory('Teaching & Syllabus');
      this.showToast('Topic Selected', `Category set to Teaching Pace & Syllabus Coverage (${topic})`, 'info');
    } else if (topic === 'Lab practicals') {
      this.selectComplaintCategory('Lab Equipment & Practical');
      this.showToast('Topic Selected', 'Category set to Lab Practical & Software Tools', 'info');
    } else if (topic === 'Grading') {
      this.selectComplaintCategory('Attendance & Grading');
      this.showToast('Topic Selected', 'Category set to Attendance Discrepancy & Marks', 'info');
    }

    const grpFac = document.getElementById('group-target-faculty');
    if (grpFac) {
      grpFac.style.display = 'block';
      grpFac.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  },

  renderFacultyWarningBanner() {
    // Check complaints for current faculty (Prof. Dr. S. K. Mohanty)
    const facultyName = 'Prof. Dr. S. K. Mohanty';
    const facComplaints = this.complaintsList.filter(c => c.targetName === facultyName);
    const activeComplaints = facComplaints.filter(c => c.status !== 'Resolved');
    const totalCount = facComplaints.length;
    const isWarningTriggered = totalCount > this.warningThreshold; // >10 complaints

    const bannerContainers = [
      document.getElementById('faculty-warning-banner-container'),
      document.getElementById('faculty-section-warning-banner-container'),
      document.getElementById('student-warning-banner-container')
    ];

    let html = '';
    if (isWarningTriggered) {
      const percentage = Math.min(100, Math.round((totalCount / 15) * 100));
      html = `
        <div class="escalation-warning-banner critical">
          <div class="warn-header-row">
            <div class="warn-title-group">
              <div class="warn-icon-bubble">
                <i class="fa-solid fa-triangle-exclamation"></i>
              </div>
              <div class="warn-content">
                <h3>
                  <span>CRITICAL REGULATORY WARNING: HIGH COMPLAINTS VOLUME EXCEEDED (>10)</span>
                  <span class="status-badge status-escalated badge-pulse">Institutional Threshold Breached</span>
                </h3>
                <p>
                  <strong>Attention ${facultyName}:</strong> You have received <strong>${totalCount} student complaints</strong> (Institutional Limit: <strong>${this.warningThreshold} Max</strong>). Under RIMS Academic Compliance norms, this breach triggers an automatic <strong>Principal Desk & HOD Inquiry</strong>. Immediate corrective clarification is required.
                </p>
              </div>
            </div>
            <div class="warn-actions-row">
              <button class="btn btn-sm btn-primary" onclick="rimsApp.openFacultyResponseModal('ALL')">
                <i class="fa-solid fa-reply-all"></i> Submit Faculty Clarification
              </button>
              <button class="btn btn-sm btn-emerald" onclick="rimsApp.requestHODMeeting()">
                <i class="fa-solid fa-handshake"></i> Request HOD Hearing
              </button>
              <button class="btn btn-sm btn-outline" onclick="rimsApp.showSection('section-faculty-complaints')">
                <i class="fa-solid fa-list-check"></i> View ${totalCount} Complaints
              </button>
            </div>
          </div>

          <!-- Threshold Progress Meter -->
          <div class="threshold-meter-box">
            <div class="threshold-meter-labels">
              <span>Student Complaints Escalation Gauge</span>
              <span class="text-red font-bold">${totalCount} Received / Maximum Allowed: ${this.warningThreshold} (Breached by +${totalCount - this.warningThreshold})</span>
            </div>
            <div class="threshold-track">
              <div class="threshold-fill fill-danger" style="width: ${percentage}%;"></div>
              <div class="threshold-limit-flag" title="Threshold limit: 10 complaints"></div>
            </div>
            <div class="threshold-footer-notes">
              <span>0 Safe Zone (0 - 5)</span>
              <span>⚠️ 10 Threshold Limit Flag</span>
              <span class="text-red font-bold">🚨 11+ High Regulatory Danger</span>
            </div>
          </div>
        </div>
      `;
    } else {
      const percentage = Math.min(100, Math.round((totalCount / 15) * 100));
      html = `
        <div class="escalation-warning-banner safe">
          <div class="warn-header-row">
            <div class="warn-title-group">
              <div class="warn-icon-bubble">
                <i class="fa-solid fa-circle-check"></i>
              </div>
              <div class="warn-content">
                <h3>
                  <span>Institutional Grievance Compliance: Safe Status</span>
                  <span class="status-badge status-resolved">Within Normal Limit</span>
                </h3>
                <p>
                  <strong>${facultyName}:</strong> Current student complaints count is <strong>${totalCount} / ${this.warningThreshold} Max</strong>. No regulatory warnings active.
                </p>
              </div>
            </div>
            <div class="warn-actions-row">
              <button class="btn btn-sm btn-outline" onclick="rimsApp.showSection('section-faculty-complaints')">
                <i class="fa-solid fa-eye"></i> View Feedback (${totalCount})
              </button>
            </div>
          </div>
          <div class="threshold-meter-box">
            <div class="threshold-meter-labels">
              <span>Student Complaints Escalation Gauge</span>
              <span class="text-emerald font-bold">${totalCount} / ${this.warningThreshold} Threshold (Safe)</span>
            </div>
            <div class="threshold-track">
              <div class="threshold-fill fill-safe" style="width: ${percentage}%;"></div>
              <div class="threshold-limit-flag"></div>
            </div>
          </div>
        </div>
      `;
    }

    bannerContainers.forEach(container => {
      if (container) container.innerHTML = html;
    });

    // Update Badges & UI Elements
    const navBadge = document.getElementById('nav-faculty-complaints-badge');
    if (navBadge) {
      if (isWarningTriggered) {
        navBadge.className = 'badge-pill pill-red badge-pulse';
        navBadge.textContent = `${totalCount} Complaints ⚠️`;
      } else {
        navBadge.className = 'badge-pill pill-blue';
        navBadge.textContent = `${totalCount} Feedback`;
      }
    }

    const btnAlertCount = document.getElementById('btn-faculty-alert-count');
    if (btnAlertCount) {
      btnAlertCount.textContent = `${totalCount} Complaints ${isWarningTriggered ? '⚠️' : '✓'}`;
      btnAlertCount.className = isWarningTriggered ? 'badge-pill pill-red badge-pulse' : 'badge-pill pill-green';
    }

    const dashCount = document.getElementById('fac-dashboard-tkt-count');
    if (dashCount) dashCount.textContent = `${totalCount} Logged`;

    const dashStatus = document.getElementById('fac-dashboard-tkt-status');
    if (dashStatus) {
      if (isWarningTriggered) {
        dashStatus.className = 'status-badge badge-pulse';
        dashStatus.style.background = '#fef2f2';
        dashStatus.style.color = '#dc2626';
        dashStatus.style.borderColor = '#fca5a5';
        dashStatus.textContent = '⚠️ WARNING ACTIVE (>10)';
      } else {
        dashStatus.className = 'status-badge badge-green';
        dashStatus.style.background = '';
        dashStatus.style.color = '';
        dashStatus.style.borderColor = '';
        dashStatus.textContent = '✓ Safe Level';
      }
    }

    const facPillCount = document.getElementById('faculty-pill-tkt-count');
    if (facPillCount) facPillCount.textContent = `${totalCount} Active Complaints`;

    const facPillStatus = document.getElementById('faculty-pill-tkt-status');
    if (facPillStatus) {
      const span = facPillStatus.querySelector('span');
      if (span) span.textContent = isWarningTriggered ? 'Threshold: Max 10 (Warning Active)' : 'Threshold: Max 10 (Safe)';
    }
  },

  renderStudentComplaints() {
    const list = document.getElementById('student-complaints-list-container');
    if (!list) return;

    list.innerHTML = this.complaintsList.map(c => {
      let statusClass = 'status-review';
      if (c.status === 'Escalated to Principal') statusClass = 'status-escalated';
      else if (c.status === 'Warning Issued') statusClass = 'status-warning';
      else if (c.status === 'Resolved') statusClass = 'status-resolved';

      const isCritical = c.urgency === 'Critical' || c.status === 'Escalated to Principal' || c.status === 'Warning Issued';

      return `
        <div class="complaint-card ${isCritical ? 'critical-border' : ''}">
          <div class="complaint-card-header">
            <div>
              <span class="complaint-id-tag">${c.id}</span>
              <div class="complaint-target-info">
                <i class="fa-solid ${c.targetType === 'faculty' ? 'fa-chalkboard-user text-emerald' : 'fa-building text-blue'}"></i>
                <strong>${c.targetName}</strong>
                <span class="badge-tag ${c.targetType === 'faculty' ? 'badge-green' : 'badge-blue'}">${c.category}</span>
              </div>
            </div>
            <span class="complaint-status-pill ${statusClass}">${c.status}</span>
          </div>

          <h4 class="complaint-subject">${c.subject}</h4>
          <p class="complaint-desc">"${c.desc}"</p>

          ${c.facultyReply ? `
            <div class="complaint-response-box">
              <strong><i class="fa-solid fa-reply"></i> Official Response from ${c.targetName}:</strong>
              <span>${c.facultyReply}</span>
            </div>
          ` : `
            <div style="font-size: 11.5px; color: #64748b;">
              <i class="fa-solid fa-clock"></i> Awaiting official resolution &bull; Escalated to HOD Desk
            </div>
          `}

          <div class="complaint-footer-meta">
            <span>Reported by: <strong>${c.isAnon ? 'Anonymous Student' : c.studentName + ' (' + c.roll + ')'}</strong></span>
            <span><i class="fa-solid fa-flag text-amber"></i> Urgency: <strong>${c.urgency}</strong> &bull; <small>${c.time}</small></span>
          </div>
        </div>
      `;
    }).join('');

    const countBadge = document.getElementById('student-complaint-count-badge');
    if (countBadge) countBadge.textContent = `${this.complaintsList.length} Active`;

    const totalPill = document.getElementById('student-total-logged-pill');
    if (totalPill) totalPill.textContent = `${this.complaintsList.length} Grievances in System`;
  },

  renderFacultyComplaints() {
    const list = document.getElementById('faculty-complaints-grid');
    if (!list) return;

    const facultyName = 'Prof. Dr. S. K. Mohanty';
    const facComplaints = this.complaintsList.filter(c => c.targetName === facultyName);

    list.innerHTML = facComplaints.map(c => {
      let statusClass = 'status-review';
      if (c.status === 'Escalated to Principal') statusClass = 'status-escalated';
      else if (c.status === 'Warning Issued') statusClass = 'status-warning';
      else if (c.status === 'Resolved') statusClass = 'status-resolved';

      return `
        <div class="complaint-card critical-border">
          <div class="complaint-card-header">
            <div>
              <span class="complaint-id-tag">${c.id}</span>
              <div class="complaint-target-info">
                <span class="badge-tag badge-blue">${c.category}</span>
                <span class="badge-tag ${c.urgency === 'Critical' ? 'badge-red' : 'badge-amber'}">${c.urgency} Urgency</span>
              </div>
            </div>
            <span class="complaint-status-pill ${statusClass}">${c.status}</span>
          </div>

          <h4 class="complaint-subject">${c.subject}</h4>
          <p class="complaint-desc">"${c.desc}"</p>

          ${c.facultyReply ? `
            <div class="complaint-response-box">
              <strong><i class="fa-solid fa-check"></i> Your Clarification to Students:</strong>
              <span>${c.facultyReply}</span>
            </div>
          ` : `
            <button class="btn-sm btn-outline" style="align-self: flex-start;" onclick="rimsApp.openFacultyResponseModal('${c.id}')">
              <i class="fa-solid fa-reply"></i> Add Clarification / Reply
            </button>
          `}

          <div class="complaint-footer-meta">
            <span>Student: <strong>${c.isAnon ? 'Confidential / Anonymous' : c.studentName + ' (' + c.roll + ')'}</strong></span>
            <span><small>${c.time}</small></span>
          </div>
        </div>
      `;
    }).join('');
  },

  selectComplaintCategory(cat) {
    const input = document.getElementById('complaint-category');
    if (input) input.value = cat;

    const mapping = {
      'Teaching & Syllabus': 'cat-tile-teaching',
      'Lab Equipment & Practical': 'cat-tile-lab',
      'Attendance & Grading': 'cat-tile-att',
      'Mentorship & Guidance': 'cat-tile-mentor',
      'Campus Infrastructure': 'cat-tile-infra'
    };

    Object.values(mapping).forEach(id => {
      const tile = document.getElementById(id);
      if (tile) tile.classList.remove('active');
    });

    const activeTile = document.getElementById(mapping[cat]);
    if (activeTile) activeTile.classList.add('active');
  },

  selectComplaintUrgency(urg) {
    const input = document.getElementById('complaint-urgency');
    if (input) input.value = urg;

    ['urg-chip-critical', 'urg-chip-high', 'urg-chip-normal'].forEach(id => {
      const chip = document.getElementById(id);
      if (chip) chip.classList.remove('active');
    });

    const mapping = {
      'Critical': 'urg-chip-critical',
      'High': 'urg-chip-high',
      'Normal': 'urg-chip-normal'
    };

    const activeChip = document.getElementById(mapping[urg]);
    if (activeChip) activeChip.classList.add('active');
  },

  updateComplaintCharCount(input) {
    const counter = document.getElementById('char-counter');
    if (counter && input) {
      counter.textContent = `${input.value.length} / 120 chars`;
    }
  },

  handleEvidenceFileSelected(input) {
    const container = document.getElementById('attached-file-container');
    const nameSpan = document.getElementById('attached-file-name');
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const sizeKb = Math.round(file.size / 1024);
      if (nameSpan) nameSpan.textContent = `${file.name} (${sizeKb} KB)`;
      if (container) container.style.display = 'block';
      this.showToast('File Attached', `"${file.name}" attached as supporting evidence.`, 'info');
    }
  },

  removeAttachedFile() {
    const input = document.getElementById('complaint-file-input');
    const container = document.getElementById('attached-file-container');
    if (input) input.value = '';
    if (container) container.style.display = 'none';
  },

  saveComplaintDraft() {
    const subject = document.getElementById('complaint-subject')?.value || '';
    const desc = document.getElementById('complaint-desc')?.value || '';
    if (!subject && !desc) {
      this.showToast('Draft Empty', 'Please enter a subject or description before saving draft.', 'info');
      return;
    }
    const draft = {
      subject,
      desc,
      category: document.getElementById('complaint-category')?.value || 'Teaching & Syllabus',
      urgency: document.getElementById('complaint-urgency')?.value || 'High',
      timestamp: new Date().toLocaleTimeString()
    };
    try {
      localStorage.setItem('rims_complaint_draft', JSON.stringify(draft));
      this.showToast('Draft Saved', `Form G-10 grievance draft saved locally at ${draft.timestamp}.`, 'success');
    } catch(e) {
      this.showToast('Draft Saved', 'Grievance draft saved in session cache.', 'success');
    }
  },

  resetGrievanceForm() {
    this.selectComplaintCategory('Teaching & Syllabus');
    this.selectComplaintUrgency('High');
    this.removeAttachedFile();
    const counter = document.getElementById('char-counter');
    if (counter) counter.textContent = '0 / 120 chars';
    this.showToast('Form Reset', 'Grievance Form G-10 has been cleared.', 'info');
  },

  async handleLodgeComplaint(e) {
    e.preventDefault();
    const type = this.complaintTargetType || 'faculty';
    const targetEl = type === 'faculty' ? document.getElementById('complaint-target-faculty') : document.getElementById('complaint-target-admin');
    const targetName = targetEl ? targetEl.value : 'Prof. Dr. S. K. Mohanty';
    const category = document.getElementById('complaint-category')?.value || 'Teaching & Syllabus';
    const urgency = document.getElementById('complaint-urgency')?.value || 'High';
    const subject = document.getElementById('complaint-subject').value.trim();
    const desc = document.getElementById('complaint-desc').value.trim();
    const isAnon = document.getElementById('complaint-anonymous')?.checked || false;

    const newId = 'RIMS-CMP-' + Math.floor(115 + Math.random() * 50);

    const newComplaint = {
      id: newId,
      roll: isAnon ? 'ANON-STUDENT' : '23MCA014',
      studentName: isAnon ? 'Anonymous Student' : 'Soumya Patnaik',
      targetType: type,
      targetName: targetName,
      category: category,
      subject: subject,
      desc: desc,
      urgency: urgency,
      status: 'Under Review',
      isAnon: isAnon,
      facultyReply: null,
      time: 'Just now'
    };

    this.complaintsList.unshift(newComplaint);

    // Call Backend API
    try {
      await fetch('api/complaints.php?action=submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newComplaint)
      });
    } catch (err) {
      console.log('Using in-memory complaint list', err);
    }

    this.renderStudentComplaints();
    this.renderFacultyComplaints();
    this.renderFacultyWarningBanner();

    // Check count for this target
    const targetCount = this.complaintsList.filter(c => c.targetName === targetName).length;
    if (targetCount > this.warningThreshold) {
      this.showToast('⚠️ WARNING ESCALATION TRIGGERED!', `Grievances for "${targetName}" have exceeded 10 (Total: ${targetCount})! Regulatory alert dispatched to Principal Desk.`, 'warning');
    } else {
      this.showToast('Grievance Lodged (Form G-10)', `Application #${newId} recorded & routed to IQAC / HOD Redressal Cell.`, 'success');
    }

    // Reset Form Fields
    e.target.reset();
    this.resetGrievanceForm();

    // Generate new token preview
    const tokenDisplay = document.getElementById('form-token-display');
    if (tokenDisplay) {
      tokenDisplay.textContent = `REF: RIMS-GRV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    }
  },

  quickAddComplaint() {
    const newId = 'RIMS-CMP-' + Math.floor(120 + Math.random() * 80);
    this.complaintsList.unshift({
      id: newId,
      roll: '23MCA' + Math.floor(10 + Math.random() * 50),
      studentName: 'Student MCA-301',
      targetType: 'faculty',
      targetName: 'Prof. Dr. S. K. Mohanty',
      category: 'Teaching & Syllabus',
      subject: 'Clarification on Unit 4 Microservices Code Repo',
      desc: 'Additional hands-on GitHub repository requested for spring-boot microservices practical assessment.',
      urgency: 'High',
      status: 'Escalated to Principal',
      isAnon: false,
      facultyReply: null,
      time: 'Just now'
    });

    this.renderStudentComplaints();
    this.renderFacultyComplaints();
    this.renderFacultyWarningBanner();

    const count = this.complaintsList.filter(c => c.targetName === 'Prof. Dr. S. K. Mohanty').length;
    this.showToast('Complaint Added', `Test complaint #${newId} logged. Prof. Mohanty total complaints: ${count} (${count > 10 ? '⚠️ OVER 10 WARNING THRESHOLD' : 'Safe'})`, 'warning');
  },

  simulateOverTenComplaints() {
    // Reset or ensure 11 complaints for Prof. Dr. S. K. Mohanty
    const facComplaints = this.complaintsList.filter(c => c.targetName === 'Prof. Dr. S. K. Mohanty');
    if (facComplaints.length <= 10) {
      this.resetComplaintsDemo();
    }

    this.renderStudentComplaints();
    this.renderFacultyComplaints();
    this.renderFacultyWarningBanner();

    this.showToast('🚨 10+ COMPLAINTS WARNING ACTIVE!', 'Warning banner triggered! Prof. Dr. S. K. Mohanty has 11 student complaints (Institutional Limit: 10). Principal Desk alert active.', 'warning');
  },

  resolveSampleComplaints() {
    let resolvedCount = 0;
    this.complaintsList.forEach(c => {
      if (c.targetName === 'Prof. Dr. S. K. Mohanty' && c.status !== 'Resolved' && resolvedCount < 3) {
        c.status = 'Resolved';
        c.facultyReply = 'Resolved in HOD review session with syllabus extra class schedule.';
        resolvedCount++;
      }
    });

    this.renderStudentComplaints();
    this.renderFacultyComplaints();
    this.renderFacultyWarningBanner();

    this.showToast('Complaints Resolved', `3 complaints marked as Resolved. Active complaints reduced to safe compliance level.`, 'success');
  },

  resetComplaintsDemo() {
    this.complaintsList = [
      { id: 'CEZ-CMP-101', roll: '23MCA014', studentName: 'Soumya Patnaik', targetType: 'faculty', targetName: 'Prof. Dr. S. K. Mohanty', category: 'Teaching & Syllabus', subject: 'Incomplete Unit 4 Java Enterprise Frameworks before Mid-Sem', desc: 'Unit 4 Spring Boot Microservices syllabus not covered prior to 6th April exams.', urgency: 'High', status: 'Escalated to Principal', isAnon: false, facultyReply: 'Extra lecture scheduled this Saturday 10:00 AM in Room 204.', time: '2h ago' },
      { id: 'CEZ-CMP-102', roll: '23MCA002', studentName: 'Ananya Tripathy', targetType: 'faculty', targetName: 'Prof. Dr. S. K. Mohanty', category: 'Lab Equipment & Practical', subject: 'Lab 01 Server connection latency during Cloud practicals', desc: 'Docker containers timing out during Friday afternoon lab sessions.', urgency: 'High', status: 'Escalated to Principal', isAnon: false, facultyReply: 'Lab system RAM upgraded with IT Network Admin.', time: '4h ago' },
      { id: 'CEZ-CMP-103', roll: '23MCA018', studentName: 'Rakesh Mohanty', targetType: 'faculty', targetName: 'Prof. Dr. S. K. Mohanty', category: 'Attendance & Grading', subject: 'Internal assessment marks clarification in MCA-301', desc: 'Clarification needed on rubric for assignment 2 marks distribution.', urgency: 'Normal', status: 'Under Review', isAnon: false, facultyReply: null, time: '1d ago' },
      { id: 'CEZ-CMP-104', roll: '23MCA022', studentName: 'Priya Sahoo', targetType: 'faculty', targetName: 'Prof. Dr. S. K. Mohanty', category: 'Teaching & Syllabus', subject: 'Fast lecture pace during Distributed Systems module', desc: 'Students requested extra doubt clearing session before university exams.', urgency: 'High', status: 'Escalated to Principal', isAnon: true, facultyReply: null, time: '1d ago' },
      { id: 'CEZ-CMP-105', roll: '23MCA007', studentName: 'Bikash Rout', targetType: 'faculty', targetName: 'Prof. Dr. S. K. Mohanty', category: 'Mentorship & Guidance', subject: 'Major project mentorship slot scheduling conflict', desc: 'Need dedicated review slot for National Level Hackathon project.', urgency: 'Normal', status: 'Under Review', isAnon: false, facultyReply: null, time: '2d ago' },
      { id: 'CEZ-CMP-106', roll: '23MCA031', studentName: 'Sneha Das', targetType: 'faculty', targetName: 'Prof. Dr. S. K. Mohanty', category: 'Teaching & Syllabus', subject: 'Request for question bank / PYQ solutions discussion', desc: 'Discussion of 2024-25 university examination question solutions in class.', urgency: 'Normal', status: 'Under Review', isAnon: true, facultyReply: null, time: '2d ago' },
      { id: 'CEZ-CMP-107', roll: '23MCA012', studentName: 'Manoj Nayak', targetType: 'faculty', targetName: 'Prof. Dr. S. K. Mohanty', category: 'Lab Equipment & Practical', subject: 'Access to Enterprise IDE licenses in Lab 01', desc: 'IntelliJ / VS Code extension permissions needed for all systems.', urgency: 'High', status: 'Escalated to Principal', isAnon: false, facultyReply: null, time: '3d ago' },
      { id: 'CEZ-CMP-108', roll: '23MCA045', studentName: 'Smruti Rekha', targetType: 'faculty', targetName: 'Prof. Dr. S. K. Mohanty', category: 'Attendance & Grading', subject: 'Attendance log correction for 18-March lecture', desc: 'RFID scanner sync error on 18th March marked 4 students absent.', urgency: 'High', status: 'Escalated to Principal', isAnon: false, facultyReply: null, time: '3d ago' },
      { id: 'CEZ-CMP-109', roll: '23MCA009', studentName: 'Deepak Swain', targetType: 'faculty', targetName: 'Prof. Dr. S. K. Mohanty', category: 'Teaching & Syllabus', subject: 'Additional study notes for Microservices architecture', desc: 'Requesting digital lecture slides on CampusEZ Sahay portal.', urgency: 'Normal', status: 'Under Review', isAnon: true, facultyReply: null, time: '4d ago' },
      { id: 'CEZ-CMP-110', roll: '23MCA029', studentName: 'Tanmay Senapati', targetType: 'faculty', targetName: 'Prof. Dr. S. K. Mohanty', category: 'Lab Equipment & Practical', subject: 'Lab session duration extension for project deployment', desc: 'Need 30 mins extra lab access after 5:30 PM for AWS deployments.', urgency: 'Normal', status: 'Under Review', isAnon: false, facultyReply: null, time: '4d ago' },
      { id: 'CEZ-CMP-111', roll: '23MCA036', studentName: 'Alok Pradhan', targetType: 'faculty', targetName: 'Prof. Dr. S. K. Mohanty', category: 'Teaching & Syllabus', subject: 'Mid-Sem question pattern clarification', desc: 'Need clarity on Section C 10-mark design architecture questions.', urgency: 'Critical', status: 'Warning Issued', isAnon: false, facultyReply: null, time: '5d ago' },
      { id: 'CEZ-CMP-112', roll: '23MCA014', studentName: 'Soumya Patnaik', targetType: 'admin', targetName: 'Campus Wi-Fi / IT Desk', category: 'Campus Infrastructure', subject: 'Wi-Fi mesh deadzone in 2nd Floor Library Reading Room', desc: 'Signal drops frequently when accessing IEEE Xplore digital papers.', urgency: 'High', status: 'Under Review', isAnon: false, facultyReply: 'Network team installing repeater today.', time: '2h ago' }
    ];

    this.renderStudentComplaints();
    this.renderFacultyComplaints();
    this.renderFacultyWarningBanner();

    this.showToast('Demo Reset', 'Reset complaints state to default (11 complaints for Prof. Mohanty &bull; Warning Active).', 'info');
  },

  openFacultyResponseModal(complaintId = 'ALL') {
    const hiddenIn = document.getElementById('faculty-response-complaint-id');
    const targetTitleIn = document.getElementById('faculty-response-target-title');

    if (hiddenIn) hiddenIn.value = complaintId;
    if (targetTitleIn) {
      if (complaintId === 'ALL') {
        targetTitleIn.value = 'Batch Clarification: All Enrolled MCA 3rd Semester Students';
      } else {
        const item = this.complaintsList.find(c => c.id === complaintId);
        targetTitleIn.value = item ? `${item.id}: ${item.subject} [${item.studentName}]` : `Grievance #${complaintId}`;
      }
    }

    const modal = document.getElementById('rims-faculty-response-modal');
    if (modal) modal.classList.add('active');
  },

  handleFacultyResponseSubmit(e) {
    e.preventDefault();
    const complaintId = document.getElementById('faculty-response-complaint-id').value;
    const responseText = document.getElementById('faculty-response-text').value.trim();

    if (complaintId === 'ALL') {
      this.complaintsList.forEach(c => {
        if (c.targetName === 'Prof. Dr. S. K. Mohanty') {
          c.facultyReply = responseText;
        }
      });
    } else {
      const item = this.complaintsList.find(c => c.id === complaintId);
      if (item) item.facultyReply = responseText;
    }

    this.closeModals();
    this.renderStudentComplaints();
    this.renderFacultyComplaints();
    this.renderFacultyWarningBanner();

    this.showToast('Clarification Dispatched!', 'Faculty remedial plan delivered to student portal and Principal Desk.', 'success');
  },

  requestHODMeeting() {
    this.showToast('HOD Session Requested', 'Reconciliation meeting request booked with Academic Dean & Principal Desk for Friday 04:00 PM.', 'success');
  },

  showToast(title, message, type = 'info') {
    return; // User requested no popup notifications at any time
  },

  closeModals() {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
  },

  bindEvents() {
    const mobileBtn = document.getElementById('mobile-menu-toggle');
    if (mobileBtn) {
      mobileBtn.addEventListener('click', () => {
        this.toggleSidebar();
      });
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeSidebar();
        this.closeModals();
      }
    });

    const searchInput = document.getElementById('campus-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        document.querySelectorAll('.slot-card, .menu-card-full, .book-item, .bus-card, .pyq-card').forEach(card => {
          const txt = card.textContent.toLowerCase();
          card.style.display = txt.includes(query) ? 'flex' : 'none';
        });
      });
    }

    // Set default dates in leave form (Tomorrow to day after tomorrow)
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date(today);
    dayAfter.setDate(dayAfter.getDate() + 2);

    const startInput = document.getElementById('leave-start-date');
    const endInput = document.getElementById('leave-end-date');
    if (startInput) startInput.value = tomorrow.toISOString().split('T')[0];
    if (endInput) endInput.value = dayAfter.toISOString().split('T')[0];
  },

  submitHostelTicket(event) {
    event.preventDefault();
    const room = document.getElementById('hostel-room').value;
    const category = document.getElementById('hostel-category').value;
    const desc = document.getElementById('hostel-desc').value;

    if (!room || !category || !desc) {
      this.showToast('Validation Error', 'Please fill in all the details to lodge the complaint.', 'warning');
      return;
    }

    const ticketId = 'RIMS-M-' + Math.floor(1400 + Math.random() * 500);

    const listContainer = document.getElementById('hostel-ticket-list');
    if (listContainer) {
      const newElement = document.createElement('div');
      newElement.className = 'student-att-row';
      newElement.innerHTML = `
        <div>
          <strong>${category} Issue</strong>
          <span class="text-muted block text-sm">${category} &bull; ${room} &bull; Logged: Just Now</span>
        </div>
        <div style="text-align: right;">
          <span class="status-badge badge-amber">Technician Assigned</span>
          <span class="block text-sm font-bold text-heading mt-1">Ticket #${ticketId}</span>
        </div>
      `;
      listContainer.prepend(newElement);
    }

    this.showToast('Ticket Submitted', `Your maintenance request ${ticketId} has been sent to the hostel warden.`, 'success');
    event.target.reset();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  rimsApp.init();
});
