# CYSE 411 – Secure Coding Assignment (Unit 2.4)

## 🎯 Objective

This assignment provides a **realistic vulnerable web application**.

Your goal is to:

1. Explore the system
2. Identify security vulnerabilities
3. Explain how they can be exploited
4. Fix the system using secure coding practices

---

## ⚠️ Important

This system is intentionally vulnerable.

You are NOT expected to attack external systems.
All testing must be done locally.

---

## 🚀 Setup

```bash
npm install
node server.js

Open: http://localhost:3000

```

## 🧭 Your Task

You must:

### 1. Identify vulnerabilities

For each vulnerability:

- Describe the issue

- Explain how it can be exploited

- Classify it (CSRF, Access Control, etc.)

___


### 2. Fix the system

You must modify the code to:

- Prevent CSRF attacks

- Secure authentication

- Fix access control issues

- Prevent business logic abuse


## 🔍 Hints (Read Carefully)

- Does the server verify who owns a resource?

- Does the server trust user input too much?

- What does the browser send automatically?

- Can a request be triggered without user intent?

- Are sessions handled securely?

___

## 📚 Suggested Improvements

### 🔐 Password Security

Use bcrypt for password hashing: https://www.npmjs.com/package/bcrypt

Basic example:

```bash
const bcrypt = require("bcrypt");

const hash = await bcrypt.hash(password, 10);
const match = await bcrypt.compare(password, hash);
```
___

### 🔒 CSRF Protection

You may implement:

- Token-based protection

- OR use middleware such as csurf

Reference: https://www.npmjs.com/package/csurf

___

### 🛡️ Rate Limiting

Use express-rate-limit: https://www.npmjs.com/package/express-rate-limit

___

### 🔁 Session Security

Ensure:

- Session regeneration after login

- Secure cookies (HttpOnly, SameSite)

---

## 🧠 Final Thought

This assignment is not about breaking systems.

It is about understanding why systems fail and how to build them securely.