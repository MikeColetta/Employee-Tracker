const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');

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
                'View All Employees By Department',
                'View All Employees By Manager',
                'Add Employee',
                'Remove Employee',
                'Update Employee Role',
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
                case 'View All Manager':
                    viewAllRoles();
                    break;
                case 'Add Employee':
                    addEmp();
                    break;
                case 'Remove Employee':
                    remEmp();
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
    connection.query('SELECT * FROM employees', (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
}
const viewAllDepts = () => {
    connection.query('SELECT * FROM departments', (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });

}
const viewAllRoles = () => {
    connection.query('SELECT * FROM roles', (err, res) => {
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
            choices:
        }
    ])

}
// const remEmp = (answer) => {
//     connection.query("SELECT concat(first_name,' ', last_name) as fullName FROM employees", (err, res) => {
//         if (err) throw err;
//         let empList = [];
//         res.forEach(element.fullName);
//     })
//     inquirer
//     .prompt({
//         name: 'delEmp',
//         type: 'rawlist',
//         message: 'Which employee would you like to remove?',
//         choices: empList         
//     })
//     .then(answer.delEmp)

//     console.log('Deleting employee...\n');
//     connection.query(
//       'DELETE FROM songs WHERE ?',
//       {
//         first_name: answer.delEmp,
//       },
//       (err, res) => {
//         if (err) {
//             console.log('Employee not in database!')
//             init();
//         };
//         console.log(`${res} employee deleted!\n`);
//         init();
//       }
//     )
// }
const updateEmpRole = () => {

}
const updateEmpMan = () => {

}
// const viewAllRoles = () => {

// }