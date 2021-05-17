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


const afterconnection = () => { 
    connection.query(SELECT * FROM department, " ", (err, res) => { 
        if(err) throw err; 
        console.log(res); 
        connection.end();
    });
};

   connection.connect((err) => { 
       if (err) throw err; 
       console.log(`connected as id ${connection.threadId}`); 
       connection.end(); 
       afterconnection(); 
   });



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
    
    
                              ///>>>>>>>View Employees Section>>>>>>>/////
    function viewApp() { 
        inquirer 
        .prompt([
        {
            name:"exploreUserEntry"
            type:"list", 
        }
        ])
    }
                          ///>>>>>show all Employee and Department section>>>>>>/////

         const  expAllDep = () => {  
             cont deptQuary =  'SELECT * FROM  departments'; 
             connection.query(deptQuary, (err, results) => {
                 if(err) throw err;
                 inquirer.prompt([{
                     name: 'deptChoice',
                     type: 'list',
                    }
                 ])
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
                inquirer.prompt([ 
                    
                    {  
                        name: "firstname", 
                        type: "input",
                        message: "Enter employee's first name "
                    }, 
                    {  
                        name: "lastname", 
                        type: "input",
                        message: "Enter employee's last name "
                    }, 
                    {
                       name: "role",
                       type:"list", 
                       message:"Select employee's role",
                       choices: selectRole()
                    },
                    { 
                    name: "choice",
                    type: "rawlist",
                    message: "employee's managers name?",
                    choices: selectManager()
                    }

                ]).then(function (val) { 
                    var roleId =selectRole().indexOf(val.role) + 1 
                    var managerId = selectManager().indexOf(val.choice) + 1 
                    connection.query("INSERT INTO employee SET ?" , 
                 { 
                     first_name: val.firstname,
                     last_name: val.lastname,
                     manager_id: managerId,
                     role_id: roleId 

                 }, function(err){ 
                     if (err) throw err
                     console.table(val)
                     startPrompt()
                 })
                })
            }


                      ///>>>>>>>>Update Employee>>>>>>>/////

 function updateEmployee() { 
       connection.query("SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;", function(err, res) {
         if(err) throw err
        console.log(res) 
          inquirer.prompt([
                    { 

             name:"lastName",
                type: "rawlist",
               choices: function() {
                           var lastName = [];
                           for (var i= 0; i < res.length; i++) {
                               lastName.push(res[i].last_name);

                           }
                           return lastName;
                       },
                       message: "Enter Employee's last name " ,

                    }, 

                    { name:"role", 
                      type: "rawlist", 
                      message:"Enter Employees new title" , 
                     choices: selectRole()
                    
                      }, 

                    ]).then(function(val) {
                        var roleId = selectRole().indexOf(val.role) + 1 
                        connection.query("UPDATE employee SET WHERE ?" , 
                         { 
                             last_name: val.lastName
                         },{
                         role_id:roleId
                        },
                         function(err){ 
                             if(err) throw err
                             console.table(val)
                             startPrompt()
                         }) 

                    });
                });

            }
                          ///>>>>>>>>Employee role section>>>>>>>/////



function addRole() { 
      connection.query("SELECT role.title AS Title, role.salary AS Salary FROM role",   function(err, res) {
        inquirer.prompt([ 

            { 
                 
                name:"role", 
                type: "rawlist", 
               message:"Enter Employees new Role title" , 

            },{
                name:"role", 
                type: "rawlist", 
               message:"Enter Employees Salary" 
            },
           
        ]).then(function(res) { 
            connection.query(
                "INSERT INTO role SET?", 
                { 
                    title: res.Title, 
                    salary: res.Salary, 
                }, 
                function(err) {
                    if(err) throw err
                    console.table(res); 
                    startPrompt();
                }
            )
        });
          
        
});

}

      //============= Add Department ==========================//
       
   function addDepartment() { 
       inquirer.prompt([

                {
                    name:"name", 
                    type: "input", 
                   message:"Enter name of Department to add" 
                }

            ]).then(function(res) { 
 
                var query = connection.query( 
                    "INSERT INTO department SET? ", 
                    { 
                       name: res.name
                    },
                    function (err) {  
                        if(err) throw err
                        console.table(res)
                        startPrompt();
                    }
                )
            })
            }
     

                 

                    
                  