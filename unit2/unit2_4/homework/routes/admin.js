const express = require("express");
const router = express.Router();

router.get("/admin", (req, res) => {
    if (req.session.user) {
        res.send("Admin panel");
    } else {
        res.status(401).send("Not logged in");
    }
});

module.exports = router;
