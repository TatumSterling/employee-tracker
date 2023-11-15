const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = require('./config/connection');

function viewAllDept() {
    db.query(`SELECT * FROM department;`, (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
    });
};

function viewAllRoles() {
    db.query(`SELECT * FROM role;`, (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
    });
};

function viewAllEmp() {
    db.query(`SELECT employee.id AS employee_id, 
    employee.first_name, 
    employee.last_name, 
    employee.role_id, 
    employee.manager_id,
    role.id AS role_id, 
    role.title, 
    role.salary, 
    role.department_id
FROM employee
JOIN role ON employee.role_id = role.id`, (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
    });
};

function addDept() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newDept',
            message: 'please enter the name of the new department',
        }
    ]).then((res) => {
        const newDept = res.newDept;

        db.query(`INSERT INTO department(name) VALUES(?);`, newDept, (err, result) => {
            if (err) {
                console.log(err)
            }
            console.log(result)
        });

    });

};

function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newRoleName',
            message: 'please enter the name of the new role'
        },
        {
            type: 'input',
            name: 'newRoleSalary',
            message: 'what is the salary of this new role?'
        },
        {
            type: 'list',
            name: 'newRoleDept',
            message: 'which department does this role belong to?',
            choices: [
                'Engineering',
                'Marketing',
                'Finance',
                'Human Resources',
                'Customer Support',
                'Project Management'
            ]
        }
    ]).then((res) => {
        const { newRoleName, newRoleSalary, newRoleDept } = res;

        // Get the department_id based on the selected department name
        const departmentIdMap = {
            'Engineering': 1,
            'Marketing': 2,
            'Finance': 3,
            'Human Resources': 4,
            'Customer Support': 5,
            'Project Management': 6
        };

        const newRoleDeptId = departmentIdMap[newRoleDept];

        // Construct the SQL query
        const sqlQuery = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;

        // Execute the query with the user's input
        db.query(sqlQuery, [newRoleName, newRoleSalary, newRoleDeptId], (err, result) => {
            if (err) throw err;
            console.log(`New role '${newRoleName}' added successfully!`);
        });
    });
};

function addEmp() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newFirstName',
            message: 'what is the first name of the new employee'
        },
        {
            type: 'input',
            name: 'newLastName',
            message: 'what is the last name of the new employee'
        },
        {
            type: 'list',
            name: 'newEmpRole',
            message: 'what is employee role title?',
            choices: [
                'Software Engineer',
                'Marketing Specialist',
                'Financial Analyst',
                'Human Resources Manager',
                'Customer Support Representative',
                'Project Manager'
            ]
        },
        {
            type: 'list',
            name: 'newEmpManager',
            message: 'select employees manager number',
            choices: [
                1, 2, 3, 4, 5, 6, 7, 8
            ]
        }
    ]).then((answers) => {
        const { newFirstName, newLastName, newEmpRole, newEmpManager } = answers;

        // Get the role_id based on the selected role title
        const roleIdMap = {
            'Software Engineer': 246,
            'Marketing Specialist': 742,
            'Financial Analyst': 399,
            'HR Manager': 861,
            'CSR': 935,
            'Project Manager': 401
        };

        const newEmpRoleId = roleIdMap[newEmpRole];

        // Construct the SQL query
        const sqlQuery = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;

        // Execute the query with the user's input
        db.query(sqlQuery, [newFirstName, newLastName, newEmpRoleId, newEmpManager], (err, result) => {
            if (err) throw err;
            console.log(`New employee '${newFirstName} ${newLastName}' added successfully!`);
        });
    });
};

function updateEmp() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'empName',
            message: 'which employee would you like to update?',
            choices: [
                'John Smith',
                'Emily Johnson',
                'Michael Davis',
                'Sarah Wilson',
                'Christopher Lee',
                'Jessica Martinez',
                'Brian Turner',
                'Amanda Hall',
                'David Thompson',
                'Rachel Miller',
                'Matthew Wright',
                'Olivia Taylor',
                'Kevin White',
                'Lauren Brown',
                'Brandon Evans'
            ]
        },
        {
            type: 'list',
            name: 'newRole',
            message: 'Select the new role for the employee:',
            choices: ['Software Engineer', 'Marketing Specialist', 'Financial Analyst', 'HR Manager', 'CSR', 'Project Manager']
        }
    ]).then((answers) => {
        // Assume you have a function to get the employee ID based on the name
        getEmployeeIdByName(answers.empName, (err, empId) => {
            if (err) {
                console.error(err);
                return;
            }

            // Assume you have a function to get the role ID based on the title
            getRoleIdByTitle(answers.newRole, (err, roleId) => {
                if (err) {
                    console.error(err);
                    return;
                }

                // Update the database with the new role for the selected employee
                db.query(
                    'UPDATE employee SET role_id = ? WHERE id = ?',
                    [roleId, empId],
                    (err, result) => {
                        if (err) {
                            console.error(err);
                        } else {
                            console.log(`Successfully updated ${answers.empName}'s role to ${answers.newRole}.`);
                        }
                    }
                );
            });
        });
    });
}

function getEmployeeIdByName(empName, callback) {
    const [firstName, lastName] = empName.split(' ');

    const sqlQuery = 'SELECT id FROM employee WHERE first_name = ? AND last_name = ?';

    db.query(sqlQuery, [firstName, lastName], (err, result) => {
        if (err) {
            console.error(err);
            callback(err, null);
        } else {
            const empId = result[0] ? result[0].id : null;
            callback(null, empId);
        }
    });
}


function getRoleIdByTitle(roleTitle, callback) {
    const sqlQuery = 'SELECT id FROM role WHERE title = ?';

    db.query(sqlQuery, [roleTitle], (err, result) => {
        if (err) {
            console.error(err);
            callback(err, null);
        } else {
            const roleId = result[0] ? result[0].id : null;
            callback(null, roleId);
        }
    });
}

    module.exports = { viewAllDept, viewAllRoles, viewAllEmp, addDept, addRole, addEmp, updateEmp }