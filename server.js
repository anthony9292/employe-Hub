const mysql = require("mysql");
const cTable = require("console.table"); 
const inquirer = require("iniquirer"); 

 const connection = mysql.createConnection({
     host: "127.0.0.1",

     port: 3306, 

     user:"root", 

     password: "Thendgino9292",
     database: "employee_db", 
 });


                  //////>>>>>>>>start UP OPTIONS>>>>//////////

   function initiate() { 
     inquirer
     .prompt({ 
         name: 'StartOptions',
         type: 'list',
         message: 'Choose an Option from the list below',
         choices: [ 
              "Explore Application",
              "Add to Application",
              "Update Application",
              "Exit Application",
         ]
     }).then((answer) => { 
         if(answer.userSelectedChoice === "Explore Application"){ 
             viewApp();
         }else if (answer.userSelectedChoice === "Add to Application"){ 
             addToApp(); 
         }else if(answer.userSelectedChoice === "Update Application"){ 
             updateApp();
         }else if(answer.userSelectedChoice === "Exit Application"){ 
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
            }else if(answer.exploreUserEntry === "employees") { 
                connection.query("SELECT * FROM employees", (err, res) => { 
                        if (err) throw err; 
                        console.table(res);
                        initiate();
                });
            }else if(answer.exploreUserEntry === "departments") { 
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
              choice: [
                  "Add employee",
                  "Add  roles",
                  "Add department",
                  "Go back to Menu",

              ],
          }
      ]).then((answer) => { 
          if (answer.userAdd === "add department") { 
              addDepartment;
          }
          if(answer.userAdd === "Add roles") {
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
              connection.query("SELECT * FROM employee",(err, res) => {
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
  } function addDepartment() { 
      inquirer
      .prompt([
          {
              name: "userDepartment",
              type: "input",
              message: "Please input a custom department",
          },
      ]).then((answer) => { 
          connection.query(`INSERT INTO department (name) VALUES ("${answers.userDepartment}")`,
          (err, res) =>{
              if(err) throw err;
              console.log("Add successful!");
              initiate();
          }
          )
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

  
        
                      ///>>>>>>>>Update Employee>>>>>>>/////

 
                  



                 

                    
                  