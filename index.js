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
         "See Employee list", 
         "View Employees by Department",
         "Add a Employee",
         "Remove a Employees",
         "Update Role of Employee",
         "Add a role to Employee",
         //Removes and updates roles
         "End"
     ]
    })

    .then (function({task}) { 
        switch(task) { 
            case "See Employee list":
              seeEmployee(); 
              break;
              case "View Employees by Department": 
               viewDepartmentEE(); 
               break;

               case "Add a Employee":
                   addEmployee();
                   break;
               case "Remove a Employee":
                   removeEmployee();
                   break;
                case "Update Role of Employee":
                    updateRoleEE();
                    break;
                case "Add a Role": 
                 addRole(); 
                 break;     
        }
    });
}


//// Employee list 


function seeEmployee() { 
  console.log("see Employee list\n"); 

  var query =  
  `SELECT e.id, e.first_name, e.last_name, r.title, d.name  AS department, r.salary, CONCAT(m.first_name, ' ',m.last_name) AS manager
   FROM employee e
   LEFT JOIN role r
   ON e.role_id = r.id
   ON d.id = r.department_id
   LEFT JOIN employee m 
   ON m.id = e.manager_id`

   connection.query(quary, function (err, res) { 
       if(err) throw err;   

       console.table(res); 
       console.log("Employee's list viewed!!\n")

       firstPrompt(); 
   });
}