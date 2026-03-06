const form = document.getElementById('studentForm');
const tableBody = document.querySelector('#studentTable tbody');
const nameInput = document.getElementById('name');
const nameCounter = document.getElementById('nameCounter');

nameInput.addEventListener('input', function () {
    nameCounter.textContent = nameInput.value.length + ' / 50';
});

let students = [];

students = JSON.parse(localStorage.getItem('students')) || [];
displayStudents();

form.addEventListener('submit', function (e) {
    e.preventDefault();

    //getting values from the form
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const course = document.getElementById('course').value.trim();

    if (name && email && course) {
        //check for duplicate email
        const isDuplicate = students.some(s => s.email === email);
        if (isDuplicate) {
            alert('Email already exists!');
            return;
        }

        const student = { name, email, course };

        //push the student into the array
        students.push(student);
        localStorage.setItem('students', JSON.stringify(students));

        displayStudents();
        form.reset();
        showSuccessModal();
    }
});

//show the registration success modal
function showSuccessModal() {
    document.getElementById('successModal').style.display = 'flex';
}

//close the registration success modal
function closeSuccessModal() {
    document.getElementById('successModal').style.display = 'none';
}

//function to display students in the table
function displayStudents() {
    tableBody.innerHTML = '';
    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.course}</td>
            <td>
                <button onclick="editStudent(${index})">Edit</button>
                <button onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

//function to delete students from the table
function deleteStudent(index) {
    if (confirm('Are you sure you want to delete this student?')) {
        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));
        displayStudents();
    }
}

//function to edit student records
function editStudent(index) {
    const s = students[index];
    document.getElementById('name').value = s.name;
    document.getElementById('email').value = s.email;
    document.getElementById('course').value = s.course;
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    displayStudents();
}
