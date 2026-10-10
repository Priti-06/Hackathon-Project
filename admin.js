/**
 * CampusEZ Admin - Executive Admin Command Portal Logic
 * Standalone Administration Application for Principal, HODs & Administrative Officers
 * Location: CampusEZ Main Campus, India
 */

const adminPortal = {
  currentSection: 'admin-section-overview',
  charts: { dept: null, facility: null, fee: null },

  grievanceTickets: [
    { id: 'CEZ-TKT-104', location: 'Academic Block-A, Room 204', category: 'Classroom Projector / AV Issue', urgency: 'High', status: 'Technician Assigned', time: '15m ago' },
    { id: 'CEZ-TKT-103', location: 'Boys Hostel Block-B, 2nd Floor', category: 'Hostel Water Supply / Plumbing', urgency: 'High', status: 'Plumber on Site', time: '45m ago' },
    { id: 'CEZ-TKT-102', location: 'Central Library', category: 'Campus Wi-Fi / Internet Problem', urgency: 'Normal', status: 'Under Review', time: '2h ago' },
    { id: 'CEZ-TKT-099', location: 'Computer Lab 02, 1st Floor', category: 'Electricity / Fan / Light', urgency: 'Normal', status: 'Resolved', time: 'Yesterday' }
  ],

  // Student Grievances & Faculty Escalation State (Threshold: >10)
  warningThreshold: 10,
  complaintFilter: 'all',
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

  adminAiDatabase: {
    broadcast: "To send an urgent broadcast to students or faculty, open the **'SMS / WhatsApp Broadcast'** section, select your target audience, type your message, and click **Dispatch**.",
    fees: "Total semester fee collected is **₹1.42 Cr out of ₹1.60 Cr (88.6%)**. Currently **₹18.4 Lakhs** is pending across 208 students. You can search individual student No-Dues status under **'Fee & No-Dues Clearance'**.",
    capacity: "The **Central Seminar Hall** has a total seating capacity of **350 people** equipped with digital podium, dual 4K laser projectors, and centralized air-conditioning.",
    maintenance: "Campus Electrical & Plumbing Contractor: **Er. N. C. Rout** (+91 94370 55120). IT & Wi-Fi Network Admin: **Er. Rajesh Barik** (+91 98611 20419).",
    timetable: "Admins can mark any lecture as suspended or reallocate halls in the **'Timetable & Suspensions'** tab. Changes update immediately across student dashboards.",
    exam: "The Examination Centre Code for CampusEZ is **IND-202 (Main Academic Block, India)**. Examinations commence on **06-April-2026**."
  },

  openLoginModal(defaultRole = 'admin') {
    const modal = document.getElementById('rims-login-modal');
    if (!modal) return;
    this.fillDemoLogin(defaultRole);
    modal.classList.add('active');
  },

  closeModals() {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
  },

  // 1-Click Fast Instant Login Method
  async quickLogin(role = 'admin') {
    let username = 'CEZ-ADM-001';
    let password = 'admin@2026';
    if (role === 'student') {
      username = '23MCA014';
      password = 'student@2026';
    } else if (role === 'faculty') {
      username = 'CEZ-FAC-042';
      password = 'faculty@2026';
    }
    this.fillDemoLogin(role);
    await this.executeLogin(username, password, role);
  },

  fillDemoLogin(role) {
    const roleSelect = document.getElementById('admin-login-role');
    const usernameInput = document.getElementById('admin-login-username');
    const passwordInput = document.getElementById('admin-login-password');
    const label = document.getElementById('admin-login-username-label');

    if (roleSelect) roleSelect.value = role;

    if (role === 'student') {
      if (usernameInput) usernameInput.value = '23MCA014';
      if (passwordInput) passwordInput.value = 'student@2026';
      if (label) label.innerHTML = '<i class="fa-solid fa-id-card"></i> Student Roll No / Reg No / Email:';
    } else if (role === 'faculty') {
      if (usernameInput) usernameInput.value = 'faculty@campusez.in';
      if (passwordInput) passwordInput.value = 'faculty@2026';
      if (label) label.innerHTML = '<i class="fa-solid fa-envelope"></i> Faculty Employee ID / Email:';
    } else if (role === 'admin') {
      if (usernameInput) usernameInput.value = 'admin@campusez.in';
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
    const roleSelect = document.getElementById('admin-login-role');
    const role = roleSelect ? roleSelect.value : 'admin';
    const usernameInput = document.getElementById('admin-login-username');
    const username = usernameInput ? usernameInput.value.trim() : '';
    const passwordInput = document.getElementById('admin-login-password');
    const password = passwordInput ? passwordInput.value.trim() : '';

    if (!username) {
      this.showToast('Sign In Failed', 'Please enter your Admin Officer ID or Email.', 'warning');
      return;
    }

    if (!password) {
      this.showToast('Sign In Failed', 'Please enter your password.', 'warning');
      return;
    }

    await this.executeLogin(username, password, role);
  },

  async executeLogin(username, password, role) {
    // this.showToast('Authenticating...', 'Verifying administrator credentials with CampusEZ MySQL SSO Server...', 'info');

    try {
      const response = await fetch('api/auth.php?action=login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role })
      });
      const data = await response.json();
      if (data && data.status === 'success') {
        this.closeModals();
        if (role === 'student' || role === 'faculty') {
          // this.showToast('Switching Portal', `Redirecting to ${role.toUpperCase()} Academic Portal...`, 'success');
          setTimeout(() => { window.location.href = 'index.html'; }, 600);
          return;
        }
        this.showToast('Admin Authenticated', `Welcome, ${data.user.name}! Executive command center active.`, 'success');
        return true;
      } else {
        const errMsg = (data && data.message) ? data.message : 'Invalid username or password.';
        this.showToast('Authentication Failed', errMsg, 'warning');
        return false;
      }
    } catch (e) {
      console.warn('Network error, checking local admin fallback:', e);
      const u = username.toLowerCase();
      const isValidAdmin = (u === 'admin@campusez.in' || u === 'cez-adm-001' || u === 'admin' || u === 'panda') && (password === 'admin@2026' || password === '123456');
      if (isValidAdmin) {
        this.closeModals();
        this.showToast('Admin Authenticated', 'Logged in as Dr. A. K. Panda (Administrative Officer).', 'success');
        return true;
      } else if (role !== 'admin') {
        window.location.href = 'index.html';
        return true;
      } else {
        this.showToast('Authentication Failed', 'Invalid admin credentials entered.', 'warning');
        return false;
      }
    }
  },

  init() {
    this.renderTickets();
    this.renderAdminWarningBanner();
    this.renderAdminComplaintsTable();
    this.initCharts();
    this.bindEvents();
    // this.showToast('CampusEZ Admin Active', 'Logged in as Dr. A. K. Panda (Administrative Officer &bull; Principal Desk).', 'info');
  },

  showSection(sectionId) {
    this.currentSection = sectionId;

    // Hide all sections, display target
    document.querySelectorAll('.portal-section').forEach(sec => {
      sec.style.display = 'none';
      sec.classList.remove('active');
    });

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.style.display = 'block';
      targetSection.classList.add('active');
    }

    // Refresh section-specific data
    if (sectionId === 'admin-section-complaints' || sectionId === 'admin-section-overview') {
      this.renderAdminWarningBanner();
      this.renderAdminComplaintsTable();
    }
    if (sectionId === 'admin-section-leave') {
      this.fetchLeaves();
    }

    // Update Section Title in Header
    const sectionTitleMap = {
      'admin-section-overview': 'Executive Overview & KPIs',
      'admin-section-profile': 'Administrator Profile & Executive Dossier',
      'admin-section-timetable': 'Timetable & Class Suspensions',
      'admin-section-broadcast': 'SMS / WhatsApp Broadcast',
      'admin-section-complaints': 'Student Grievances & Faculty Escalation Desk',
      'admin-section-maintenance': 'Maintenance & Grievance Desk',
      'admin-section-leave': 'HOD Leave Approvals',
      'admin-section-fees': 'Fee & No-Dues Clearance',
      'admin-section-transit': 'Ama Bus & GPS Fleet Telemetry',
      'admin-section-telemetry': 'IoT Gates & RFID Telemetry'
    };

    const titleEl = document.getElementById('admin-section-title');
    if (titleEl) {
      titleEl.textContent = sectionTitleMap[sectionId] || 'Executive Administration';
    }

    // Update active nav item in sidebar
    document.querySelectorAll('.sidebar-nav .nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.section === sectionId);
    });

    // Update active bottom navigation item
    document.querySelectorAll('#admin-mobile-bottom-nav .bottom-nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.bottomSection === sectionId);
    });

    // Close mobile sidebar and backdrop
    this.closeSidebar();

    // Scroll main body to top
    const scrollContainer = document.querySelector('.main-body-scroll');
    if (scrollContainer) scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });

    // Resize charts if overview section
    if (sectionId === 'admin-section-overview') {
      setTimeout(() => {
        if (!this.charts.dept || !this.charts.facility || !this.charts.fee) {
          this.initCharts();
        } else {
          if (this.charts.dept) this.charts.dept.resize();
          if (this.charts.facility) this.charts.facility.resize();
          if (this.charts.fee) this.charts.fee.resize();
        }
      }, 150);
    }
  },

  initCharts() {
    try {
      const ctxDept = document.getElementById('deptAttendanceChart');
      if (ctxDept) {
        if (this.charts.dept) this.charts.dept.destroy();
      this.charts.dept = new Chart(ctxDept, {
        type: 'bar',
        data: {
          labels: ['MCA', 'MBA', 'BCA', 'BBA', 'B.Sc IT'],
          datasets: [{
            label: 'Attendance % Today',
            data: [93.3, 91.1, 90.8, 91.0, 93.3],
            backgroundColor: ['#1e40af', '#2563eb', '#3b82f6', '#60a5fa', '#10b981'],
            borderRadius: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: '#ffffff',
              titleColor: '#0f172a',
              bodyColor: '#334155',
              borderColor: '#e2e8f0',
              borderWidth: 1,
              callbacks: { label: ctx => ` ${ctx.raw}% Attendance Today` }
            }
          },
          scales: {
            x: { grid: { display: false }, ticks: { font: { family: 'Plus Jakarta Sans', size: 11 }, color: '#64748b' } },
            y: { min: 80, max: 100, grid: { color: '#f1f5f9' }, ticks: { font: { family: 'Plus Jakarta Sans', size: 10.5 }, color: '#64748b', callback: v => `${v}%` } }
          }
        }
      });
    }

    const ctxFac = document.getElementById('facilityUsageChart');
    if (ctxFac) {
      if (this.charts.facility) this.charts.facility.destroy();
      this.charts.facility = new Chart(ctxFac, {
        type: 'doughnut',
        data: {
          labels: ['Computer Labs (92%)', 'Classrooms (88%)', 'Central Library (76%)', 'Canteen (45%)'],
          datasets: [{
            data: [92, 88, 76, 45],
            backgroundColor: ['#10b981', '#2563eb', '#f59e0b', '#06b6d4'],
            borderWidth: 2,
            borderColor: '#ffffff'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '60%',
          plugins: {
            legend: {
              position: 'right',
              labels: { font: { family: 'Plus Jakarta Sans', size: 10.5, weight: '600' }, boxWidth: 10, color: '#334155' }
            }
          }
        }
      });
    }

    const ctxFee = document.getElementById('feeTrendChart');
    if (ctxFee) {
      if (this.charts.fee) this.charts.fee.destroy();
      this.charts.fee = new Chart(ctxFee, {
        type: 'line',
        data: {
          labels: ['Oct 25', 'Nov 25', 'Dec 25', 'Jan 26', 'Feb 26', 'Mar 26'],
          datasets: [{
            label: 'Fee Inflow (₹ Lakhs)',
            data: [18, 32, 48, 85, 120, 142],
            borderColor: '#f59e0b',
            backgroundColor: 'rgba(245, 158, 11, 0.12)',
            fill: true,
            tension: 0.35,
            pointBackgroundColor: '#b45309',
            pointRadius: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: '#ffffff',
              titleColor: '#0f172a',
              bodyColor: '#334155',
              borderColor: '#e2e8f0',
              borderWidth: 1,
              callbacks: { label: ctx => ` ₹${ctx.raw} Lakhs Total Cleared` }
            }
          },
          scales: {
            x: { grid: { display: false }, ticks: { font: { family: 'Plus Jakarta Sans', size: 10.5 }, color: '#64748b' } },
            y: { min: 0, max: 160, grid: { color: '#f1f5f9' }, ticks: { font: { family: 'Plus Jakarta Sans', size: 10 }, color: '#64748b', callback: v => `₹${v}L` } }
          }
        }
      });
    }
    } catch (error) {
      console.warn("Chart.js is not loaded or failed to initialize", error);
    }
  },

  refreshTelemetry(btnEl) {
    const icon = document.getElementById('admin-sync-icon');
    const text = document.getElementById('admin-sync-text');

    if (icon) icon.classList.add('fa-spin');
    if (text) text.textContent = 'Buffering Live Telemetry...';
    if (btnEl) btnEl.classList.add('buffering-state');

    this.showToast('Polling Campus Nodes', 'Checking Gate 1 RFID array, Academic Block-A door reader, and Wi-Fi mesh telemetry...', 'info');

    // Call Backend API
    try {
      fetch('api/admin.php?action=overview')
        .then(res => res.json())
        .then(data => console.log('Admin API payload:', data))
        .catch(err => console.log('Admin API fallback:', err));
    } catch (e) {
      console.log('Local fallback');
    }

    setTimeout(() => {
      if (icon) icon.classList.remove('fa-spin');
      if (text) text.textContent = 'Sync Live Telemetry';
      if (btnEl) btnEl.classList.remove('buffering-state');

      this.showToast('Telemetry Synced', 'All 4 campus IoT checkpoints active. 1,842 students & 62 faculty verified on RIMS Server.', 'success');
    }, 1250);
  },

  validateFeeClearance() {
    this.showToast('Fee Validation', '1,634 out of 1,842 students (88.6%) verified with No-Dues Clearance for University Semester Hall Tickets.', 'success');
  },

  exportCampusReport() {
    const headers = ['Department', 'Total_Students', 'Present_Today', 'Attendance_Pct', 'Labs_Active', 'Fee_Cleared_Pct'];
    const rows = [
      ['MCA (Master of Computer Apps)', '120', '112', '93.3%', '2', '96.2%'],
      ['MBA (Master of Business Admin)', '180', '164', '91.1%', '1', '94.0%'],
      ['BCA (Bachelor of Computer Apps)', '240', '218', '90.8%', '2', '89.5%'],
      ['BBA (Bachelor of Business Admin)', '200', '182', '91.0%', '0', '88.0%'],
      ['B.Sc. Data Science & IT', '90', '84', '93.3%', '1', '92.5%'],
      ['B.Com (Honours)', '1012', '975', '96.3%', '0', '85.4%']
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `rims_executive_report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    this.showToast('Report Downloaded', 'RIMS Executive Campus Operations CSV downloaded successfully.', 'success');
  },

  suspendClass(subjectCode) {
    const statusEl = document.getElementById(`class-status-${subjectCode}`);
    const btnEl = document.getElementById(`class-btn-${subjectCode}`);

    if (statusEl) {
      statusEl.className = 'status-badge badge-amber';
      statusEl.innerHTML = '🚫 Suspended (By Admin)';
    }

    if (btnEl) {
      btnEl.className = 'btn-sm btn-emerald';
      btnEl.textContent = 'Restore Class';
      btnEl.setAttribute('onclick', `adminPortal.restoreClass('${subjectCode}')`);
    }

    this.showToast('Class Suspended', `${subjectCode} marked as Suspended by Admin Notice. Student timetables and electronic boards updated.`, 'warning');
  },

  restoreClass(subjectCode) {
    const statusEl = document.getElementById(`class-status-${subjectCode}`);
    const btnEl = document.getElementById(`class-btn-${subjectCode}`);

    if (statusEl) {
      statusEl.className = 'status-badge badge-green';
      statusEl.innerHTML = 'Scheduled (Active)';
    }

    if (btnEl) {
      btnEl.className = 'btn-sm btn-outline';
      btnEl.textContent = 'Suspend Class';
      btnEl.setAttribute('onclick', `adminPortal.suspendClass('${subjectCode}')`);
    }

    this.showToast('Class Restored', `${subjectCode} restored to Active schedule. Lecture hall reserved.`, 'success');
  },

  handleBroadcastSubmit(e) {
    e.preventDefault();
    const target = document.getElementById('notice-target').value;
    const title = document.getElementById('notice-title').value;
    const body = document.getElementById('notice-body').value;

    if (!title || !body) return;

    // Call Backend API
    try {
      fetch('api/admin.php?action=broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, target, content: body })
      }).catch(err => console.log('API:', err));
    } catch (e) {
      console.log('Local fallback');
    }

    const historyList = document.getElementById('admin-broadcasts-history');
    if (historyList) {
      const newItem = document.createElement('div');
      newItem.className = 'circular-item';
      newItem.innerHTML = `
        <span class="circ-badge badge-blue">SMS + APP</span>
        <div class="circ-details">
          <strong>${title}</strong>
          <span>Sent to: ${target} &bull; 100% Delivery</span>
        </div>
        <span class="circ-date">Just Now</span>
      `;
      historyList.insertBefore(newItem, historyList.firstChild);
    }

    this.showToast('Notice Dispatched!', `"${title}" broadcasted to ${target} via SMS & WhatsApp Gateway.`, 'success');
    e.target.reset();
  },

  fillSampleNotice() {
    document.getElementById('notice-title').value = "TCS Campus Placement Drive: Registration Open (Room 102)";
    document.getElementById('notice-body').value = "Final year MCA & MBA students with >60% aggregate can register with the Placement Cell. Bring updated resumes and passport photos.";
  },

  renderTickets() {
    const list = document.getElementById('admin-tickets-list');
    if (!list) return;

    list.innerHTML = this.grievanceTickets.map(t => {
      const isResolved = t.status === 'Resolved';
      return `
        <div class="ticket-box-item">
          <div>
            <strong>${t.category} &bull; <span class="text-muted font-normal">${t.id}</span></strong>
            <span><i class="fa-solid fa-location-dot"></i> ${t.location} &bull; <small>${t.time}</small></span>
          </div>
          <button class="btn-sm ${isResolved ? 'btn-outline' : 'btn-emerald'}" onclick="adminPortal.resolveTicket('${t.id}')">
            <i class="fa-solid ${isResolved ? 'fa-circle-check' : 'fa-check'}"></i> ${t.status}
          </button>
        </div>
      `;
    }).join('');

    const pending = this.grievanceTickets.filter(t => t.status !== 'Resolved').length;
    const badge = document.getElementById('admin-badge-tickets');
    if (badge) badge.textContent = `${pending} Open`;
  },

  resolveTicket(ticketId) {
    const t = this.grievanceTickets.find(item => item.id === ticketId);
    if (!t) return;

    t.status = 'Resolved';
    this.renderTickets();
    this.showToast('Ticket Resolved', `${ticketId} closed by RIMS Campus Maintenance team.`, 'success');
  },

  addNewGrievance() {
    const newId = 'RIMS-TKT-' + Math.floor(105 + Math.random() * 20);
    this.grievanceTickets.unshift({
      id: newId,
      location: 'Academic Block-A, 1st Floor Corridor',
      category: 'Corridor LED Tube-Light Replacement',
      urgency: 'Normal',
      status: 'Technician Assigned',
      time: 'Just now'
    });
    this.renderTickets();
    this.showToast('Ticket Created', `Maintenance ticket ${newId} assigned to campus electrician.`, 'success');
  },

  fetchLeaves() {
    fetch('api/leave.php?action=list')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          this.leaveApplications = data.leaves || [];
          this.renderLeaveApplications();
        }
      })
      .catch(err => console.error('Failed to fetch leaves:', err));
  },

  renderLeaveApplications() {
    const listContainer = document.getElementById('admin-leave-approval-list');
    if (!listContainer) return;

    if (!this.leaveApplications || this.leaveApplications.length === 0) {
      listContainer.innerHTML = `<div style="padding: 20px; text-align: center; color: #64748b;">No leave applications found.</div>`;
      return;
    }

    const pendingCount = this.leaveApplications.filter(l => l.status === 'Pending Review').length;
    
    const badge = document.getElementById('admin-badge-leave');
    if (badge) badge.textContent = `${pendingCount} Pending`;

    const pendingBadge = document.getElementById('admin-pending-leave-badge');
    if (pendingBadge) {
      if (pendingCount === 0) {
        pendingBadge.textContent = 'All Leave Applications Cleared';
        pendingBadge.className = 'badge-tag badge-green';
      } else {
        pendingBadge.textContent = `${pendingCount} Pending HOD Approval`;
        pendingBadge.className = 'badge-tag badge-amber';
      }
    }

    listContainer.innerHTML = this.leaveApplications.map(l => {
      let statusHtml = '';
      if (l.status === 'Pending Review') {
        statusHtml = `
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-sm btn-outline" onclick="adminPortal.rejectLeave('${l.leave_id}')" style="color: #e11d48; border-color: #fecdd3; padding: 6px 12px;">Reject</button>
            <button class="btn btn-sm btn-primary" onclick="adminPortal.approveLeave('${l.leave_id}')" style="background: #10b981; border-color: #10b981; padding: 6px 12px;">Approve</button>
          </div>
        `;
      } else {
        const isApproved = l.status === 'Approved';
        statusHtml = `<span class="status-badge ${isApproved ? 'badge-green' : 'badge-red'}">${l.status}</span>`;
      }

      return `
        <div class="student-att-row" id="admin-leave-row-${l.leave_id}">
          <div>
            <strong>${l.student_name} (${l.roll_number})</strong>
            <span class="text-muted block text-sm">${l.leave_type} &bull; ${l.start_date} to ${l.end_date} (${l.total_days} Days)</span>
            <p style="margin: 4px 0 0 0; font-size: 13px; color: #475569;">"${l.reason}"</p>
            ${l.status === 'Approved' ? `<span class="text-emerald block text-sm font-bold mt-1"><i class="fa-solid fa-circle-check"></i> APPROVED BY HOD &bull; Attendance Condonation Credited</span>` : ''}
          </div>
          ${statusHtml}
        </div>
      `;
    }).join('');
  },

  approveLeave(leaveId) {
    fetch('api/leave.php?action=approve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ leave_id: leaveId })
    })
    .then(res => res.json())
    .then(data => {
      if (data.status === 'success') {
        this.showToast('Leave Approved', 'Leave application approved successfully.', 'success');
        this.fetchLeaves();
      }
    })
    .catch(err => console.error(err));
  },

  rejectLeave(leaveId) {
    fetch('api/leave.php?action=reject', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ leave_id: leaveId })
    })
    .then(res => res.json())
    .then(data => {
      if (data.status === 'success') {
        this.showToast('Leave Rejected', 'Leave application rejected.', 'warning');
        this.fetchLeaves();
      }
    })
    .catch(err => console.error(err));
  },

  searchStudentDues() {
    const input = document.getElementById('fee-lookup-input').value.trim();
    this.showToast('Dues Checked', `Student "${input || '23MCA014'}" has ₹0.00 outstanding dues. University Hall Ticket verified.`, 'success');
  },

  handleChatSubmit(e) {
    e.preventDefault();
    const input = document.getElementById('admin-sahay-user-input');
    if (!input || !input.value.trim()) return;

    const query = input.value.trim();
    input.value = '';

    this.appendChatMessage(query, 'user');
    setTimeout(() => {
      const reply = this.getSahayAnswer(query);
      this.appendChatMessage(reply, 'bot');
    }, 450);
  },

  sendSahayQuery(q) {
    this.appendChatMessage(q, 'user');
    setTimeout(() => {
      const reply = this.getSahayAnswer(q);
      this.appendChatMessage(reply, 'bot');
    }, 400);
  },

  appendChatMessage(text, sender) {
    const thread = document.getElementById('admin-sahay-chat-thread');
    if (!thread) return;

    const bubble = document.createElement('div');
    bubble.className = `chat-bubble bubble-${sender}`;

    if (sender === 'bot') {
      bubble.innerHTML = `
        <div class="bot-avatar bg-blue-subtle text-blue"><i class="fa-solid fa-robot"></i></div>
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
    if (q.includes('broadcast') || q.includes('sms') || q.includes('notice') || q.includes('message')) {
      return this.adminAiDatabase.broadcast;
    } else if (q.includes('fee') || q.includes('due') || q.includes('clearance') || q.includes('collection')) {
      return this.adminAiDatabase.fees;
    } else if (q.includes('kalam') || q.includes('hall') || q.includes('capacity') || q.includes('seminar')) {
      return this.adminAiDatabase.capacity;
    } else if (q.includes('plumb') || q.includes('technician') || q.includes('electric') || q.includes('contact') || q.includes('maintenance')) {
      return this.adminAiDatabase.maintenance;
    } else if (q.includes('timetable') || q.includes('suspend') || q.includes('class')) {
      return this.adminAiDatabase.timetable;
    } else if (q.includes('exam') || q.includes('center') || q.includes('code') || q.includes('admit')) {
      return this.adminAiDatabase.exam;
    } else {
      return `Namaskar, Administrator! Checking CampusEZ Executive database for "${query}". You can dispatch SMS circulars, verify student fee dues, manage lecture hall allocations, or ping Campus Transit GPS fleet.`;
    }
  },

  // =========================================================================
  // STUDENT GRIEVANCES & >10 COMPLAINTS ESCALATION WARNING METHODS
  // =========================================================================

  renderAdminWarningBanner() {
    // 1. Group active complaints by target
    const activeComplaints = this.complaintsList.filter(c => c.status !== 'Resolved');
    const targetCounts = {};
    activeComplaints.forEach(c => {
      targetCounts[c.targetName] = (targetCounts[c.targetName] || 0) + 1;
    });

    let offenderName = null;
    let offenderCount = 0;
    for (const [name, count] of Object.entries(targetCounts)) {
      if (count > this.warningThreshold) {
        if (count > offenderCount) {
          offenderName = name;
          offenderCount = count;
        }
      }
    }

    const hasWarning = offenderCount > this.warningThreshold; // count > 10
    const totalActive = activeComplaints.length;

    // Update KPI & Badge elements if present
    const badgeSidebar = document.getElementById('admin-badge-complaints');
    if (badgeSidebar) {
      if (hasWarning) {
        badgeSidebar.className = 'badge-pill pill-red badge-pulse';
        badgeSidebar.innerHTML = `${totalActive} Alerts ⚠️`;
      } else {
        badgeSidebar.className = 'badge-pill pill-green';
        badgeSidebar.innerHTML = `${totalActive} Active`;
      }
    }

    const badgeOverviewBtn = document.getElementById('btn-admin-overview-alert-count');
    if (badgeOverviewBtn) {
      if (hasWarning) {
        badgeOverviewBtn.className = 'badge-pill pill-red badge-pulse';
        badgeOverviewBtn.innerHTML = `${totalActive} Active ⚠️`;
      } else {
        badgeOverviewBtn.className = 'badge-pill pill-green';
        badgeOverviewBtn.innerHTML = `${totalActive} Active`;
      }
    }

    const kpiCount = document.getElementById('admin-kpi-complaints');
    if (kpiCount) {
      kpiCount.textContent = `${totalActive} Active`;
      kpiCount.className = hasWarning ? 'kpi-val text-red' : 'kpi-val text-emerald';
    }

    const pillEscalation = document.getElementById('admin-pill-escalation');
    const pillEscalationCount = document.getElementById('admin-escalation-pill-count');
    if (pillEscalationCount) {
      pillEscalationCount.textContent = `${totalActive} Active Complaints`;
    }
    if (pillEscalation) {
      if (hasWarning) {
        pillEscalation.innerHTML = `
          <i class="fa-solid fa-triangle-exclamation text-red badge-pulse"></i>
          <div>
            <strong style="color: #e11d48;">${totalActive} Active Complaints</strong>
            <span style="color: #9f1239;">⚠️ Threshold Breached (>10 by ${offenderName || 'Faculty'})</span>
          </div>
        `;
      } else {
        pillEscalation.innerHTML = `
          <i class="fa-solid fa-circle-check text-emerald"></i>
          <div>
            <strong style="color: #059669;">${totalActive} Active Complaints</strong>
            <span style="color: #065f46;">✅ Safety Limit Compliant (≤10)</span>
          </div>
        `;
      }
    }

    // Build Banner HTML (User requested to remove big warning banner)
    let bannerHtml = '';
    
    // Add small warning popup instead if there's a warning and we haven't already shown it recently
    if (hasWarning) {
      if (!this._lastWarningToastTime || (Date.now() - this._lastWarningToastTime > 5000)) {
        this.showToast(
          'Escalation Warning (>10)', 
          `${offenderName} has exceeded the limit with ${offenderCount} active complaints. Immediate review required.`, 
          'warning'
        );
        this._lastWarningToastTime = Date.now();
      }
    }


    // Insert into overview banner container
    const overviewContainer = document.getElementById('admin-warning-banner-container');
    if (overviewContainer) overviewContainer.innerHTML = bannerHtml;

    // Insert into complaints section banner container
    const sectionContainer = document.getElementById('admin-complaints-section-warning-banner');
    if (sectionContainer) sectionContainer.innerHTML = bannerHtml;
  },

  renderAdminComplaintsTable() {
    const container = document.getElementById('admin-complaints-table-container');
    if (!container) return;

    let list = this.complaintsList;
    if (this.complaintFilter === 'faculty') {
      list = list.filter(c => c.targetType === 'faculty');
    } else if (this.complaintFilter === 'admin') {
      list = list.filter(c => c.targetType === 'admin');
    }

    // Update filter counts
    const btnAll = document.getElementById('filter-admin-all');
    const btnFac = document.getElementById('filter-admin-faculty');
    const btnAdm = document.getElementById('filter-admin-admin');

    const totalCount = this.complaintsList.length;
    const facCount = this.complaintsList.filter(c => c.targetType === 'faculty').length;
    const admCount = this.complaintsList.filter(c => c.targetType === 'admin').length;

    if (btnAll) btnAll.textContent = `All Grievances (${totalCount})`;
    if (btnFac) btnFac.textContent = `Faculty Breaches (${facCount}${facCount > 10 ? ' ⚠️' : ''})`;
    if (btnAdm) btnAdm.textContent = `Campus Depts (${admCount})`;

    if (list.length === 0) {
      container.innerHTML = `
        <div class="empty-state-box" style="text-align: center; padding: 40px 20px;">
          <i class="fa-solid fa-check-circle text-emerald" style="font-size: 38px; margin-bottom: 12px; display: block;"></i>
          <h4 style="margin: 0 0 6px 0; font-size: 16px;">No Grievances in this Category</h4>
          <p class="text-muted" style="font-size: 13.5px; margin: 0;">No active student complaints match the selected filter criteria.</p>
        </div>
      `;
      return;
    }

    let rowsHtml = list.map(c => {
      const isCritical = c.urgency === 'Critical' || c.urgency === 'High';
      const urgencyBadge = isCritical
        ? `<span class="badge-pill pill-red">${c.urgency}</span>`
        : `<span class="badge-pill pill-amber">${c.urgency}</span>`;
      
      const isResolved = c.status === 'Resolved';
      const statusBadge = isResolved
        ? `<span class="badge-tag badge-green"><i class="fa-solid fa-check"></i> Resolved</span>`
        : (c.status.includes('Warning') || c.status.includes('Escalated') || c.status.includes('Notice'))
          ? `<span class="badge-tag" style="background:#ffe4e6; color:#e11d48; font-weight:700;"><i class="fa-solid fa-triangle-exclamation"></i> ${c.status}</span>`
          : `<span class="badge-tag badge-amber"><i class="fa-solid fa-clock"></i> ${c.status}</span>`;

      const targetIcon = c.targetType === 'faculty' ? 'fa-chalkboard-user' : 'fa-building-shield';
      const targetBadge = c.targetType === 'faculty'
        ? `<span class="badge-pill pill-purple"><i class="fa-solid ${targetIcon}"></i> ${c.targetName}</span>`
        : `<span class="badge-pill pill-blue"><i class="fa-solid ${targetIcon}"></i> ${c.targetName}</span>`;

      const studentDisplay = c.isAnon
        ? `<span class="text-muted" style="display:block;" title="Protected under Student Privacy Policy"><i class="fa-solid fa-user-secret"></i> Anonymous Student</span>`
        : `<strong style="display:block; color: var(--text-main);">${c.studentName}</strong> <span class="text-muted" style="font-size:12px; display:block; margin-top:2px;">(${c.roll})</span>`;

      return `
        <tr style="border-bottom: 1px solid var(--border-light); ${c.targetName === 'Prof. Dr. S. K. Mohanty' && !isResolved ? 'background: rgba(254, 226, 226, 0.25);' : ''}">
          <td style="padding: 16px 14px 16px 22px; vertical-align: top; font-weight: 700; font-family: monospace; font-size: 13px;">
            ${c.id}
            <span class="text-muted" style="display:block; font-size: 11.5px; font-weight: normal; margin-top:4px;">${c.time}</span>
          </td>
          <td style="padding: 16px 14px; vertical-align: top;">${studentDisplay}</td>
          <td style="padding: 16px 14px; vertical-align: top;">${targetBadge}</td>
          <td style="padding: 16px 14px; vertical-align: top;">
            <strong style="display:block; margin-bottom:4px; font-size: 14px; color: var(--text-heading);">${c.subject}</strong>
            <span class="text-muted" style="display: block; font-size: 12.5px; line-height: 1.5;">
              <i class="fa-solid fa-tag"></i> ${c.category} &bull; ${c.desc.substring(0, 75)}${c.desc.length > 75 ? '...' : ''}
            </span>
            ${c.facultyReply ? `<span style="display:block; font-size: 12px; color: #0284c7; margin-top: 6px;"><i class="fa-solid fa-reply"></i> Reply: "${c.facultyReply}"</span>` : ''}
          </td>
          <td style="padding: 16px 14px; vertical-align: top;">${urgencyBadge}</td>
          <td style="padding: 16px 14px; vertical-align: top;">${statusBadge}</td>
          <td style="padding: 16px 22px 16px 14px; vertical-align: top; white-space: nowrap;">
            ${!isResolved ? `
              <button class="btn-sm btn-emerald" onclick="adminPortal.resolveAdminComplaint('${c.id}')" title="Mark Resolved">
                <i class="fa-solid fa-check"></i> Resolve
              </button>
            ` : `
              <span class="text-muted" style="font-size: 12px;"><i class="fa-solid fa-circle-check text-emerald"></i> Settled</span>
            `}
            ${c.targetType === 'faculty' ? `
              <button class="btn-sm btn-outline" onclick="adminPortal.openShowCauseModal('${c.targetName}')" title="Issue Warning" style="margin-left: 4px;">
                <i class="fa-solid fa-gavel"></i> Notice
              </button>
            ` : ''}
          </td>
        </tr>
      `;
    }).join('');

    container.innerHTML = `
      <table class="faculty-records-table" style="width: 100%; border-collapse: collapse; font-size: 13.5px;">
        <thead>
          <tr style="background: var(--bg-subtle); text-align: left; border-bottom: 2px solid var(--border-light);">
            <th style="padding: 12px 14px 12px 22px; width: 10%;">Complaint ID</th>
            <th style="padding: 12px 14px; width: 15%;">Student / Roll</th>
            <th style="padding: 12px 14px; width: 16%;">Target Entity</th>
            <th style="padding: 12px 14px; width: 32%;">Subject & Description</th>
            <th style="padding: 12px 14px; width: 7%;">Urgency</th>
            <th style="padding: 12px 14px; width: 9%;">Status</th>
            <th style="padding: 12px 22px 12px 14px; width: 11%;">Actions</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    `;
  },

  filterComplaints(filter) {
    this.complaintFilter = filter;
    
    // Update active tab styling
    ['filter-admin-all', 'filter-admin-faculty', 'filter-admin-admin'].forEach(id => {
      const btn = document.getElementById(id);
      if (btn) btn.classList.remove('active');
    });

    const activeBtn = document.getElementById(`filter-admin-${filter}`);
    if (activeBtn) activeBtn.classList.add('active');

    this.renderAdminComplaintsTable();
  },

  openShowCauseModal(facultyName = 'Prof. Dr. S. K. Mohanty') {
    const modal = document.getElementById('admin-showcause-modal');
    if (!modal) return;

    const inputName = document.getElementById('showcause-faculty-name');
    if (inputName) inputName.value = `${facultyName} (Associate Professor, MCA)`;

    const inputRef = document.getElementById('showcause-ref');
    if (inputRef) inputRef.value = `RIMS/PRIN/2026/ESC-${Math.floor(10 + Math.random() * 90)}`;

    modal.classList.add('active');
  },

  handleDispatchShowCause(e) {
    e.preventDefault();
    const facultyName = document.getElementById('showcause-faculty-name')?.value || 'Prof. Dr. S. K. Mohanty';
    const ref = document.getElementById('showcause-ref')?.value || 'RIMS/ESC/2026/01';

    // Update status of complaints for this target
    this.complaintsList.forEach(c => {
      if (c.targetName.includes('Mohanty') && c.status !== 'Resolved') {
        c.status = 'Notice Issued';
      }
    });

    this.closeModals();
    this.showToast('Show-Cause Notice Dispatched', `Official notice ${ref} dispatched to ${facultyName} & HOD Office.`, 'warning');
    
    this.renderAdminWarningBanner();
    this.renderAdminComplaintsTable();
  },

  scheduleInquiryHearing(facultyName = 'Prof. Dr. S. K. Mohanty') {
    this.showToast(
      'Inquiry Board Scheduled',
      `Formal Inquiry & Reconciliation Hearing convened for ${facultyName} on Friday, 04:00 PM at Principal Boardroom.`,
      'warning'
    );
  },

  resolveAdminComplaint(id) {
    const complaint = this.complaintsList.find(c => c.id === id);
    if (complaint) {
      complaint.status = 'Resolved';
      this.showToast('Grievance Resolved', `Complaint ${id} marked as resolved. Metric updated.`, 'success');
      this.renderAdminWarningBanner();
      this.renderAdminComplaintsTable();
    }
  },

  simulateOverTenComplaints() {
    // Reset all to escalated state with 11 complaints for Mohanty
    this.complaintsList.forEach(c => {
      if (c.targetName.includes('Mohanty')) {
        c.status = 'Escalated to Principal';
      }
    });
    this.renderAdminWarningBanner();
    this.renderAdminComplaintsTable();
    this.showToast('⚠️ Escalation Triggered', '11 active student complaints registered for Prof. Dr. S. K. Mohanty (>10 Threshold breached). Critical Warning Active!', 'warning');
  },

  resolveSampleComplaints() {
    // Resolve 4 complaints to bring count down to 7 (<=10)
    let resolvedCount = 0;
    this.complaintsList.forEach(c => {
      if (c.targetName.includes('Mohanty') && c.status !== 'Resolved' && resolvedCount < 4) {
        c.status = 'Resolved';
        resolvedCount++;
      }
    });

    this.renderAdminWarningBanner();
    this.renderAdminComplaintsTable();
    this.showToast('✅ Threshold Cleared', 'Resolved 4 complaints. Active count dropped to 7 (≤10). Institutional status: Compliant & Safe!', 'success');
  },

  resetComplaintsDemo() {
    this.complaintsList.forEach(c => {
      if (c.targetName.includes('Mohanty')) {
        c.status = 'Escalated to Principal';
        c.facultyReply = null;
      }
    });
    // Set 2 default replies
    this.complaintsList[0].facultyReply = 'Extra lecture scheduled this Saturday 10:00 AM in Room 204.';
    this.complaintsList[1].facultyReply = 'Lab system RAM upgraded with IT Network Admin.';
    
    this.renderAdminWarningBanner();
    this.renderAdminComplaintsTable();
    this.showToast('Demo Reset', 'Reset complaints to default state (11 complaints, warning active).', 'info');
  },



  showToast(title, message, type = 'info') {
    return; // User requested no popup notifications at any time
  },

  // Mobile Drawer Navigation Controllers
  closeSidebar() {
    const sidebar = document.getElementById('admin-sidebar');
    const backdrop = document.getElementById('admin-sidebar-backdrop');
    if (sidebar) sidebar.classList.remove('open-mobile');
    if (backdrop) backdrop.classList.remove('active');
  },

  toggleSidebar() {
    const sidebar = document.getElementById('admin-sidebar');
    const backdrop = document.getElementById('admin-sidebar-backdrop');
    if (sidebar) {
      const isOpen = sidebar.classList.toggle('open-mobile');
      if (backdrop) backdrop.classList.toggle('active', isOpen);
    }
  },

  bindEvents() {
    const mobileBtn = document.getElementById('admin-mobile-menu-toggle');
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

    const searchInput = document.getElementById('admin-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        document.querySelectorAll('.admin-kpi-card, .ticket-box-item, .circular-item, .telemetry-node-card').forEach(card => {
          const txt = card.textContent.toLowerCase();
          card.style.display = txt.includes(query) ? 'flex' : 'none';
        });
      });
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  adminPortal.init();
});
