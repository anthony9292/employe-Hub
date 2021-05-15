const mysql = require("mysql"); 
const inquirer = require("inquirer");
require("console.table"); 


var connection = mysql.createConnection({
    host: "localhost", 
    port: 3306,
    user: "root",
    password: "Thendgino9292",
    database: "employeesDB"
}); 

connection.connect(function (err) { 
    if (err) throw err; 
   firstPrompt();
});

function firstPrompt() { 

    inquirer 
    .prompt({ 
     type: "list", 
     name: "task", 
     message: "Choose the Following Steps!", 
     choices: [ 
         "See employee list", 
         "View Employees by Department",
         "Add a Employee",
         "Remove a Employees",
         "Update Role of Employee",
         "Add a role to Employee",
         //Removes and updates roles
         "End"
     ]
    })
    
}