const mysql = require("mysql");
const inquirer = require("inquirer");

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
          viewDept();
          break;

        case userChoice[1]:
          viewRole();
          break;

        case userChoice[2]:
          viewEmployee();
          break;

        case userChoice[3]:
          addDept();
          break;

        case userChoice[4]:
          addRole();
          break;

        case userChoice[5]:
          addEmployee();
          break;

        case userChoice[6]:
          updateEmployee();
          break;

        case userChoice[7]:
          connection.end();
          break;
      }
    });
};

// View departments

viewDept = () => {
  connection.query("SELECT * FROM employee_tracker.department;", function (
    err,
    results
  ) {
    for (i = 0; i < results.length; i++) {
      console.table([
        {
          Id: results[i].id,
          Department: results[i].name,
        },
      ]);
    }
    promptUser();
    if (err) throw err;
  });
};

// View Roles

viewRole = () => {
  connection.query("SELECT * FROM employee_tracker.role;", function (
    err,
    results
  ) {
    for (i = 0; i < results.length; i++) {
      console.table([
        {
          Id: results[i].id,
          Title: results[i].title,
          Salary: results[i].salary,
          Department_Id: results[i].department_id,
        },
      ]);
    }
    promptUser();
    if (err) throw err;
  });
};

// View Employees

viewEmployee = () => {
  connection.query("SELECT * FROM employee_tracker.employee;", function (
    err,
    results
  ) {
    for (i = 0; i < results.length; i++) {
      console.table([
        {
          Id: results[i].id,
          First_Name: results[i].first_name,
          Last_Name: results[i].last_name,
          Role_Id: results[i].role_id,
        },
      ]);
    }
    promptUser();
    if (err) throw err;
  });
};

// Add Departments

addDept = () => {};

// Add Roles

addRole = () => {};

// Add Employees

addEmployee = () => {};

// Update Employee

updateEmployee = () => {};
