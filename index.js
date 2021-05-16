const mysql = require("mysql"); 
const inquirer = require("inquirer");
const { inherits } = require("util");
require("console.table"); 
const connection = mysql.createConnection({
    host: 'localhost',
    //3306(standard),or personal port 
    port: 3306,
 //username 
    user: "root",
  // update your own sql password 
    password: "Thendgino9292",
 
    database: "employees_DB"
}); 

connection.connect((err) => { 
    if (err) throw err; 
   console.log(`connected as id ${connection.threadId}\n`);
   init(); 
});
 const Stafflist = ['None']; 
 const DepList =  ['None'];
 const RoleList = [];
// gathers all staff for manager array 
const getStaff = () => { 
    Stafflist.length = 0;
    Stafflist.push("None")
    connection.query('Select id, first_name. last_name FROM employee', (err, res) => { 
        if(err) throw err;
        Stafflist.splice(1); 
        for(i=0; i<res.length; i++){ 
            Stafflist.push(res[i].first_name.concat(' ', res[i].last_name))
        }
        return Stafflist;
    })

    } 

    //gathers all roles for role array 

    const getRole = () => {  
        roleList
    }
