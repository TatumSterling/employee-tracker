DROP DATABASE IF EXISTS management_db;
CREATE DATABASE management_db;

USE management_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL NOT NULL,
    department_id INT, 
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL,
    PRIMARY KEY(id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    FOREIGN KEY(role_id)
    REFERENCES role(id)
    ON DELETE SET NULL,
    PRIMARY KEY (id)
);




-- view all departments
SELECT * FROM department;
-- view all roles
SELECT * FROM roles;
-- view all employees TODO need to join role table
SELECT * FROM employee;
-- add a department
INSERT INTO department(name)
VALUES(department_name);
-- add a role
INSERT INTO roles(name, salary, department_id)
VALUES 
    (name, salary, department_id)
    (name, salary, department_id);
-- add an employee
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
    (first_name, last_name, role_id, manager_id);
--update employee
UPDATE employee
WHERE ()



