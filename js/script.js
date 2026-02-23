// create an array of employees
let employees = [
    { id: 00000001, name: 'Braydon Johnston', extension: 1234, email: 'bjohnston@company.com', department: 'Administrative' },
    { id: 00000002, name: 'Enzo Weiss', extension: 2345, email: 'eweiss@company.com', department: 'Engineering' },
    { id: 00000003, name: 'Caleb Dickson', extension: 3456, email: 'cdickson@company.com', department: 'Marketing' },
    { id: 00000004, name: 'Adam Mac', extension: 4567, email: 'amac@company.com', department: 'Sales' },
    { id: 00000005, name: 'Dariel Gu', extension: 5678, email: 'dgu@company.com', department: 'Executive' }
];

// check to see if storage object exists when the page loads
// if does, return storage object into array instead of populated array
if (localStorage.getItem('employees')) {
    employees = JSON.parse(localStorage.getItem('employees'));
}

// get dom elements
const form = document.getElementById('addForm');
const empTable = document.getElementById('empTable');
const tbody = empTable.querySelector('tbody');
const empCount = document.getElementById('empCount');

// build the employees table when the page loads
buildGrid();

// add employee
function addEmployee(employees) {
    const id = parseInt(document.getElementById('id').value, 10);
    const name = document.getElementById('name').value;
    const extension = parseInt(document.getElementById('extension').value, 10);
    const email = document.getElementById('email').value;
    const department = document.getElementById('department').value;

    const newEmployee = { id, name, extension, email, department };
    employees.push(newEmployee);
    buildGrid();
    form.reset();
    document.getElementById('id').focus();
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addEmployee(employees);
});

// delete employee
function removeEmployee(employees, rowIndex) {
    employees.splice(rowIndex, 1);
    buildGrid();
}

empTable.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        if (confirm('Are you sure you want to delete this employee?')) {
            const tr = e.target.parentNode.parentNode;
            const rowIndex = tr.sectionRowIndex;
            removeEmployee(employees, rowIndex);
        }
    }
});

// build the employees grid
function buildGrid() {
    // remove the existing set of rows by removing the entire tbody section
    tbody.innerHTML = '';

    // rebuild the tbody from scratch
    // loop through the array of employees
    // rebuilding the row structure
    for (const employee of employees) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${employee.id}</td>
            <td>${employee.name}</td>
            <td>${employee.extension}</td>
            <td>${employee.email}</td>
            <td>${employee.department}</td>
            <td><button class="btn btn-danger btn-sm delete">Delete</button></td>
        `;
        tbody.appendChild(tr);
    }

    // update employee count
    empCount.textContent = `(${employees.length})`;

    // store the array in storage
    localStorage.setItem('employees', JSON.stringify(employees));
}
