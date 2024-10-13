-- Drop the student table if it exists
DROP TABLE IF EXISTS student;

-- Create the student table
CREATE TABLE student (
  roll_no INT PRIMARY KEY,
  name VARCHAR(50),
  email VARCHAR(50),
  department VARCHAR(50),
  batch INT,
  mobileNo CHAR(15),
  address VARCHAR(200),
  password VARCHAR(200)
);

-- Select all records from the student table
SELECT * FROM student;

-- Select records from the student table where the email matches
SELECT * FROM student WHERE email = 'duryodhandeep123@gmail.com';

-- Drop the instructor table if it exists
DROP TABLE IF EXISTS instructor;

-- Create the instructor table
CREATE TABLE instructor (
  ID VARCHAR(50) PRIMARY KEY,
  name VARCHAR(50),
  email VARCHAR(50),
  department VARCHAR(50),
  mobileNo CHAR(15),
  address VARCHAR(200),
  password VARCHAR(200)
);

-- Select all records from the instructor table
SELECT * FROM instructor;

-- Select records from the instructor table where the email matches
SELECT * FROM instructor WHERE email = 'duryodhandeep123@gmai.com';

-- Drop the admin table if it exists
DROP TABLE IF EXISTS admin;

-- Create the admin table
CREATE TABLE admin (
  ID VARCHAR PRIMARY KEY,
  name VARCHAR(50),
  email VARCHAR(50),
  mobileNo CHAR(15),
  address VARCHAR(200),
  password VARCHAR(200)
);

-- Drop the course table if it exists
DROP TABLE IF EXISTS course;

-- Create the course table
CREATE TABLE course (
  course_ID VARCHAR(10) PRIMARY KEY,
  course_name VARCHAR(50),
  instructor_ID VARCHAR(50),
	semester varchar(10),
  FOREIGN KEY (course_ID) REFERENCES course(course_ID) ON DELETE CASCADE
);

select * from course;

-- Drop the takes table if it exists
DROP TABLE IF EXISTS takes;

-- Create the takes table
CREATE TABLE takes (
  takes_id SERIAL PRIMARY KEY,
  roll_no INT,
  course_ID VARCHAR(10),
  semester VARCHAR(10),
  grade VARCHAR(10),
  FOREIGN KEY (roll_no) REFERENCES student(roll_no) ON DELETE CASCADE,
  FOREIGN KEY (course_ID) REFERENCES course(course_ID) ON DELETE CASCADE
);
