app.get("/transfer", (req, res) => {
    const csrfToken = crypto.randomBytes(32).toString("hex");
    req.session.csrfToken = csrfToken;
    res.render("transfer", { csrfToken });
});

app.post("/transfer", (req, res) => {
    if (req.body.csrfToken !== req.session.csrfToken) {
        return res.status(403).send("CSRF validation failed");
    }
    // process transfer
});