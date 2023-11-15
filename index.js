const inquirer = require('inquirer');
const mysql = require('mysql2');
const PORT = 3001
const db = require('./config/connection');


inquirer
    .prompt([
        {
            type: "list", 
            message: "Please select a command.",
            name: "command",
            choices: [
                "view all departments",
                "view all roles",
                "view all employees",
                "add a department",
                "add a role",
                "add an employee",
                "update an employee role"
            ]

        }
    ]).then((answers) => {
        const { command } = answers;

        if (command === "view all departments") {
            viewAllDept();
        }   
        if (command === "view all roles") {
            viewAllRoles();
        }
        if (command === "view all employees") {
            viewAllEmp();
        }
        if (command === "add a department") {
            addDept();
        }
        if (command === "add a role") {
            addRole();
        }
        if (command === "add an employee") {
            addEmp();
        }
        if (command === "update an employee role") {
            // Call the function to update an employee's role
        }
    });