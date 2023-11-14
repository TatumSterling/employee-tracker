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
                "update and employee role"
            ]

        }
    ]).then((answers) => {
        const {choices} = answers;

        if (choices === "view all departments") {

        }
        if (choices === "view all roles") {
            
        }view
        if (choices === "view all employees") {
            
        }
        if (choices === "add a department") {
            
        }
        if (choices === "add a role") {
            
        }
        if (choices === "add an employee") {
            
        }
        if (choices === "update and employee role") {

        }
    }
    )