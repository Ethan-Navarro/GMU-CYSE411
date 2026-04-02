const express = require('express');
const fs = require('fs');
const app = express();

// SQL Injection
app.get("/user", (req, res) => {
    const query = "SELECT * FROM users WHERE name = '" + req.query.name + "'";
    res.send(query);
});

// XSS
app.get("/profile", (req, res) => {
    res.send("<h1>Welcome " + req.query.name + "</h1>");
});

// Path Traversal
app.get("/file", (req, res) => {
    const filename = req.query.file;
    const data = fs.readFileSync("files/" + filename, "utf8");
    res.send(data);
});

// CSRF-like issue (no validation)
app.post("/transfer", (req, res) => {
    // no CSRF token validation
    res.send("Transfer completed");
});

app.listen(3000, () => console.log("Running"));