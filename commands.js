const inquirer = require('inquirer');
const mysql  = require('mysql2');
const db = require('./config/connection');

function viewAllDept() {
    db.query(`SELECT * FROM department;`, (err, result) => {
        if (err){
            console.log(err)
        }
        console.log(result)
    });
};

function viewAllRoles() {
    db.query(`SELECT * FROM roles;`, (err, result) => {
        if (err){
            console.log(err)
        }
        console.log(result)
    });
};

function viewAllEmp() {
    db.query(`SELECT * FROM employee JOIN role ON employee.role_id = role.id;`, (err, result) => {
        if (err){
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
        const newDept = res.json();

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
        const newRole = res.json()

        db.query(``)
    })
}