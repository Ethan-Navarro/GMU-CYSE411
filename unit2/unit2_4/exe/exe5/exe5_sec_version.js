app.post("/transfer", (req, res) => {

    // ✅ CSRF Protection
    if (req.body.csrfToken !== req.session.csrfToken) {
        return res.status(403).send("CSRF validation failed");
    }

    // ✅ DO NOT trust client input for ownership
    const from = req.session.userAccount;  

    const to = req.body.toAccount;

    // ✅ Authorization check (extra safety layer)
    if (!userOwnsAccount(req.session.userId, from)) {
        return res.status(403).send("Forbidden");
    }

    transfer(from, to, req.body.amount);

    res.send("Transfer complete");
});