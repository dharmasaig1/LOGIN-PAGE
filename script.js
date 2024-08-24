document.addEventListener("DOMContentLoaded", function () {
    const users = [
        { username: "admin", password: "admin", role: "admin" },
        { username: "teacher", password: "teacher", role: "teacher" },
        { username: "student", password: "student", role: "student" },
    ];

    const Students = [
        { rollNumber: "S001", name: "Student 1" },
        { rollNumber: "S002", name: "Student 2" },
        { rollNumber: "S003", name: "Student 3" },
    ];

    const attendanceRecord = {};

    const loginForm = document.getElementById("login-form");
    const adminPanel = document.getElementById("admin-panel");
    const teacherPanel = document.getElementById("teacher-panel");
    const studentPanel = document.getElementById("student-panel");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const user = users.find(u => u.username === username && u.password === password);

        if (!user) {
            alert("Invalid credentials. Please try again.");
            return;
        }

        switch (user.role) {
            case "admin":
                showAdminPanel();
                break;
            case "teacher":
                showTeacherPanel();
                break;
            case "student":
                showStudentPanel();
                break;
            default:
                break;
        }
    });

    function showAdminPanel() {
        loginForm.style.display = "none";
        adminPanel.style.display = "block";
    }

    function showTeacherPanel() {
        loginForm.style.display = "none";
        teacherPanel.style.display = "block";
    }

    function showStudentPanel() {
        loginForm.style.display = "none";
        studentPanel.style.display = "block";
    }

    // Admin functionality (Adding/Removing Students)

    const adminAddButton = document.getElementById("admin-add");
    const adminRemoveButton = document.getElementById("admin-remove");
    const adminStudentList = document.getElementById("admin-student-list");

    adminAddButton.addEventListener("click", function () {
        // When the "Add Student" button is clicked, show a form to add a new student.
    const studentName = prompt("Enter the name of the new student:");
    
    if (studentName) {
        // Generate a unique roll number for the new student (you can use a more robust approach).
        const rollNumber = "S" + (Students.length + 1).toString().padStart(3, "0");
        
        // Add the new student to the Students array.
        Students.push({ rollNumber, name: studentName });
        
        // Update the student list in the admin panel (you need to create an element to display this list).
        updateAdminStudentList();

        // Optionally, you can store the updated Students array in local storage or a server.
    }
    });

    adminRemoveButton.addEventListener("click", function () {
        // When the "Remove Student" button is clicked, ask for the roll number of the student to be removed.
    const rollNumber = prompt("Enter the roll number of the student to remove:");

    if (rollNumber) {
        // Find the index of the student with the given roll number.
        const studentIndex = Students.findIndex(student => student.rollNumber === rollNumber);

        if (studentIndex !== -1) {
            // Remove the student from the Students array.
            Students.splice(studentIndex, 1);

            // Update the student list in the admin panel (you need to create an element to display this list).
            updateAdminStudentList();

            // Optionally, we can store the updated Students array in local storage or a server.
        } else {
            alert("Student not found. Please enter a valid roll number.");
        }
    }
    });

    // Teacher functionality (Marking Attendance)

    const teacherMarkAttendanceForm = document.getElementById("teacher-mark-attendance-form");

    teacherMarkAttendanceForm.addEventListener("submit", function (event) {
        event.preventDefault();
       // Logic to mark attendance for selected students.
    const selectedStudents = Array.from(teacherMarkAttendanceForm.elements)
    .filter(element => element.type === "checkbox" && element.checked)
    .map(checkbox => checkbox.getAttribute("data-student-roll"));
    selectedStudents.forEach(rollNumber => {
        attendanceRecord[rollNumber] = (attendanceRecord[rollNumber] || 0) + 1;
    });
});

    // Student functionality (Checking Attendance Percentage)


    const studentCheckAttendanceButton = document.getElementById("student-check-attendance");
    const studentAttendancePercentage = document.getElementById("student-attendance-percentage");

    studentCheckAttendanceButton.addEventListener("click", function () {
        // Logic to calculate and display attendance percentage.
    const studentRollNumber = prompt("Enter your roll number:");
    
    const student = Students.find(s => s.rollNumber === studentRollNumber);
    
    if (student) {
        const totalClasses = Object.keys(attendanceRecord).length;
        const attendedClasses = attendanceRecord[studentRollNumber] || 0;
        const attendancePercentage = (attendedClasses / totalClasses) * 100;
        
        studentAttendancePercentage.textContent = `Attendance Percentage: ${attendancePercentage.toFixed(2)}%`;
    } else {
        alert("Student not found. Please enter a valid roll number.");
    }
    });
});



