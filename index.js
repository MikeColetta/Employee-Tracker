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
                'View All Managers',
                'Add Employee',
                'Remove Employee',
                'Add Role',
                'Remove Role',
                'Add Department',
                'Remove Department',
                'Update Employee Role',
                'Add Manager',
                'Remove Manager',
                'Update Employee Manager',
                'View All Roles'
            ]
        }).then((answer) => {
            switch (answer.startmenu) {
                case 'View All Employees':
                    viewAllEmp();
                    break;
                case 'View All Departments':
                    viewAllDepts();
                    break;
                case 'View All Managers':
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
                case 'Update Employee Role':
                    updateEmpRole();
                    break;
                case 'Update Employee Manager':
                    updateEmpMan();
                    break;
                case 'View All Roles':
                    viewAllRoles();
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
            choices:[]
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
                manager_id:answers.manager
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
     connection.query("SELECT * FROM employee", (err, res) => {
         if (err) throw err;
    
    inquirer
    .prompt([
        {
        name: 'delEmp',
        type: 'rawlist',
        choices(){
            const choiceArray = [];
            res.forEach(({ id }) => {                
                choiceArray.push(id)
            });
            return choiceArray;
        },
        message: 'Select the id of the employee you would you like to remove?',
    },
    ])
    .then(answer.delEmp)

    console.log('Deleting employee...\n');
    connection.query(
      'DELETE FROM employee WHERE ?',
      {
        id: answer.delEmp,
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
}
const addRole = () => {
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
            type: 'input',
            message: 'What is their department ID?',
        }
    ]).then((answers) => {
        let title = answers.title;
        let salary = answers.salary;
        let department = answers.department;
        connection.query(
            'INSERT INTO role SET ?',
            {
                title: title,
                salary: salary,
                department_id: department,
            },
            (err, res) => {
                if (err) throw err;
                console.log(`Role added!\n`);
                init();
            }
        )

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