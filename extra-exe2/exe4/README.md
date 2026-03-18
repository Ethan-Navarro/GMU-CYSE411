# CYSE 411 – SQL Injection Exploitation Lab
## Exercise 4 – SQL Injection Attacks

---

# Objective

This exercise demonstrates how SQL Injection vulnerabilities arise when an application incorrectly constructs SQL queries using **string concatenation with untrusted user input**.

Students will interact with a deliberately vulnerable **Student Portal web application** and exploit SQL injection vulnerabilities to:

- bypass authentication
- retrieve hidden data
- extract sensitive information from other tables
- enumerate database structure

This lab illustrates the security principle discussed in class:

> Injection occurs when **data is interpreted as executable instructions** by an interpreter such as a SQL engine.

---

# Environment Overview

Students will run a **local vulnerable web application** consisting of:

| Component | Description |
|--------|-------------|
| HTML | login portal |
| Node.js | backend server |
| SQLite | database |

The portal contains:

1. Login page
2. Item list page (accessible after login)

The backend constructs SQL queries **unsafely**, allowing injection attacks.

---

# Required Software

Students must install:

### Node.js

Download:

https://nodejs.org

Verify installation:

```
node -v
npm -v
```

---

# Step 1 –  Initialize Node Project

```
npm init -y
npm install express sqlite3 body-parser
```

---

# Step 2 – Create Database

Create database:

```
sqlite3 portal.db
```

Create tables:

```sql
CREATE TABLE users (
id INTEGER PRIMARY KEY,
username TEXT,
password TEXT
);

CREATE TABLE items (
id INTEGER PRIMARY KEY,
name TEXT,
price INTEGER
);

INSERT INTO users VALUES
(1,'admin','admin123'),
(2,'alice','password1'),
(3,'bob','password2');

INSERT INTO items VALUES
(1,'Laptop',1200),
(2,'Phone',700),
(3,'Headphones',200),
(4,'Keyboard',150);
```

Exit SQLite:

```
.exit
```

---


---

# Step 3 – Start the Portal

Run:

```
node server.js
```

Open browser:

```
http://localhost:3000
```

---

# Vulnerable Query

The application constructs SQL queries using **string concatenation**.

Example:

```
SELECT * FROM users
WHERE username = '<username>'
AND password = '<password>'
```

This allows attackers to manipulate the query structure.

---

# Tasks

Students must perform SQL injection attacks to bypass authentication or extract data.

For each question:

1. Provide the **payload**
2. Explain why the attack works
3. Show the resulting query executed by the database

---

# Question 1 – Authentication Bypass

Log in without knowing any password.

Hint:

Use a Boolean expression that always evaluates to TRUE.

Example SQL logic:

```
OR 1=1
```


## Tip – Closing the SQL String

When performing a SQL injection attack, it is often necessary to **close the string literal used by the original SQL query** before inserting malicious SQL logic.

Consider the vulnerable query used by the application:

```sql
SELECT * FROM users
WHERE username = '<username>'
AND password = '<password>'
```

The values entered by the user are placed **inside single quotes** (`' '`).

For example, if a user enters:

```
username: alice
password: password1
```

The database executes:

```sql
SELECT * FROM users
WHERE username = 'alice'
AND password = 'password1'
```

To inject SQL code, an attacker must first **terminate the string literal** by adding a single quote `'`.

Example payload:

```
' OR 1=1 --
```

This payload works because:

1. The first `'` **closes the original string**.
2. `OR 1=1` introduces a condition that always evaluates to TRUE.
3. `--` begins a SQL comment, causing the remainder of the query to be ignored.

The resulting SQL statement becomes:

```sql
SELECT * FROM users
WHERE username = 'alice'
AND password = '' OR 1=1 --'
```

Since `1=1` is always true, the database returns rows and authentication is bypassed.

### Key Idea

Successful SQL injection often follows three steps:

1. **Close the string literal** (`'`)
2. **Insert malicious SQL logic**
3. **Comment out the rest of the query** (`--`)
---

# Question 2 – Comment Injection

Use SQL comments to remove part of the query.

SQL supports comments:

```
--
```

Task:

Bypass the password check using a comment operator.

---

# Question 3 – Extract Hidden Data

Use a **UNION query** to retrieve information from another table.

UNION allows combining results from multiple SELECT statements.

Example:

```
SELECT column1 FROM table1
UNION
SELECT column2 FROM table2
```

Task:

Extract usernames and passwords from the `users` table.

---

# Question 4 – Retrieve Additional Columns

Modify the UNION attack so that it returns:

- usernames
- passwords

Explain how SQL requires the **same number of columns** in UNION queries.

---

# Question 5 – Enumerating the Database

Attempt to discover the database structure.

Use SQL metadata tables.

Example in SQLite:

```
sqlite_master
```

Task:

List the tables stored in the database.

---

# Question 6 – Extract Item Data

Use SQL injection to retrieve:

- item name
- price

without logging in normally.

---

# Question 7 – Blind Injection (Conceptual)

Explain how an attacker could determine whether the first character of the admin password is **'a'** using a Boolean condition.

Students must write the SQL expression used.

---

# Reflection Questions

1. Why does building SQL queries using string concatenation create vulnerabilities?
2. What is the difference between data and instructions in SQL?
3. How would parameterized queries prevent these attacks?
4. What other interpreters besides SQL are vulnerable to injection attacks?

---

# Challenge (Optional)

Modify the vulnerable server to use **parameterized queries**.

Example:

```javascript
db.get(
"SELECT * FROM users WHERE username = ? AND password = ?",
[username,password]
)
```

Explain why this prevents SQL injection.

---


## Instructor Solution

The instructor solution for this assignment is available here:

[Instructor Solution](ANSWER_EXE4.md)