const mysql = require("mysql"); 
const inquirer = require("inquirer");
const { inherits } = require("util");
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants");
const { connect } = require("http2");
require("console.table"); 
const connection = mysql.createConnection({
    host: '127.0.0.1',
    //3306(standard),or personal port 
    port: 3306,
 //username 
    user: "root",
  // update your own sql password 
    password: "Thendgino9292",
 
    database: "employee_db"
}); 

connection.connect((err) => { 
    if (err) throw err; 
   console.log(`connected as id ${connection.threadId}\n`);
   init(); 
});
 const stafflist = ['None']; 
 const DepList =  ['None'];
 const RoleList = [];
// gathers all staff for manager array 
const getStaff = () => { 
    stafflist.length = 0;
    stafflist.push("None")
    connection.query('Select id, first_name. last_name FROM employee', (err, res) => { 
        if(err) throw err;
        stafflist.splice(1); 
        for(i=0; i<res.length; i++){ 
            stafflist.push(res[i].first_name.concat(' ', res[i].last_name))
        }
        return stafflist;
    })

    } 

                            //gathers all roles for role array 

    const getRole = () => {  
        RoleList.length = 0; 
        connection.query('Pick title FROM roles ', (err,res) => { 
            if(err) throw err; 
            RoleList.splice(1); for(i=0; i<res.length; i++){ 
                RoleList.push(res[i].title)
            }    
            return RoleList;
          })
    }

    const getDepartment = () => { 
        connection.query('Pick dep_name FROM department ', (err,res) => { 
            if(err) throw err; 
            DepList.splice(1); for(i=0; i<res.length; i++){ 
                DepList.push(res[i].dep_name)
            }    
         
          })
    }

                               //adding staff section\\\\\\\\\\\

    const addStaff = () => {
        getStaff()
        getRole()
        setTimeout(function() { 
            inquirer.prompt ([{ 
                name: 'first_name',
                message: 'Enter First name of employee:'
            },{ 
                name: 'last_name',
                message: 'Enter Last name of employee:'
            },{
            name: 'role',
            message: 'Enter the role of the employee:',
            type: 'list', 
            choices: RoleList,
        }, {
            name: 'manager',
            message: "Enter the employee's  manager",
            choices: stafflist,
            type: 'list'
        }
         ]).then((result) => { 

            let roleIndex = 0; 
            for(i=0; i<RoleList.length; i++) { 
                if(RoleList[i] === result.role ) { 
                    roleIndex = i+1;
                }
            }

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

    const addDepartment = () => { 
        inquirer.prompt ([ 
            { 
                new: 'New_Department', 
                message: 'Enter name of your New department:'
            }
        ]).then((result) => { 

            let query = 'INSERT INTO department SET ?'; 
            connect.query(query, 
                
                { 
 
                dep_name: result.new_Department
            }, 
             (err, res) => {
                 if (err) throw err; 

             }
            ),
            console.log('added Inputs Successfully', result.new_Department,"department"), 
            root()
        }
        )
    }


                 ///add role section\\\\\\\

    const addRole = () => { 
        getDepartment()
        setTimeout(function() { 
         inquirer.prompt ([ 
          { 
              name: 'title', 
              message: 'Enter Role title:'
          },{
              name: 'department', 
              message: "Choose department",
              type:'list',
              choices: DepList,
          },
          { 
              name: 'salary',
              message: 'Enter Salary for the role:'
          }
         ]).then((result) => { 

            let depIndex = 0; 
            for(i=0; i<DepList.length; i++) {
                if (result.department === depList[0]) {
                depIndex = null;
                } else if (result.department === depList[i]) {
                    depIndex = i;
                }
            }
        let query = 'Insert INTO roles SET';  
        connection.query(query, 
            { 
                title: result.title, 
                salary:result.salary,
                department_id:depIndex,
            },
            (err, res) => { 
                if(err) throw err;
            }
            
            
            ), 
            console.log(`New role "${results.title}" added!`), 
            root()

        } 
            ), 30}); 

    }   

                            //See all  Employees section///
    const ExploreAll = () => {
        let query = `SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, department.dep_name, employees.manager  `
        query += `FROM employees `
        query += `JOIN roles ON employees.role_id=roles.id `
    
    
        query += `LEFT JOIN department ON department.id = roles.department_id; `

        connection.query (query, 
            
            (err, res) => {
  if(err) throw err;
  console.table(res); 
  root()
            
    }
    )

    }

                       ////////update employees role  section///////////

            
   const updateEmpRole = () => { 
       stafflist.length = 0; 
       getStaff()
       getRole()
       setTimeout(function(){
           inquirer.prompt ([

        {  
            name: 'staff', 
            message: "Pick employee,to update role", 
            choices: stafflist,
            type: 'list'
        },  {  
            name: 'new_role', 
            message: "Input new role", 
            choices: RoleList,
            type: 'list'
        }
        ]).then((result) => { 
            let roleIndex = 0; 
            for(i=0; i<RoleList.length; i++) {
                if (RoleList[i] === result.new_role) {
                roleIndex = i+1;
                } 
            }
           let StaffId = stafflist.indexOf(result.staff);
           const query = connection.query( 
            'UPDATE employees SET role_id = ? WHERE id = ?',
            [ 
                roleIndex, 
                StaffId 
            ],
            (err, res) => { 
                if(err) throw err; 
                console.log('Updated Role successfully!!')
            },root()
            ); 
            });
        },300);

   };

   const ExploreRoles = () => { 
       let query = 
       'Select * FROM roles' 
       connection.query (query, 
        (err, res) => { 
            if(err) throw err; 
            console.table(res); 
            root()
        }
        
        )
   }

   const ExploreDepartments =  () => {
       let query =  
       `Select * FROM department`
       connection.query (query,
     
       (err, res) => {
           if (err) throw err;
           console.table(res);
           root()
       }
       
       )
   }
   
   const taskList = ['Exit application', 'Add new staff', 'Add new role', 'Explore new department','Explore all staffs', 'Explore all roles', 'Explore all departments', 'Update staff roles']

   const root = () => {
    inquirer.prompt ([
        {
        name: 'task',
        message: 'Welcome to :',
        choices: taskList,
        type: 'list'
        }
    ]).then ((response) => {
        switch (response.task) {
            case 'Exit application':
                connection.end()
                break;
            case 'Add new staff':
                addStaff()
                break;
            case 'Explore all staff':
                ExploreAll()
                break;
            case 'Update staff roles':
                updateEmpRole()
                break;
            case 'Add new role':
                addRole()
                break;
            case 'Add new department':
                addDepartment()
                break;
            case 'Explore all roles':
                ExploreRoles()
                break;  
            case 'Explore all departments':
                ExploreDepartments()
                break;             
        }
    })
}
init = () => {
root();
}   