const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');

//mysql connection
const connection = mysql.createConnection({
    host: 'localhost',

    port: 3306,

    user: 'root',

    password: 'password#1',
    database: 'employeeTracker_DB'
});

//init function

const init = () => {
    inquirer
        .prompt({
            name: 'startmenu',
            type: 'rawlist',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'View All Departments',
                'View All Roles',
                'Add Employee',
                'Update Employee Role',
                'Remove Employee',
                'Add Role',
                'Remove Role',
                'Add Department',
                'Remove Department',
                'Exit'
            ]
        }).then((answer) => {
            switch (answer.startmenu) {
                case 'View All Employees':
                    viewAllEmp();
                    break;
                case 'View All Departments':
                    viewAllDepts();
                    break;
                case 'View All Roles':
                    viewAllRoles();
                    break;
                case 'Add Employee':
                    addEmp();
                    break;
                case 'Update Employee Role':
                    updEmpRole();
                    break;
                case 'Remove Employee':
                    remEmp();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'Remove Role':
                    remRole();
                    break;
                case 'Add Department':
                    addDept();
                    break;
                case 'Remove Department':
                    remDept();
                    break;
                case 'Exit':
                    connection.end();
                    break;
            }
        })
};



const viewAllEmp = () => {
    connection.query(
        `SELECT 
        employee.id AS ID, 
        employee.first_name AS First, 
        employee.last_name AS Last, 
        role.title AS Title, 
        role.salary AS Salary, 
        department.department_name AS Department 
        FROM employee INNER JOIN role 
        ON (employee.role_id = role.id) 
        INNER JOIN department ON role.department_id = department.id`,
     (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
};

const viewAllDepts = () => {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });

};

const viewAllRoles = () => {
    connection.query('SELECT * FROM role INNER JOIN department ON (role.department_id = department.id)', (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
};

const addEmp = async () => {
    let getRole = await getRoleQuery();
    let getDept = await getDeptQuery();

    inquirer
        .prompt([
            {
                name: 'firstName',
                type: 'input',
                message: "What is the new employee's first name?"
            },
            {
                name: 'lastName',
                type: 'input',
                message: 'What is their last name?'
            },
            {
                name: 'role',
                type: 'list',
                message: 'What is their role?',
                choices: getRole
            },
            {
                name: 'department',
                type: 'list',
                message: 'What department are they in?',
                choices: getDept
            }
        ]).then((answer) => {
            let roleArr = answer.role.split(" ")
            let deptArr = answer.department.split(" ")
            connection.query(

                'INSERT INTO employee SET ?',
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: roleArr[2],
                    manager_id: deptArr[0],
                },
                (err, res) => {
                    if (err) throw err;
                    console.log(`Employee added!\n`);
                    init();
                }
            )

        })
};

const updEmpRole = async () => {
    let empQuery = await getEmpQuery();
    let rolQuery = await getRoleQuery();

    inquirer
        .prompt([
            {
                name: 'empToUpdate',
                type: 'rawlist',
                choices: empQuery,
                message: 'Which employee you would you like to update?',
            },
            {
                name: 'roleToAdd',
                type: 'rawlist',
                choices: rolQuery,
                message: 'Please select a new role for the employee.',
            }
        ])
        .then((answer) => {
            nameArray = answer.empToUpdate.split(" ")
            console.log(nameArray[2]);
            roleArray = answer.roleToAdd.split(" ")
            console.log(roleArray[1]);

            console.log('Updating employee role...\n');
            connection.query(
                'UPDATE employee SET ? WHERE ?',
                [
                    {
                        role_id: roleArray[2]
                    },
                    {
                        id: nameArray[1]
                    }
                ],
                (err, res) => {
                    if (err) {
                        console.log('Employee not in database!')
                        init();
                    };
                    console.log(`Employee role updated!\n`);
                    init();
                }
            )
        })
};

const remEmp = () => {
    connection.query('SELECT CONCAT(first_name, " ", last_name, " - Employee ID: ", id) AS fullName FROM employee', (err, res) => {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: 'delEmp',
                    type: 'rawlist',
                    choices() {
                        const choiceArray = [];
                        res.forEach(({ fullName }) => {
                            choiceArray.push(fullName)
                        });
                        return choiceArray;
                    },
                    message: 'Select the ID of the employee you would you like to remove?',
                },
            ])
            .then((answer) => {
                nameArray = answer.delEmp.split(" ")
                console.log('Deleting employee...\n');
                connection.query(
                    'DELETE FROM employee WHERE ?',
                    {
                        id: nameArray[5],
                    },
                    (err, res) => {
                        if (err) {
                            console.log('Employee not in database!')
                            init();
                        };
                        console.log(`Employee deleted!\n`);
                        init();
                    }
                )
            })
    })
};

