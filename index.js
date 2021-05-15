const mysql = require("mysql"); 
const inquirer = require("inquirer");
const { connect } = require("http2");
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


//// Employee list  section 
function seeEmployee() { 
  console.log("see Employee list\n"); 

  var query =  
  `SELECT e.id, e.first_name, e.last_name, r.title, d.name  AS department, r.salary, CONCAT(m.first_name, ' ',m.last_name) AS manager
    FROM employee e
    LEFT JOIN role r
    ON e.role_id = r.id 
    LEFT JOIN department d 
    ON d. id = r.department_id
    LEFT JOIN employee m 
    ON m.id = e.manager_id`

   connection.query(query, function (err, res) { 
       if(err) throw err;   

       console.table(res); 
       console.log("Employee's list viewed!!\n")

       firstPrompt(); 
   });
}

///View employees by there department section 

function viewDepartmentEE() { 
    console.log("View Employees by Department\n");

    var query = 
    `Select d.id, d.name, r.salary AS budget 
      FROM employee e
      LEFT JOIN role r 
      ON e.role_id = r.id
    LEFT JOIN department d
    ON d.id = r.department_id
    GROUP BY d.id, d.name`

    connection.query(query, function (err, res) { 
        if (err) throw err; 

        const departmentOptions = res.map(data => ({
            value: data.id, name: data.name
        })); 

        console.table(res); 
        console.log("Successfully viewed Department!!\n"); 

        promptDepartment(departmentOptions);
    }); 

}

function promptDepartment(departmentOptions) { 

    inquirer 
    .prompt([ 
    {
        type: "list", 
        name : "departmentId",
        message: "Choose a department",
        choices: departmentOptions
    }
        
    ])
    .then(function(answer) { 
        console.log("answer ", answer.departmentId); 

        var query =  
        `SELECT e.id, e.first_name, e.last_name, r.title, d.name  AS department
        FROM employee e 
        JOIN role r 
        ON e.role_id = r.id
        JOIN department d 
        ON  d.id = r.department_id
        WHERE d.id = ? `


         connection.query(query, answer.departmentId, function( err, res) {
           if(err) throw err; 

           console.table("response ", res); 
           console.log(res.affectedRows + "Successfully viewed Employees\n"); 

           firstPrompt(); 
       }); 
    });
}



////view employee/add employee section 


function addEmployee() { 
    console.log("Please insert a Employee!")
 
    var query = 
    `SELECT r.id r.title, r.salary
      FROM role r` 

     connection.query(query, function (err, res) { 
         if(err) throw err; 

         const roleChoices = res.map(({id, title, salary }) => ({ 
             value: id, title: `${title}`, salary: `${salary}`
         }));

         console.table(res); 
         console.log("InsertRole");

         promptInsert(roleChoices); 
     }); 
}  

function  promptInsert(roleChoices) {   

    inquirer
    .prompt([ 
        {
            type: "input", 
        name : "first_name",
        message: "Please input employee's first name",

        type: "input", 
        name : "Last_name",
        message: "Please input employee's last name",

        type: "list", 
        name : "roleId",
        message: "Please input the employee's role",
        choices: roleChoices
       
        }, 
    ])
    .then(function (answer) { 
        console.log(answer); 

        var query = `INSERT INTO employee SET?`
        connection.query(query, 
    {   
        first_name:answer.first_name, 
        last_name: answer.last_name,
        role_id: answer.roleId,
        manager_id: answer.managerId,

    }, 
    function (err, res) { 
        if(err) throw err
        
        console.table(res); 
        console.log(res.insertedRows + "Insert succesfull!\n"); 

        firstPrompt(); 
    }); 
    }); 
}