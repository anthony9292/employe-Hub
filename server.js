// Connection to the DB
const mysql = require("mysql");
const cTable = require("console.table");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",//input your own if not localhost
  port: 3306,//input your port if not 3306
  user: "root", //input ur username if not root 
  password: "Thendgino9292",//input your own sql password
  database: "employee_db", //gets database
});
///start up options
function initiate() {
  inquirer
    .prompt([
      {
        name: "startOptions",
        type: "list",
        message: "Choose an Option from the list below.",
        choices: [
          "Explore Application",
          "Add to Application",
          "Update Application",
          "Exit Application",
        ],
      },
    ])
    .then((answer) => {
      if (answer.startOptions === "Explore Application") {
        viewApp();
      } else if (answer.startOptions === "Add to Application") {
        addToApp();
      } else if (answer.startOptions === "Update Application") {
        updateApp();
      } else if (answer.startOptions === "Exit Application") {
        exitApp();
      }
    });
}

///view all section 

function viewApp() {
  inquirer
    .prompt([
      {
        name: "exploreEntry",
        type: "list",
        message: "Please select a section you would like to Explore",
        choices: ["Roles","Employees", "Departments"],
      },
    ])
    .then((answer) => {
      if (answer.exploreEntry === "Departments") {
        connection.query("SELECT * FROM department", (err, res) => {
          if (err) throw err;
          console.table(res);
          initiate();
        });
      } else if (answer.exploreEntry === "Roles") {
        connection.query("SELECT * FROM roles", (err, res) => {
          if (err) throw err;
          console.table(res);
          initiate();
        });
      } else if (answer.exploreEntry === "Employees") {
        connection.query("SELECT * FROM employee", (err, res) => {
          if (err) throw err;
          console.table(res);
          initiate();
        });
      }
    });
}

function addToApp() {
  inquirer
    .prompt([
      {
        name: "userAdd",
        type: "list",
        message: "what additions would you like to input?",
        choices: [
          "Add department",
          "Add an employee",
          "Add roles",
          "Go back to Main Menu",
        ],
      },
    ])
    .then((answer) => {
      if (answer.userAdd === "Add department") {
        addDepartment();
      }
      if (answer.userAdd === "Add roles") {
        var departmentChoices = [];
        connection.query("SELECT * FROM roles", (err, res) => {
          if (err) throw err;
          departmentChoices = res.map(({ id, title, salary }) => ({
            value: id,
            name: title,
            salary: salary,
          }));
    
          addRole(departmentChoices);
        });
      }
      if (answer.userAdd === "Add an employee") {
        var employeeChoices = [];
        connection.query("SELECT * FROM employee", (err, res) => {
          if (err) throw err;
          employeeChoices = res.map(
            ({
              id,
              first_name,
              last_name,
              role_id,
              manager_name,
              manager_id,
            }) => ({
              value: id,
              name: first_name,
              lname: last_name,
              rid: role_id,
              mname: manager_name,
              mid: manager_id,
            })
          );
          addemployee(employeeChoices);
        });
      }
    });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        name: "userDepartment",
        type: "input",
        message: "Please input a custom department",
      },
    ])
    .then((answer) => {
      connection.query(
        `INSERT INTO department (name) VALUES ("${answer.userDepartment}")`,
        (err, res) => {
          if (err) throw err;
          console.log("Add successful!");
          initiate();
        }
      );
    });
}

/// add Roles Section
function addRole(departmentChoices) {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "Please input new role",
      },
      {
        name: "salary",
        type: "input",
        message: "Please input salary for role",
      },
      {
        name: "userDeptId",
        type: "list",
        message: "Assign employee to department",
        choices: departmentChoices,
      },
    ])
    .then((answer) => {
      connection.query; // We need to
      `INSERT INTO roles (title, salary, department_id) VALUES ("${answer.departmentChoices}")`,
        console.log(answer);
      initiate();
    });
}


//// add employee section

function addemployee(employeeChoices) {
  inquirer
    .prompt([
      {
        name: "firstname",
        type: "input",
        message: "Please enter the employee's fist name",
      },
      {
        name: "lastName",
        type: "input",
        message: "Please enter the employee's last name",
      },
      {
        name: "employeeRole",
        type: "list",
        message: "please select the employee's job role",
        choices: employeeChoices,
      },
      {
        name: "employeesManager",
        type: "input",
        message: "Input employees manager.If employee has no manager,enter N/A",
      },
    ])
    .then((answer) => {
      connection.query;
      console.table(answer);
      initiate();
    });
}

///update employee

function updateApp() {
  inquirer
    .prompt([
      {
        name: "userUpdateEntry",
        type: "list",
        message: "Choose from list to update",
        choices: [
          "Drop a Department",
          "Drop a job role",
          "Drop an employee",
          "Update an employee's role",
          "Return to Main Menu",
        ],
      },
    ])
    .then((answer) => {
      if (answer.userUpdateEntry === "Drop a Department") {
        console.log("Random");
      } else if (answer.userUpdateEntry === "Drop a job role") {
        console.log("Test");
      } else if (answer.userUpdateEntry === "Drop an employee") {
        console.log("No");
      } else if (answer.userUpdateEntry === "Update an employee's role") {
        console.log("Yes");
      } else if (answer.userUpdateEntry === "Return to Main menu") {
        initiate();
      }
    });
}
// exits application
function exitApp() {
  console.log("Exiting App Now!!");
  connection.end();
}

initiate();

     
     