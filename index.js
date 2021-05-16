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


                               //adding staff section\\\\\\\\\\\

   

            let managerIndex = 0; 
            for(i=0; i<stafflist.length; i++) { 
                if ( result.manager === stafflist[0]) { 
                    managerIndex = i;
                }
            }

            let query = 'INSERT INTO employee SET ?';  
            connection.query(query, 
                { 
                    first_name: result.first_name,
                    last_name: result.last_name,
                    rol_id: roleIndex,
                    manager_id: managerIndex,
                    manager: result.manager
                },  
                    (err, res) => { 
                        if(err) throw err;
                    }
                ),
                console.log(result.first_name,'',result.last_name,  'Your Inputs have been added to the list!'),
                root()
            }
        ), 30}) 
     }

                       //adds department section\\\\

   

                 ///add role section\\\\\\\

   
                            //See all  Employees section///
    function ExploreAll(){ 
       connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;",
          function(er,res) { 
              if (err) throw err
              console.table(res)
              root()
          })
        }

                       ////////update employees role  section///////////

            
  

   function ExploreRoles () { 
       connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;", 
     function(err, res) { 
         if(err) throw err 
         console.table(res)
         root()
     })
    }
   function ExploreDepartments  (){
       connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;", 
      function (err, res) {  
          if (err) throw err
          console.table(res)
          root()
      })
      