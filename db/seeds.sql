USE employeetracker_db;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Steve", "Rogers", 1, NULL),("Matt", "Murdoch", 7, 1),("Tony", "Stark", 2, 1),("Bucky", "Barnes", 2, 1), ("Wanda", "Maximoff", 2, 1), ("Natasha", "Romanoff", 2, 1),
("Sam", "Wilson", 8, 6),("Franklin", "Nelson", 6, 1),("Bruce", "Banner", 3, 3),("Clint", "Barton", 8, 6), ("Steven", "Strange", 5, 5), ("Peter", "Parker", 5, 3), ("Peter", "Quill", 4, 4);

INSERT INTO role (title, salary, department_id)
VALUES ("CEO", 150000, 1),("Manager", 75000, 1), ("Lead Engineer", 100000, 3), ("Salesperson", 60000, 2), ("Engineer", 75000, 3), ("Lawyer", 75000, 5), ("Legal Team Lead", 90000, 5),("HR Representative", 80000, 6);

INSERT INTO department (department_name)
VALUES ("Administration"),("Sales"),("Engineering"),("Finance"),("Legal"), ("Human Resources");