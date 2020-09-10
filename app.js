// Dependencies

const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

// Array of available user options

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

// Connection to MySQL

const connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "secret",
  database: "employee_tracker",
});

connection.connect(function (err) {
  if (err) throw err;
  promptUser();
});

// Node prompt with switch cases that call functions depending on the index selected from the array

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

// View departments displays the available departments

viewDept = () => {
  connection.query("SELECT * FROM employee_tracker.department;", function (
    err,
    results
  ) {
    let depts = [];
    for (i = 0; i < results.length; i++) {
      let dept = {
        Id: results[i].id,
        Department: results[i].name,
      };
      depts.push(dept);
    }
    console.table(depts);
    promptUser();
    if (err) throw err;
  });
};

// View Roles joins roles and department tables together and displays role, salary, and the department the role falls under

viewRole = () => {
  connection.query(
    "SELECT role.id, role.title, role.salary, department.name FROM (role INNER JOIN department ON role.department_id = department.id);",
    function (err, results) {
      let roles = [];
      for (i = 0; i < results.length; i++) {
        let role = {
          Id: results[i].id,
          Title: results[i].title,
          Salary: results[i].salary,
          Department: results[i].name,
        };
        roles.push(role);
      }
      console.table(roles);
      promptUser();
      if (err) throw err;
    }
  );
};

// View Employees joins the 3 tables together and returns the data for the employee with what role and department they fall under and how much they make

viewEmployee = () => {
  connection.query(
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name, employee.manager_id FROM ((employee INNER JOIN role ON employee.role_id = role.id) INNER JOIN department ON role.department_id = department.id) ORDER BY employee.id ASC;",
    function (err, results) {
      let employees = [];

      for (i = 0; i < results.length; i++) {
        let employee = {
          Id: results[i].id,
          First_Name: results[i].first_name,
          Last_Name: results[i].last_name,
          Role: results[i].title,
          Department: results[i].name,
          Salary: results[i].salary,
          Manager: results[i].manager_id,
        };
        employees.push(employee);
      }
      console.table(employees);
      promptUser();
      if (err) throw err;
    }
  );
};

// Add Departments allows depts. to be added

addDept = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "dept",
        message: "Enter a new Department:",
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: answer.dept,
        },
        function (err, res) {
          if (err) throw err;
          console.log("Department added.\n");
          promptUser();
        }
      );
    });
};

// Add Roles allows roles to be added and allows user to select an existing dept. to add it to and updates it with the corresponding dept_id

addRole = () => {
  let departments = [];
  connection.query("SELECT * FROM department", function (err, results) {
    for (i = 0; i < results.length; i++) {
      let department = {
        name: results[i].name,
        value: results[i].id,
      };
      departments.push(department);
    }
  });
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "Enter a new Role:",
      },
      {
        type: "input",
        name: "salary",
        message: "Enter Salary:",
      },
      {
        type: "list",
        name: "choice",
        message: "Select Department:",
        choices: departments,
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO role SET ?",
        {
          title: answer.title,
          salary: answer.salary,
          department_id: answer.choice,
        },
        function (err, res) {
          if (err) throw err;
          console.log("Role added.\n");
          promptUser();
        }
      );
    });
};

// Add Employees allows employees to be added and allows the user to select an existing role to be selected and updates it with the corresponding role_id

addEmployee = () => {
  let roles = [];
  connection.query("SELECT * FROM role", function (err, results) {
    for (i = 0; i < results.length; i++) {
      let role = {
        name: results[i].title,
        value: results[i].id,
      };
      roles.push(role);
    }
  });
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstname",
        message: "Enter Employee's first name:",
      },
      {
        type: "input",
        name: "lastname",
        message: "Enter Employee's last name:",
      },
      {
        type: "list",
        name: "choice",
        message: "Select Role:",
        choices: roles,
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.firstname,
          last_name: answer.lastname,
          role_id: answer.choice,
        },
        function (err, res) {
          if (err) throw err;
          console.log("Employee added.\n");
          promptUser();
        }
      );
    });
};

// Update Employee Roles allows user to update an Employees role from the existing roles

updateEmployee = () => {
  let employees = [];
  connection.query("SELECT * FROM employee", function (err, results) {
    for (i = 0; i < results.length; i++) {
      let name = results[i].first_name + " " + results[i].last_name;
      let employee = {
        name: name,
        value: results[i].id,
      };
      employees.push(employee);
    }
  });

  let roles = [];
  connection.query("SELECT * FROM role", function (err, results) {
    for (i = 0; i < results.length; i++) {
      let role = {
        name: results[i].title,
        value: results[i].id,
      };
      roles.push(role);
    }

    updateRole();
  });

  updateRole = () => {
    inquirer
      .prompt([
        {
          type: "list",
          name: "nameid",
          message: "Select Employee to update:",
          choices: employees,
        },
        {
          type: "list",
          name: "roleid",
          message: "Select new Role:",
          choices: roles,
        },
      ])
      .then((answer) => {
        connection.query(
          "UPDATE employee SET ? WHERE ?",
          [
            {
              role_id: answer.roleid,
            },
            {
              id: answer.nameid,
            },
          ],
          function (err, res) {
            if (err) throw err;
            console.log("Employee Role updated.");
            promptUser();
          }
        );
      });
  };
};
