# CYSE 411 – SQL Query Exercise  
## Instructor Solution

This document contains the **reference SQL queries** for the Student Portal SQL exercise.

The exact syntax may vary slightly depending on the SQL engine used (SQLite, Programiz compiler, etc.), but the **logical structure should be equivalent**.

---

# Part 1 – Basic Queries

### 1. Retrieve all students in the database.

```sql
SELECT * FROM Students;
```

---

### 2. Retrieve only the first name and major of all students.

```sql
SELECT first_name, major
FROM Students;
```

---

### 3. Retrieve all students whose major is Computer Science.

```sql
SELECT *
FROM Students
WHERE major = 'Computer Science';
```

---

### 4. Retrieve students older than 21.

```sql
SELECT *
FROM Students
WHERE age > 21;
```

Expected result: Bob Smith, David Kim.

---

### 5. Display all students ordered alphabetically by last name.

```sql
SELECT *
FROM Students
ORDER BY last_name;
```

---

# Part 2 – Filtering Data

### 6. Retrieve all students majoring in Cybersecurity and older than 19.

```sql
SELECT *
FROM Students
WHERE major = 'Cybersecurity'
AND age > 19;
```

Expected result: Alice Johnson.

---

### 7. Retrieve all students whose age is between 20 and 22.

```sql
SELECT *
FROM Students
WHERE age BETWEEN 20 AND 22;
```

Expected result:

Alice Johnson  
Bob Smith  
Emma Garcia  

---

### 8. Retrieve students whose last name starts with 'J'.

```sql
SELECT *
FROM Students
WHERE last_name LIKE 'J%';
```

Expected result: Alice Johnson.

---

# Part 3 – Working with Multiple Tables (JOIN)

### 9. Retrieve the courses taken by each student.

```sql
SELECT Students.first_name, Courses.course_name
FROM Students
JOIN Enrollments
ON Students.student_id = Enrollments.student_id
JOIN Courses
ON Enrollments.course_id = Courses.course_id;
```

---

### 10. Retrieve the grades obtained by each student in each course.

```sql
SELECT Students.first_name, Courses.course_name, Enrollments.grade
FROM Students
JOIN Enrollments
ON Students.student_id = Enrollments.student_id
JOIN Courses
ON Enrollments.course_id = Courses.course_id;
```

---

### 11. Retrieve the students enrolled in the course "Database Systems".

```sql
SELECT Students.first_name, Students.last_name
FROM Students
JOIN Enrollments
ON Students.student_id = Enrollments.student_id
JOIN Courses
ON Enrollments.course_id = Courses.course_id
WHERE Courses.course_name = 'Database Systems';
```

Expected result:

Bob Smith  
Emma Garcia  
Alice Johnson  

---

# Part 4 – Aggregation

### 12. Count how many students are enrolled in each course.

```sql
SELECT Courses.course_name, COUNT(*) AS total_students
FROM Enrollments
JOIN Courses
ON Enrollments.course_id = Courses.course_id
GROUP BY Courses.course_name;
```

Expected result:

Secure Software Engineering → 2  
Database Systems → 3  
Machine Learning → 1  

---

### 13. Calculate the average grade for each course.

```sql
SELECT Courses.course_name, AVG(Enrollments.grade) AS avg_grade
FROM Enrollments
JOIN Courses
ON Enrollments.course_id = Courses.course_id
GROUP BY Courses.course_name;
```

Approximate results:

Secure Software Engineering → 90  
Database Systems → 83  
Machine Learning → 90  

---

# Part 5 – GROUP BY and HAVING

### 14. Show courses where the average grade is greater than 85.

```sql
SELECT Courses.course_name, AVG(Enrollments.grade) AS avg_grade
FROM Enrollments
JOIN Courses
ON Enrollments.course_id = Courses.course_id
GROUP BY Courses.course_name
HAVING AVG(Enrollments.grade) > 85;
```

Expected result:

Secure Software Engineering  
Machine Learning  

---

### 15. Show students who are enrolled in more than one course.

```sql
SELECT Students.first_name, COUNT(*) AS courses_taken
FROM Students
JOIN Enrollments
ON Students.student_id = Enrollments.student_id
GROUP BY Students.first_name
HAVING COUNT(*) > 1;
```

Expected result:

Alice (2 courses)

---

# Part 6 – Advanced Query

### 16. Retrieve students who borrowed books from the library.

```sql
SELECT Students.first_name, LibraryLoans.book_title, LibraryLoans.loan_date
FROM Students
JOIN LibraryLoans
ON Students.student_id = LibraryLoans.student_id;
```

Expected result includes:

Alice – Database Design  
Alice – Machine Learning Guide  
Bob – Network Security  
Carol – Cryptography Basics  

---

### 17. Retrieve the number of books borrowed by each student.

```sql
SELECT Students.first_name, COUNT(*) AS books_borrowed
FROM Students
JOIN LibraryLoans
ON Students.student_id = LibraryLoans.student_id
GROUP BY Students.first_name;
```

Expected result:

Alice → 2  
Bob → 1  
Carol → 1  

---

### 18. Identify the student who borrowed the most books.

```sql
SELECT Students.first_name, COUNT(*) AS books_borrowed
FROM Students
JOIN LibraryLoans
ON Students.student_id = LibraryLoans.student_id
GROUP BY Students.first_name
ORDER BY books_borrowed DESC
LIMIT 1;
```

Expected result:

Alice (2 books)

---

# Reflection Questions – Suggested Answers

### 1. What is the role of a primary key?

A primary key uniquely identifies each record in a table.  
It ensures that no two rows represent the same entity and allows other tables to reference that record reliably.

---

### 2. Why are foreign keys important?

Foreign keys create relationships between tables.  
They allow the database to link related information (for example, students and enrollments) while preserving data integrity.

---

### 3. Which SQL command was most useful for combining information across tables?

The **JOIN** clause is the most important command for combining information from multiple tables.  
It allows relational databases to reconstruct relationships between entities.

---

### 4. How could poor database design affect query complexity?

Poor schema design can cause:

- unnecessary joins
- duplicated data
- inconsistent records
- slower queries

A well-designed relational schema simplifies queries and improves performance.