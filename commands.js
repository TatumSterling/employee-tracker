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
    db.query(`SELECT * FROM roles`, (err, result) => {
        if (err){
            console.log(err)
        }
        console.log(result)
    });
};

function viewAllEmp() {
    db.query(`SELECT * FROM employee JOIN role ON employee.role_id = role.id`, (err, result) => {
        if (err){
            console.log(err)
        }
        console.log(result)
    })
}