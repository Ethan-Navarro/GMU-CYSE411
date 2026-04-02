// routes/auth.js (SECURE + COMMENTED)
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../utils/db");

router.post("/login", (req, res) => {
    const { username, password } = req.body;

    db.get("SELECT * FROM users WHERE username=?", [username], async (err, user) => {

        if (!user) return res.send("Login failed");

        const match = await bcrypt.compare(password, user.password);

        if (!match) return res.send("Login failed");

        req.session.regenerate(() => {
            req.session.user = user.username;
            req.session.userId = user.id;
            req.session.role = user.role;
            res.redirect("/dashboard.html");
        });
    });
});

module.exports = router;
