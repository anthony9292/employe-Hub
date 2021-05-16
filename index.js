const mysql = require("mysql"); 
const inquirer = require("inquirer");
const connection = mysql.createConnection({
    host: '127.0.0.1',
    //3306(standard),or personal port 
    port: 3306,
 //username 
    user: "root",
  // update your own sql password 
    password: "Thendgino9292",
 
    database: "employee_db",
}); 

/// co
connection.connect((err) => { 
    if (err) throw err; 
   console.log("connected as id" + connection.threadId)
   startPrompt(); 
});

            ////
   
            const taskList = ["Exit application", "Add Employee", "Add role", "Add Department","View all Employee's", "Explore all Employee roles", 'Explore all Departments', 'Update Employee']
   
            function startPrompt() { 
                inquirer.prompt([ 
                    

                    { 
                        type:"list",
                        message: "Welcome to employee tracker,Pick a option from the list below to get started",
                        name: "choice",
                        choices: taskList
 
                    }
                ]).then(function(val) { 
                    switch(val.choices) { 
                        case "View all Employee's?": 
                        viewAllEmployees();
                        break; 

                        case "Explore all Employee roles?":
                        ExpAllRoles();  
                        break;  

                        case "Explore all Departments":
                            ExpAllDep()
                            break;
                        
                        case "Add Employee?": 
                         addEmployee();
                         break; 
                        
                        case "Update Employee":
                          updateEmployee();
                          break; 

                        case "Add Role?":
                            addRole(); 
                            break; 

                            case "add Department?":
                                addDepartment();
                                break;
                    }

                })
            }
                              ///>>>>>>>View all Employees Section>>>>>>>/////
   function viewAllEmployees() {
       connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;",
        function(err, res) { 
            if(err, res ) throw err
            console.table(res)
            startPrompt()
        })
   }

                                ///>>>>>>>View all Roles Section>>>>>>>/////

      function ExpAllRoles() {
           connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;", 
             function(err, res) { 
             if(err) throw err 
            console.table(res)
             startPrompt()
          })
    }

                               
                                ///>>>>>>>Explore all Departments Section>>>>>>>/////

  function ExpAllDep() { 
      connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;",
         function(err, res) {
             if(err) throw err
             console.table(res) 
             startPrompt()
         })
  }



                                      ///>>>>>>>>Manager role selection for add Employee prompt>>>>>>>/////

        var managersArr = []; 
        function selectManager() { 
            connection.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function(err, res) {
                if(err) throw err 
                for(var i = 0; i < res.length; i++) { 
                    managersArr.push(res[i].first_name)

                }
            })
            return managersArr;
        }
         
                                  ///>>>>>>>>Add Employee Section>>>>>>>/////

            function addEmployee() { 
                inquirer.prompt
            }