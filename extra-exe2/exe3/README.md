# CYSE 411 – SQL Query Exercise  
## Student Portal Data Analysis

## Objective

This exercise introduces students to **basic SQL querying skills** using a simplified university database.

Students will practice writing SQL queries using only the commands introduced in class:

- SELECT
- WHERE
- ORDER BY
- JOIN
- GROUP BY
- HAVING

The goal is **not to explore SQL injection**, but to understand **how SQL queries are used to retrieve and analyze information from relational databases**.

---

# Environment Setup

Students may complete this exercise using **one of the following options**.

## Option 1 – Online SQL Compiler (Recommended)

Use the online SQL compiler:

https://www.programiz.com/sql/online-compiler/

This tool runs SQL directly in the browser and requires no installation.

---

## Option 2 – Local Lightweight Database (Optional)

Students who prefer running SQL locally may install **SQLite**.

SQLite advantages:

- runs on Windows, macOS, and Linux
- no server required
- database stored in a single file
- widely used in embedded applications

Download:

https://sqlite.org/download.html

However, **the online compiler is sufficient for this assignment**.

---

# Scenario

A university operates a **Student Portal** that stores academic and administrative information.

The database contains information about:

- students
- courses
- enrollments
- library loans

You are a data analyst working with the university IT department.  
Your task is to retrieve information from the database to support administrative decisions.

---

# Database Schema

The database contains the following tables.

---

## Students

| Column | Type |
|------|------|
| student_id | INT |
| first_name | TEXT |
| last_name | TEXT |
| age | INT |
| major | TEXT |

---

## Courses

| Column | Type |
|------|------|
| course_id | INT |
| course_name | TEXT |
| department | TEXT |

---

## Enrollments

| Column | Type |
|------|------|
| enrollment_id | INT |
| student_id | INT |
| course_id | INT |
| grade | INT |

---

## LibraryLoans

| Column | Type |
|------|------|
| loan_id | INT |
| student_id | INT |
| book_title | TEXT |
| loan_date | DATE |

---

# Initial Dataset

Students should create the tables and insert the following data.

```sql
CREATE TABLE Students (
student_id INT,
first_name TEXT,
last_name TEXT,
age INT,
major TEXT
);

INSERT INTO Students VALUES
(1,'Alice','Johnson',20,'Cybersecurity'),
(2,'Bob','Smith',22,'Computer Science'),
(3,'Carol','Lee',19,'Cybersecurity'),
(4,'David','Kim',23,'Data Science'),
(5,'Emma','Garcia',21,'Computer Science');

CREATE TABLE Courses (
course_id INT,
course_name TEXT,
department TEXT
);

INSERT INTO Courses VALUES
(101,'Secure Software Engineering','CYSE'),
(102,'Database Systems','CS'),
(103,'Machine Learning','DS');

CREATE TABLE Enrollments (
enrollment_id INT,
student_id INT,
course_id INT,
grade INT
);

INSERT INTO Enrollments VALUES
(1,1,101,92),
(2,2,102,85),
(3,3,101,88),
(4,4,103,90),
(5,5,102,75),
(6,1,102,89);

CREATE TABLE LibraryLoans (
loan_id INT,
student_id INT,
book_title TEXT,
loan_date TEXT
);

INSERT INTO LibraryLoans VALUES
(1,1,'Database Design','2024-02-01'),
(2,2,'Network Security','2024-02-10'),
(3,3,'Cryptography Basics','2024-03-05'),
(4,1,'Machine Learning Guide','2024-03-15');
```

---

# Tasks

Students must write SQL queries to answer the following questions.

---

# Part 1 – Basic Queries

1. Retrieve **all students** in the database.

2. Retrieve only the **first name and major** of all students.

3. Retrieve all students whose **major is Computer Science**.

4. Retrieve students **older than 21**.

5. Display all students **ordered alphabetically by last name**.

---

# Part 2 – Filtering Data

6. Retrieve all students who are **majoring in Cybersecurity and older than 19**.

7. Retrieve all students whose **age is between 20 and 22**.

8. Retrieve students whose **last name starts with 'J'**.

---

# Part 3 – Working with Multiple Tables (JOIN)

9. Retrieve the **courses taken by each student**.

The result should include:

- student first name
- course name

10. Retrieve the **grades obtained by each student in each course**.

11. Retrieve the **students enrolled in the course "Database Systems"**.

---

# Part 4 – Aggregation

12. Count **how many students are enrolled in each course**.

13. Calculate the **average grade for each course**.

---

# Part 5 – GROUP BY and HAVING

14. Show courses where **the average grade is greater than 85**.

15. Show students who are enrolled in **more than one course**.

---

# Part 6 – Advanced Query

16. Retrieve the **students who have borrowed books from the library** and display:

- student name
- book title
- loan date

17. Retrieve the **number of books borrowed by each student**.

18. Identify the **student who borrowed the most books**.

---


# Reflection Questions

1. What is the role of a **primary key** in a relational database?
2. Why are **foreign keys** important for joining tables?
3. Which SQL command was most useful for combining information across tables?
4. How could poor database design affect query complexity?



## Instructor Solution

The instructor solution for this assignment is available here:

[Instructor Solution](ANSWER_EXE3.md)