const addRole = () => {
    connection.query('SELECT CONCAT(id, " - ", department_name) AS fullDept FROM department', (err, res) => {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: 'title',
                    type: 'input',
                    message: "What is the title of the new role?"
                },
                {
                    name: 'salary',
                    type: 'input',
                    message: 'What is their salary?'
                },
                {
                    name: 'department',
                    type: 'rawlist',
                    message: 'What department is this role in?',
                    choices() {
                        const deptChoice = [];
                        res.forEach(({ fullDept }) => {
                            deptChoice.push(fullDept)
                        });

                        return deptChoice;
                    },
                }
            ]).then((answer) => {
                let deptAnswer = answer.department.slice(0, 1)
                connection.query(
                    'INSERT INTO role SET ?',
                    {
                        title: answer.title,
                        salary: answer.salary,
                        department_id: deptAnswer,
                    },
                    (err, res) => {
                        if (err) throw err;
                        console.log(`Role added!\n`);
                        init();
                    }
                )
            })

    })
};

const remRole = () => {
    connection.query('SELECT CONCAT(id, " - ", title) AS fullRole FROM role', (err, res) => {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: 'role',
                    type: 'rawlist',
                    message: 'Which role would you like to remove?',
                    choices() {
                        const roleChoice = [];
                        res.forEach(({ fullRole }) => {
                            roleChoice.push(fullRole)
                        });
                        return roleChoice;
                    },
                }
            ]).then((answer) => {
                let roleAnswer = answer.role.slice(0, 1)
                connection.query(
                    'DELETE FROM role WHERE ?',
                    {
                        id: roleAnswer,
                    },
                    (err, res) => {
                        if (err) throw err;
                        console.log(`Role deleted!\n`);
                        init();
                    }
                )
            })
    })
};

const addDept = () => {
    inquirer
        .prompt([
            {
                name: 'departmentName',
                type: 'input',
                message: "What is the title of the new department?"
            }
        ]).then((answers) => {
            let department = answers.departmentName;
            connection.query(
                'INSERT INTO department SET ?',
                {
                    department_name: department
                },
                (err, res) => {
                    if (err) throw err;
                    console.log(`Department added!\n`);
                    init();
                }
            )

        })
};

const remDept = () => {
    connection.query('SELECT CONCAT(id, " - ", department_name) AS fullDept FROM department', (err, res) => {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: 'department',
                    type: 'rawlist',
                    message: 'Which department would you like to remove?',
                    choices() {
                        const deptChoice = [];
                        res.forEach(({ fullDept }) => {
                            deptChoice.push(fullDept)
                        });
                        return deptChoice;
                    },
                }
            ]).then((answer) => {
                let deptAnswer = answer.department.slice(0, 1)
                connection.query(
                    'DELETE FROM department WHERE ?',
                    {
                        id: deptAnswer,
                    },
                    (err, res) => {
                        if (err) throw err;
                        console.log(`Department deleted!\n`);
                        init();
                    }
                )
            })
    })
};

const getEmpQuery = () => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT CONCAT("ID: ", employee.id, " - ", first_name, " ", last_name, " - ", role.title) 
        AS fullName FROM role RIGHT JOIN employee ON role.id = employee.role_id`,
            (err, res) => {
                if (err) reject(err);
                let empArr = [];
                res.forEach(employee => {
                    empArr.push(employee.fullName)
                })
                // console.log(empArr)
                resolve(empArr)
            });
    })

};

const getRoleQuery = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT CONCAT("Role ID: ", id, " - ", title) AS fullRole FROM role', (err, res) => {
            if (err) reject(err);
            let rolArr = [];
            res.forEach(role => {
                rolArr.push(role.fullRole)
            })
            // console.log(rolArr)
            resolve(rolArr)
        });
    })
};

const getDeptQuery = () => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT CONCAT(department.id, " - ", department.department_name) AS Department FROM
         department`, (err, res) => {
            if (err) reject(err);
            let deptArr = [];
            res.forEach(dept => {
                deptArr.push(dept.Department)
            })
            resolve(deptArr)
        })
    })
};

// getDeptQuery();

init();