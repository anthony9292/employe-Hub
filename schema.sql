DROP  DATABASE IF EXISTS employee_db;
CREATE DATABASE  employee_db; 

USE employee_db;

--- DEPARTMENT TABLE ----
CREATE TABLE department (
  id INTEGER NOT NULL AUTO_INCREMENT,
  name VARCHAR(50),
  PRIMARY KEY(id)
 
);

-- ROLE TABLE ----
CREATE TABLE roles (
  id INTEGER  NOT NULL AUTO_INCREMENT, 
  title VARCHAR (50),
  salary DECIMAL (11,2),
  department_id INTEGER,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES department (id) ON DELETE CASCADE
);


-- EMPLOYEE ROLE TABLE ----
CREATE TABLE employee (

  id INTEGER NOT NULL AUTO_INCREMENT,
  first_name VARCHAR (50) NOT NULL,
  last_name VARCHAR (50) NOT NULL,
  role_id INTEGER NOT NULL,
  manager_name VARCHAR (50),
  manager_id INTEGER,
  FOREIGN KEY (manager_id) REFERENCES employee (id),
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES roles (id) ON DELETE CASCADE
  
  );
 