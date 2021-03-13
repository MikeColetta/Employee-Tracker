const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');
const { restoreDefaultPrompts } = require('inquirer');

//mysql connection
const connection = mysql.createConnection({
    host: 'localhost',

    port: 3306,

    user: 'root',

    password: 'Charizard88!',
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
                'Remove Employee',
                'Add Role',
                'Remove Role',
                'Add Department',
                'Remove Department',
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
            }
        })
}

init();

const viewAllEmp = () => {
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
}
const viewAllDepts = () => {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });

}
const viewAllRoles = () => {
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
}

const addEmp = () => {
    inquirer.prompt([
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
            choices: []
        }
    ]).then((answers) => {
        let firstName = answers.firstName;
        let lastName = answers.lastName;
        let role = answers.role;
        connection.query(
            'INSERT INTO employee SET ?',
            {
                first_name: answers.firstName,
                last_name: answers.lastName,
                role_id: answers.role,
                manager_id: answers.manager
            },
            (err, res) => {
                if (err) throw err;
                console.log(`${response.itemName} Item added to auction!\n`);
                init();
            }
        )

    })

}
const remEmp = () => {
    connection.query('SELECT CONCAT(first_name, " ", last_name) AS fullName FROM employee', (err, res) => {
        if (err) throw err;
        console.log(res)
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
                console.log(answer)
                nameArray = answer.delEmp.split(" ")
                console.log(nameArray)
                console.log('Deleting employee...\n');
                connection.query(
                    'DELETE FROM employee WHERE ?',
                    {
                        first_name: nameArray[0],
                        last_name: nameArray[1]
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
}
const addRole = () => {
    connection.query('SELECT CONCAT(id, " - ", department_name) AS fullDept FROM department', (err, res) => {
        if (err) throw err;

        inquirer.prompt([
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
                    console.log(deptChoice)
                    return deptChoice;
                },
            }
        ]).then((answer) => {
            let deptAnswer = answer.department.slice(0,1)
            console.log(deptAnswer)
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
}

const remRole = () => {

    }

    const addDept = () => {
        inquirer.prompt([
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
    }

    const remDept = () => {

    }

    const updateEmpRole = () => {

    }
    const updateEmpMan = () => {

    }
// const viewAllRoles = () => {

// }