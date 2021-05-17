
--  DEPARTMENT NAMES -----
INSERT INTO department (name)
VALUES 
("Sales"),
("Engineering"),
("Finance"),
("Legal"),
("Human Resources"),
("Marketing"),
("Secretarial");


-- SALES ROLES -------
INSERT INTO roles (title, salary, department_id)
VALUES 
("Sales Associate", 50000, 1), 
("Sales Lead", 90000, 1);


-- HR ROLES -------
INSERT INTO roles (title, salary, department_id)
VALUES 
("Recruiter", 40000, 2),
("HR MANAGER", 80000, 2);


-- LEGAL ROLES -------
INSERT INTO roles (title, salary, department_id)
VALUES 
("Laywer", 95000, 3), 
("Corporate counsel", 150000, 3);

-- Marketing ROLES -------
INSERT INTO roles (title, salary, department_id)
VALUES 
("Marketing specialist", 36000, 4), 
("Marketing Manager", 100000, 4);

-- Secratarial  ROLES -------
INSERT INTO roles (title, salary, department_id)
VALUES 
("secratary", 30000, 7), 
("Administrative coordinator", 80000, 7);


-- Engineer ROLES -------
INSERT INTO roles (title, salary, department_id)
VALUES 
("Entry level", 40000, 5), 
("Individual Contributer", 90000, 5),
("Engineer Manager", 200000, 5);

-- FINANCE ROLES -------
INSERT INTO roles (title, salary, department_id)
VALUES 
("Staff Accountant", 30000, 6), 
("Accounting Manager", 80000, 6);



-- FAKE Employee table  -------
INSERT INTO employee (first_name, last_name, role_id, manager_name)
VALUES ("Eric", "Cartmen", 1, "Drake bell");
INSERT INTO employee (first_name, last_name, role_id, manager_name, manager_id)
VALUES ("Oliva", "Pope", 3, "N/A", 2);
INSERT INTO employee (first_name, last_name, role_id, manager_name)
VALUES ("Sakuragi", "Hanamichi", 5, "N/A");
INSERT INTO employee (first_name, last_name, role_id, manager_name)
VALUES ("Jojo", "Bizzare", 6, "Cookie Lyon");
INSERT INTO employee (first_name, last_name, role_id, manager_name)
VALUES ("Daenerys", "Targaryen", 7, "N/A");
INSERT INTO employee (first_name, last_name, role_id, manager_name)
VALUES ("Joon-gi", "Lee", 9, "N/A");
INSERT INTO employee (first_name, last_name, role_id, manager_name)
VALUES ("Dexter", "Morgen", 10, "Yuri Jehad");
INSERT INTO employee (first_name, last_name, role_id, manager_name)
VALUES ("Cersei", "Lannister", 11, "N/A");
INSERT INTO employee (first_name, last_name, role_id, manager_name)
VALUES ("Jodi", "Comer", 13, "N/A");
INSERT INTO employee (first_name, last_name, role_id, manager_name, manager_id)
VALUES ("Roberto", "Allison", 15, "N/A", 5);

