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
INSERT INTO role (title, salary, department_id) 
    VALUES
('Software Engineer', 80000, 1),
('Marketing Specialist', 60000, 2),
('Financial Analyst', 70000, 3),
('Human Resources Manager', 75000, 4),
('Customer Support Representative', 50000, 5),
('Project Manager', 85000, 6);


INSERT INTO employee (first_name, last_name, role_id, manager_id) 
    VALUES
('John', 'Smith', 1, NULL),
('Emily', 'Johnson', 2, 1),
('Michael', 'Davis', 3, 1),
('Sarah', 'Wilson', 4, 2),
('Christopher', 'Lee', 5, 3),
('Jessica', 'Martinez', 6, 3),
('Brian', 'Turner', 7, 4),
('Amanda', 'Hall', 8, 4),
('David', 'Thompson', 9, 5),
('Rachel', 'Miller', 10, 5),
('Matthew', 'Wright', 11, 6),
('Olivia', 'Taylor', 12, 6),
('Kevin', 'White', 13, 7),
('Lauren', 'Brown', 14, 7),
('Brandon', 'Evans', 15, 8);

