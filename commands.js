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
    db.query(`SELECT * FROM roles;`, (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
    });
};

function viewAllEmp() {
    db.query(`SELECT * FROM employee JOIN role ON employee.role_id = role.id;`, (err, result) => {
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
            'Software Engineer': 1,
            'Marketing Specialist': 2,
            'Financial Analyst': 3,
            'Human Resources Manager': 4,
            'Customer Support Representative': 5,
            'Project Manager': 6
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
