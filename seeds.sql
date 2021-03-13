USE employeetracker_db;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, 16), ("Bob", "Doe", 2, 1), ("Jane", "Eng", 2, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 50000, 1), ("Engineer", 75000, 2);

INSERT INTO department (department_name)
VALUES ("Sales"),("Engineering"),("Finance"),("Legal");

SELECT * FROM department;

SELECT * FROM role;

SELECT * FROM employee;