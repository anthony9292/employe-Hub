// Connection to the DB
const mysql = require("mysql");
const cTable = require("console.table");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Be sure to update with your own MySQL password!
  password: "Thendgino9292",
  database: "employee_db",
});



       //////>>>>>>>>start UP OPTIONS>>>>//////////



       function initiate() { 
        inquirer
          .prompt([
             {
              name: 'StartOptions',
              type: 'list',
              message: 'Choose an Option from the list below',
              choices: [ 
                   "Explore Application",
                   "Add to Application",
                   "Update Application",
                   "Exit Application",
              ],
             },
         ]).then((answer) => { 
              if(answer.startOptions === "Explore Application") { 
                  viewApp();
              } else if (answer.startOptions === "Add to Application") { 
                  addToApp(); 
              } else if(answer.startOptions === "Update Application") { 
                  updateApp();
              } else if(answer.startOptions === "Exit Application") { 
                  exitApp();
              }
          });
     
         }
         
         
                                   ///>>>>>>>View all Sections<<<<<<</////
         function viewApp() { 
             inquirer 
             .prompt([
             {
                 name:"exploreUserEntry",
                 type:"list", 
                 message:"Please select a section you would like to Explore",
                 choice:["roles","employees", "departments"],
     
             },
             ]).then((answer) => { 
                 if(answer.exploreUserEntry === "roles") { 
                     connection.query("SELECT * FROM roles", (err, res) => {
                         if(err) throw err;
                         console.table(res); 
                         initiate();
                     });
                 } else if(answer.exploreUserEntry === "employees") { 
                     connection.query("SELECT * FROM employees", (err, res) => { 
                             if (err) throw err; 
                             console.table(res);
                             initiate();
                     });
                 } else if(answer.exploreUserEntry === "departments") { 
                     connection.query("SELECT * FROM department", (err, res) => {
                         if(err) throw err; 
                         console.table(res);
                         initiate();
                     });
                 }
             });
         }
                               ///>>>>>>add section<<<<<<</////
       function addToApp() { 
           inquirer 
           .prompt([ 
               {
                   name: "userAdd",
                   type: "list",
                   message:"What additions would you like to input?",
                   choice: ["Add employee","Add  roles","Add department","Go back to Menu"],
               },
           ]).then((answer) => { 
               if (answer.userAdd === "add department") { 
                   addDepartment();
               }if(answer.userAdd === "Add roles") {
                   var departmentChoices = []; 
                   connection.query("SELECT * FROM roles", (err,res) => { 
                       if(err) throw err;
                       departmentChoices = res.map(({ id, title, salary }) => ({
                           value: id,
                           name: title,
                           salary: salary,
                       }));
     
                       addRole(departmentChoices);
                   });
               } if(answer.userAdd === "Add employee") { 
                   var employeeChoices = []; 
                   connection.query("SELECT * FROM employee", (err, res) => {
                      if(err) throw err; 
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
                              lstname: last_name,
                              rlid: role_id,
                              mngname: manager_name,
                              mngid: manager_id,
                          })
                      );
                      addEmployee(employeeChoices);
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
           ]).then((answer) => { 
               connection.query(`INSERT INTO department (name) VALUES ("${answer.userDepartment}")`,
               (err, res) => {
                   if(err) throw err;
                   console.log("Add successful!");
                   initiate();
               }
               );
           });
       }
            
     
     
                     ///>>>>>>>add Roles Section<<<<<<</////
     
      function addRole(departmentChoices) { 
          inquirer
          .prompt([
              {
                  name: "title",
                  type: "input",
                  message:"Please input new role",
              },
           { 
             name:"salary",
             type:"input",
             message:"Please input salary for role"
           },
              {
                  name:"userDeptId",
                  type: "list",
                  message:"Assign employee to department",
                  choices: departmentChoices,
              },
          ]).then((answer) => { 
           connection.query;`INSERT INTO roles(title, salary, department_id ) VALUES ("${answer.departmentChoices})`,
           console.log(answer);
           initiate();
          });
      }
     
                                    
                                     ///>>>>>>>add employee section>>>>>>>/////
     
       function addEmployee(employeeChoices) { 
           inquirer 
           .prompt([ 
               { 
                   name:"firstname",
                   type:"input",
                   message:"Input employees first name:",
                   
               },
               { 
                   name: "lastname",
                   type:"input", 
                   message:"Input employees last name:", 
               }, 
               {
                   name:"employeeRole",
                   type:"list", 
                   message:"Select role for employee's job",
                   choices: employeeChoices,
               },
                {
                    name: "employeesManager",
                    type:"input",
                    message:"Input employees manager.If employee has no manager,enter N/A"
     
                },
           ]).then((answer) => { 
               connection.query;
               console.table(answer);
               initiate();
           });
       }
             
                           ///>>>>>>>>Update Employee>>>>>>>/////
     
      
             function updateApp() { 
                 inquirer.prompt([
                          { 
                             name: "userUpdateApp",
                             type: "list",
                             message:"Choose from list to update",
                             choices: ["Drop a Department","Drop a job role","Drop an employee","Update an employees role","Return to Main Menu"],
                       },
                     
                 ]).then((answer) => {
                     if(answer.userUpdateApp === "Drop a Department") { 
                         console.log("random");
                     }else if(answer.userUpdateApp === "Drop a job role") { 
                         console.log("Working"); 
     
                     }else if(answer.userUpdateApp === "Drop an employee") {
                         console.log("NO"); 
                     }else if(answer.userUpdateApp === "UPdate an employees role"){ 
                         console.log("YES"); 
                     }else if(answer.userUpdateApp === "Return to Main Menu") {
                         initiate();
                     }
                 });
             }
     
             ///>>>>>End application<<<<<////
     
             function exitApp() {
                 console.log("Exiting app Now!!");
                 connection.end();
             }
          initiate();
     
                      
     
     