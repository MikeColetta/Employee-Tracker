USE employeetracker_db;

INSERT INTO employee (first_name, last_name, role_id, dept_id, manager_id)
VALUES ("Jane", "Doe", 1, 1, NULL), ("Bob", "Robertson", 4, 2, 1), ("John", "Doe", 4, 2, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("CEO", 150000, 1),("Manager", 75000, 1), ("Lead Engineer", 100000, 3), ("Salesperson", 60000, 2), ("Engineer", 75000, 3), ("Lawyer", 75000, 5), ("Legal Team Lead", 90000, 5);

INSERT INTO department (department_name)
VALUES ("Administration"),("Sales"),("Engineering"),("Finance"),("Legal"), ("Human Resources");

SELECT * FROM department;

SELECT * FROM role;

SELECT * FROM employee;

SELECT 
        employee.id AS ID, 
        employee.first_name AS First, 
        employee.last_name AS Last, 
        role.title AS Title, 
        role.salary AS Salary, 
        department.department_name AS Department 
        FROM employee INNER JOIN role 
        ON (employee.role_id = role.id) 
        INNER JOIN department ON employee.dept_id = department.id;

SELECT CONCAT("Emp ID: ", id, " - ", first_name, " ", last_name) AS Managers FROM employee WHERE role_id=1;

SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.id, department.department_name FROM employee inner join role ON (employee.role_id = role.id) INNER JOIN department ON role.department_id = department.id;

SELECT CONCAT(role.id, " - ", role.title) AS fullRole, CONCAT(department.id, " - ", department.department_name) AS fullDept FROM role INNER JOIN department ON (role.department_id = department.id); 

SELECT CONCAT(role.id, " - ", role.title) AS fullRole,
     CONCAT(department.id, " - ", department.department_name) AS fullDept FROM role
      INNER JOIN department ON (role.department_id = department.id);

SELECT role.id, role.title, CONCAT(first_name, " ", last_name, " - ", role.title) AS fullName FROM employee FULL JOIN role ON (role_id = role.id);

SELECT role.id, role.title, CONCAT(role.id, " ", role.title) AS fullRole, CONCAT(COALESCE(employee.first_name,""), " ", COALESCE(employee.last_name,"")) AS fullName FROM role LEFT JOIN employee ON role.id = employee.role_id;


SELECT e1.id, e1.first_name, e1.last_name, e2.first_name, e2.last_name FROM employee e1 LEFT JOIN employee e2 ON (e1.manager_id = e2.id);

SELECT role.id AS Employee_ID, title AS Title, salary AS Salary, department_id AS Department_ID, department_name AS Department FROM role INNER JOIN department ON (employee.department_id = department.id);