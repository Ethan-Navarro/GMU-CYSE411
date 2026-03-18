# Threat Modeling and Risk Evaluation Assignment

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

The portal provides a search function allowing users to search for student profiles.

The backend code constructs the following SQL query dynamically:

```sql
SELECT * FROM students WHERE last_name = '<user_input>';
```

The value `<user_input>` comes directly from an HTTP request parameter.

If the application does not sanitize the input, an attacker could submit a malicious value such as:

```sql
' OR '1'='1
```

The resulting query becomes:

```sql
SELECT * FROM students WHERE last_name = '' OR '1'='1';
```

This causes the database to return **all student records**.

More sophisticated attacks may allow the attacker to:

- extract sensitive data
- modify records
- delete database tables

---

# System Data Flow Diagram

![DFD Support Portal](student_sql.png)

[Download the Threat Model](StudentSystem.tm7)


# Part 1 – Threat Elicitation

Based on the system description, identify **up to five threats** that could occur due to the SQL injection vulnerability.

Hints:

Possible attacker actions may include:

- retrieving confidential student data
- bypassing authentication
- modifying academic records
- deleting database tables
- escalating privileges

### Threat Enumeration Table

Students must identify **up to five threats**.

| Actor | Prerequisites | Actions | Consequence | Affected System Component | Impact |
|------|---------------|--------|-------------|---------------------------|--------|
| | | | | | |
| | | | | | |
| | | | | | |
| | | | | | |
| | | | | | |

---

# Part 2 – Threat Ranking Using DREAD

Threat modeling identifies possible attacks, but organizations must determine **which threats should be addressed first**.

Threat ranking prioritizes risks based on potential consequences and likelihood.

One historical method used in Microsoft's Secure Development Lifecycle is **DREAD**.

DREAD evaluates threats across five criteria.

| Criterion | Description |
|-----------|-------------|
| Damage | How severe would the attack be? |
| Reproducibility | How easily can the attack be repeated? |
| Exploitability | How difficult is it to perform the attack? |
| Affected Users | How many users would be impacted? |
| Discoverability | How easy is it to discover the vulnerability? |

Each criterion is scored from **0 to 10**.

![DREAD Infographic](threat_ranking.png)

---

# Part 3 – Bug Bar Definition

A **Bug Bar** is a set of predefined thresholds used by organizations to classify vulnerability severity.

Bug Bars help teams:

- standardize vulnerability scoring
- prioritize remediation
- maintain consistent security decisions

Example Bug Bar for **Damage**:

| Score | Interpretation |
|------|---------------|
| 0 | No damage |
| 5 | Limited information disclosure |
| 8 | Exposure of sensitive personal data |
| 10 | Full database compromise |

Students must create similar Bug Bars for:

- Reproducibility
- Exploitability
- Affected Users
- Discoverability

---

# Part 4 – Apply DREAD

Use your Bug Bar definitions and formulas to evaluate the threats identified earlier.

| Threat | Damage | Reproducibility | Exploitability | Affected Users | Discoverability | Risk Score |
|------|------|------|------|------|------|------|
| Threat 1 | | | | | | |
| Threat 2 | | | | | | |
| Threat 3 | | | | | | |
| Threat 4 | | | | | | |
| Threat 5 | | | | | | |

---

# Part 5 – Deriving Likelihood and Impact

Many risk models simplify risk using:

```
Risk = Likelihood × Impact
```

However, DREAD includes **five criteria**, not two.

Students must design a method to derive **Likelihood** and **Impact** from the DREAD criteria.

Example reasoning:

```
Likelihood = f(Reproducibility, Exploitability, Discoverability)

Impact = f(Damage, Affected Users)
```

Students must:

1. Define their own formulas
2. Explain the reasoning behind their design
3. Justify any weighting used

Example formula:

```
Likelihood = (R + E + Dv) / 3

Impact = (D + A) / 2
```

Where:

```
D  = Damage
R  = Reproducibility
E  = Exploitability
A  = Affected Users
Dv = Discoverability
```

Students may propose alternative models.

---

# Risk Classification and Treatment

To evaluate each threat and determine the appropriate **risk treatment strategy**, a **risk matrix** must be used.

For this exercise, follow a simplified interpretation inspired by **NIST SP 800-39 (Managing Information Security Risk)**.


![Risk MATRIX based on NIST SP 800-39](risk_matrix_nist.png)


Based on the **Likelihood and Impact values** calculated in the previous task (Part 5), compute the **Risk Score** and determine the appropriate treatment strategy.

Use the following treatment scheme:

| Risk Level | Treatment Strategy |
|-------------|------------------|
| Low | Accept |
| Low-Medium or Medium | Mitigate |
| Medium-High | Transfer |
| High | Avoid |

Students must evaluate each identified threat and determine the appropriate **risk treatment decision**.

| Threat | Impact | Likelihood | Risk Score | Risk Treatment |
|------|------|------|------|------|
| Threat 1 | | | | |
| Threat 2 | | | | |
| Threat 3 | | | | |
| Threat 4 | | | | |
| Threat 5 | | | | |

Students must justify their treatment decisions in their submission.

# Part 6 – Threat Mitigation

For each threat identified, propose security controls.

Your controls must include:

- Preventive controls
- Detective controls
- Corrective controls

### Mitigation Table

Fill the mitigation table only for threats with treatment equal avoid and mitigate.

| Threat | Preventive Control | Detective Control | Corrective Control |
|------|------|------|------|
| Threat 1 | | | |
| Threat 2 | | | |
| Threat 3 | | | |
| Threat 4 | | | |
| Threat 5 | | | |

Examples of controls may include:

Preventive  
- parameterized queries  
- input validation  
- least privilege database access

Detective  
- query logging  
- anomaly detection  
- security monitoring

Corrective  
- database backup restoration  
- credential rotation  
- incident response procedures

---

# Reflection Questions

1. Which threat had the highest risk score and why?
2. Which DREAD criteria influenced the final risk score the most?
3. Do you believe DREAD introduces subjectivity into risk evaluation?
4. What architectural changes could eliminate this vulnerability class?

---

## Instructor Solution

The instructor solution for this assignment is available here:

[Instructor Solution](ANSWER_EXE2.md)