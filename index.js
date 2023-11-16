const inquirer = require('inquirer');
const mysql = require('mysql2');
const PORT = 3001;
const db = require('./config/connection');
const {viewAllDept, viewAllRoles, viewAllEmp, addDept, addRole, addEmp, updateEmp} = require('./commands')
require('dotenv').config();


function init() {
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
                    "update an employee role",
                    "exit"  
                ]
            }
        ])
        .then( async(answers) => {
            const { command } = answers;

            if (command === "view all departments") {
                viewAllDept();

            } else if (command === "view all roles") {
                viewAllRoles();

            } else if (command === "view all employees") {
                viewAllEmp();

            } else if (command === "add a department") {
                addDept();

            } else if (command === "add a role") {
                addRole();

            } else if (command === "add an employee") {
                 addEmp();
            } else if (command === "update an employee role") {
                 updateEmp();

            } else if (command === "exit") {
                console.log("Exiting program...");
                process.exit();

            } 
        })
};



    
        

init();
