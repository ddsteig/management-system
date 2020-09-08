const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const prompt = require("../../app.js");

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
    if (err) throw err;
  });
}

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

module.exports = {
  viewDept,
  viewRole,
  viewEmployee,
  addDept,
  addRole,
  addEmployee,
  updateEmployee,
};
