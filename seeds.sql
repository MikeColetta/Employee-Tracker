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

SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.id, department.department_name FROM employee inner join role ON (employee.role_id = role.id) INNER JOIN department ON role.department_id = department.id;

SELECT CONCAT(role.id, " - ", role.title) AS fullRole, CONCAT(department.id, " - ", department.department_name) AS fullDept FROM role INNER JOIN department ON (role.department_id = department.id); 