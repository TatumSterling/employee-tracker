-- Insert data into department table
INSERT INTO department (name) 
    VALUES
('Engineering'),
('Marketing'),
('Finance'),
('Human Resources'),
('Customer Support'),
('Project Management');

-- Insert data into role table
INSERT INTO role (id, title, salary, department_id) 
    VALUES
(246, 'Software Engineer', 80000, 1),
(742, 'Marketing Specialist', 60000, 2),
(399, 'Financial Analyst', 70000, 3),
(861, 'HR Manager', 75000, 4),
(935, 'CSR', 50000, 5),
(401, 'Project Manager', 85000, 6);

-- Insert data in to employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES
('John', 'Smith', 246, NULL),
('Emily', 'Johnson', 742, 1),
('Michael', 'Davis', 399, 1),
('Sarah', 'Wilson', 861, 2),
('Christopher', 'Lee', 935, 3),
('Jessica', 'Martinez', 401, 3),
('Brian', 'Turner', 246, 4),
('Amanda', 'Hall', 742, 4),
('David', 'Thompson', 399, 5),
('Rachel', 'Miller', 861, 5),
('Matthew', 'Wright', 935, 6),
('Olivia', 'Taylor', 401, 6),
('Kevin', 'White', 246, 7),
('Lauren', 'Brown', 742, 7),
('Brandon', 'Evans', 399, 8);


