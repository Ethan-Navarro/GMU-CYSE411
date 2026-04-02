app.get("/account/:id", (req, res) => {
    db.get("SELECT * FROM accounts WHERE id = ?", [req.params.id], (err, data) => {
        res.json(data);
    });
});