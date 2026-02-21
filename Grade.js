const form = document.getElementById('studentForm');
const tableBody = document.querySelector('#studentTable tbody');

let students = [];

students = JSON.parse(localStorage.getItem('students')) || [];
displayStudents();

form.addEventListener('submit', function( e) {
    e.preventDefault()// prevent the form from resubmitting/ refresh

    // get values from the input fields
    const name = document.getElementById('name').value;
    const regNo = document.getElementById('regno').value;
    const cat1 = parseFloat(document.getElementById('cat1').value);
    const cat2 = parseFloat(document.getElementById('cat2').value);
    const exam = parseFloat(document.getElementById('exam').value);

    if(cat1 > 30 || cat2 > 30 || exam > 70 || cat1 < 0 || cat2 < 0 || exam < 0) return alert('Invalid marks');

    // check for duplicate registration number
    const isDuplicate = students.some(s => s.regNo === regNo);
    if (isDuplicate) {
        return alert(`Error: A student with this Registration Number already exists!`);
    }

    const averageCat = (cat1 + cat2) / 2;
    const finalmark = averageCat + exam;


    // grade logic
    let grade = '';
    if(finalmark >= 70) grade = 'A';
    else if(finalmark >= 60) grade = 'B';
    else if(finalmark >= 50) grade = 'C';
    else if(finalmark >= 40) grade = 'D';
    else grade = 'Fail';

    // create student object
    const student = {
        name,
        regNo,
        cat1,
        cat2,
        exam,
        averageCat,
        finalmark,
        grade,
    }

    // push the student to the array
    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));

    displayStudents();
    form.reset();

});

// function to display students in the table
function displayStudents() {
tableBody.innerHTML = ''; // initially the tbody is empty
// loop through students array
students.forEach((student, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.regNo}</td>
        <td>${student.cat1}</td>
        <td>${student.cat2}</td>
        <td>${student.exam}</td>
        <td>${student.averageCat.toFixed(2)}</td>
        <td>${student.finalmark.toFixed(2)}</td>
        <td>${student.grade}</td>
        <td>
            <button onclick="editStudent(${index})">Edit</button>
            <button onclick="deleteStudent(${index})">Delete</button>
        </td>

    `;
    tableBody.appendChild(row);
})

}

//function to delete a student
function deleteStudent(index) {
    if (confirm("Are you sure you want to delete this record?")) {
        students.splice(index, 1);
        localStorage.setItem(`students`, JSON.stringify(students));
        displayStudents();
    }
}

//function to edit student marks
function editStudent(index) {
    const s = students[index];
    document.getElementById(`name`).value = s.name;
    document.getElementById(`regno`).value = s.regNo;
    document.getElementById(`cat1`).value = s.cat1;
    document.getElementById(`cat2`).value = s.cat2;
    document.getElementById(`exam`).value = s.exam;
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    displayStudents();
}