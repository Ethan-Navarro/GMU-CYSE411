// routes/admin.js (SECURE + COMMENTED)
const express = require("express");
const router = express.Router();

router.get("/admin", (req, res) => {

    if (!req.session.user) {
        return res.status(401).send("Not authenticated");
    }

    if (req.session.role !== "admin") {
        return res.status(403).send("Forbidden");
    }

    res.send("Admin panel");
});

module.exports = router;
