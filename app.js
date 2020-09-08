const mysql = require("mysql");
const inquirer = require("inquirer");


const method = require("./assets/js/methods.js") 

const userChoice = [
  "View All Departments",
  "View All Roles",
  "View All Employees",
  "Add Department",
  "Add Role",
  "Add Employee",
  "Update Employee Role",
  "Exit Program",
];

const connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "Xd23seJ4!",
  database: "employee_tracker",
});

connection.connect(function (err) {
  if (err) throw err;
  promptUser();
});

promptUser = () => {
  inquirer
    .prompt({
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: userChoice,
    })
    .then((answer) => {
      switch (answer.choice) {
        case userChoice[0]:
          method.viewDept();
          break;

        case userChoice[1]:
          method.viewRole();
          break;

        case userChoice[2]:
          method.viewEmployee();
          break;

        case userChoice[3]:
          method.addDept();
          break;

        case userChoice[4]:
          method.addRole();
          break;

        case userChoice[5]:
          method.addEmployee();
          break;

        case userChoice[6]:
          method.updateEmployee();
          break;

        case userChoice[7]:
          connection.end();
          break;
      }
    });
};

module.exports = {
  promptUser
}