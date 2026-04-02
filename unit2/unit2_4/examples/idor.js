// Vulnerable Code
app.get("/account/:id", (req, res) => {
    db.get("SELECT * FROM accounts WHERE id = ?", [req.params.id], (err, data) => {
        res.json(data);
    });
});


// Fix
if (req.session.userId !== req.params.id) {
    return res.status(403).send("Forbidden");
}