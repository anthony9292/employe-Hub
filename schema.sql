DROP DATABASE employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE employees (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR (255) NOT NULL,
    last_name VARCHAR (255) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    manager_name VARCHAR (255)
);

CREATE TABLE roles (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR (255),
    salary INTEGER NOT NULL,
    department_id INTEGER NOT NULL
);

CREATE TABLE department (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    dep_name VARCHAR (255)
);