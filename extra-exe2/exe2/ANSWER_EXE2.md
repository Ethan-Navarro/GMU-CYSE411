# Threat Modeling and Risk Evaluation Assignment – Instructor Solution

## Real-World Inspired Case: SQL Injection in a University Portal

### Background

SQL Injection is one of the most historically impactful web vulnerabilities.  
Many large-scale breaches—including incidents affecting universities, retail platforms, and government services—have occurred because applications trusted user input that was later executed as part of a database query.

In SQL Injection attacks, an attacker manipulates application input so that it becomes part of the SQL query executed by the database. If input validation or parameterized queries are missing, the attacker may:

- retrieve confidential data
- modify records
- bypass authentication
- destroy database content

This type of vulnerability frequently occurs when **untrusted input crosses a trust boundary and is used directly in database queries without validation or sanitization**.

Reference:

OWASP SQL Injection  
https://owasp.org/www-community/attacks/SQL_Injection

---

# System Description

The university provides a **Student Portal** used by students and faculty.

The portal allows users to:

- log into the system
- view student profiles
- search course enrollments
- retrieve academic transcripts
- check library account activity

The application is implemented as a web-based system.

### System Components

- Web Browser (client)
- Student Portal Web Application
- Student Database
- Library Database

---

# Example Vulnerable Query

```sql
SELECT * FROM students WHERE last_name = '<user_input>';
```

Example injection:

```sql
' OR '1'='1
```

Resulting query:

```sql
SELECT * FROM students WHERE last_name = '' OR '1'='1';
```

This returns **all student records**.

---

# Part 1 – Threat Elicitation (Example Answers)

| Actor | Prerequisites | Actions | Consequence | Affected System Component | Impact |
|------|---------------|--------|-------------|---------------------------|--------|
| Authenticated student attacker | Valid portal account | Injects `' OR '1'='1` in search field | Retrieves all student records | Student Database | Exposure of sensitive student data |
| External attacker | Access to login page | SQL injection in login form | Authentication bypass | Authentication module | Unauthorized system access |
| Malicious insider | Access to search API | Injects SQL to update records | Academic records modified | Student Database | Integrity violation |
| External attacker | Knowledge of SQL injection techniques | Injects `DROP TABLE students` | Deletes database table | Student Database | System outage |
| Automated bot | Scripted HTTP requests | Exploits SQL injection repeatedly | Mass data exfiltration | Student Database | Large-scale data breach |

---

# Part 2 – Bug Bar Definitions

### Damage

| Score | Interpretation |
|------|---------------|
| 0 | No damage |
| 5 | Limited information disclosure |
| 8 | Sensitive personal data exposure |
| 10 | Full database compromise |

### Reproducibility

| Score | Interpretation |
|------|---------------|
| 0 | Hard to reproduce |
| 5 | Requires moderate effort |
| 10 | Easily reproducible |

### Exploitability

| Score | Interpretation |
|------|---------------|
| 2.5 | Advanced skills required |
| 5 | Requires attack tools |
| 10 | Simple browser request |

### Affected Users

| Score | Interpretation |
|------|---------------|
| 0 | No users |
| 5 | Few users |
| 8 | Many users |
| 10 | All users |

### Discoverability

| Score | Interpretation |
|------|---------------|
| 0 | Very hard to discover |
| 5 | Detectable via testing |
| 10 | Publicly known vulnerability |

---

# Part 3 – Apply DREAD

| Threat | Damage | Reproducibility | Exploitability | Affected Users | Discoverability | Risk Score |
|------|------|------|------|------|------|------|
| Data exfiltration via SQL injection | 8 | 9 | 8 | 8 | 7 | 8.0 |
| Authentication bypass | 9 | 8 | 7 | 8 | 7 | 7.8 |
| Academic record modification | 9 | 7 | 6 | 6 | 6 | 6.8 |
| Table deletion attack | 10 | 6 | 5 | 10 | 5 | 7.2 |
| Automated data harvesting | 8 | 9 | 8 | 10 | 8 | 8.6 |

Risk Score = Average of DREAD values

---

# Part 4 – Deriving Likelihood and Impact

Formula used:

```
Likelihood = (Reproducibility + Exploitability + Discoverability) / 3
Impact = (Damage + Affected Users) / 2
```

Example for Threat 1:

```
Likelihood = (9 + 8 + 7) / 3 = 8
Impact = (8 + 8) / 2 = 8
```

---

# Risk Classification and Treatment

| Threat | Impact | Likelihood | Risk Score | Risk Treatment |
|------|------|------|------|------|
| Data exfiltration | 8 | 8 | 8 | Avoid |
| Authentication bypass | 8.5 | 7.3 | 7.9 | Mitigate |
| Record modification | 7.5 | 6.3 | 6.9 | Mitigate |
| Table deletion | 10 | 5.3 | 7.6 | Transfer |
| Automated harvesting | 9 | 8.3 | 8.6 | Avoid |

Treatment decisions based on risk levels.

---

# Part 5 – Threat Mitigation

| Threat | Preventive Control | Detective Control | Corrective Control |
|------|------|------|------|
| Data exfiltration | Parameterized queries | Query logging | Database restore |
| Authentication bypass | Input validation and prepared statements | Authentication monitoring | Credential reset |
| Record modification | Role-based access control | Database change auditing | Restore modified records |
| Table deletion | Least privilege DB accounts | Database activity monitoring | Restore database backups |
| Automated harvesting | Rate limiting and WAF | Anomaly detection | Incident response |

---

# Reflection Answers (Example)

### 1. Which threat had the highest risk score and why?

Automated data harvesting had the highest risk score because it affects many users and can be executed repeatedly with automated tools.

### 2. Which DREAD criteria influenced the final score the most?

Damage and Affected Users significantly influence the final risk because they represent the overall impact on the system.

### 3. Does DREAD introduce subjectivity?

Yes. Assigning numeric values to qualitative criteria can vary between analysts.

### 4. Architectural changes that could eliminate SQL injection

- Use parameterized queries
- Use ORM frameworks
- Implement strict input validation
- Apply least-privilege database permissions
- Implement Web Application Firewalls