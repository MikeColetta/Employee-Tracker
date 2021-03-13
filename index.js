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
          type: 'checkbox',
          message: 'What would you like to do?',
          choices: ['View All Employees', 'View All Employees By Department', 'View All Employees By Manager', 'Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Employee Manager', 'View All Roles', ]
      }).then((answer) => {
          switch (answer.startmenu) {
              case 'View All Employees':
                  viewAllEmp();
                  break;
              case 'View All Employees By Department':
                  viewAllEmpDept();
                  break;
              case 'View All Employees By Manager':
                  viewAllEmpMan();
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