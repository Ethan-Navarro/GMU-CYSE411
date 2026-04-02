// routes/transfer.js (SECURE + COMMENTED)
const express = require("express");
const router = express.Router();
const db = require("../utils/db");

function userOwnsAccount(userId, accountId, callback) {
    db.get("SELECT * FROM accounts WHERE id=? AND owner=?", [accountId, userId], (err, row) => {
        callback(!!row);
    });
}

router.post("/transfer", (req, res) => {

    if (req.body.csrfToken !== req.session.csrfToken) {
        return res.status(403).send("CSRF validation failed");
    }

    const from = req.session.userAccount;
    const to = req.body.toAccount;
    const amount = parseInt(req.body.amount);

    if (amount <= 0) {
        return res.status(400).send("Invalid amount");
    }

    userOwnsAccount(req.session.userId, from, (owns) => {
        if (!owns) {
            return res.status(403).send("Unauthorized");
        }

        db.run("UPDATE accounts SET balance = balance - ? WHERE id=?", [amount, from]);
        db.run("UPDATE accounts SET balance = balance + ? WHERE id=?", [amount, to]);

        res.send("Transfer complete");
    });
});

module.exports = router;
