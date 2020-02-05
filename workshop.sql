DROP DATABASE IF EXISTS workshops;
CREATE DATABASE workshops;
\c workshops;

--
-- Table structure for table City
--

DROP TABLE IF EXISTS attendees;
CREATE TABLE attendees (
  ID serial NOT NULL,
  Name varchar(35)  NOT NULL default '',
  Workshop text NOT NULL default '',
  PRIMARY KEY  (ID)
);

INSERT INTO attendees (Name, Workshop) VALUES ('Ahmed Abdelali','DevOps 101');
INSERT INTO attendees (Name, Workshop) VALUES ('Ann Frank','Docker Container Fundamentals');
INSERT INTO attendees (Name, Workshop) VALUES ('Ann Mulkern','Machine Learning');
INSERT INTO attendees (Name, Workshop) VALUES ('Clara Weick','Modern Javascript');
INSERT INTO attendees (Name, Workshop) VALUES ('James Archer','MongoDB');
INSERT INTO attendees (Name, Workshop) VALUES ('Linda Park','React Fundamentals');
INSERT INTO attendees (Name, Workshop) VALUES ('Lucy Smith','Self-Driving Cars');
INSERT INTO attendees (Name, Workshop) VALUES ('Roz Billingsley','Modern Javascript');
INSERT INTO attendees (Name, Workshop) VALUES ('Samantha Eggert','Docker Container Fundamentals');
INSERT INTO attendees (Name, Workshop) VALUES ('Tim Smith','DevOps 101');
