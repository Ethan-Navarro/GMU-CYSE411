app.post("/login", (req, res) => {
    req.session.user = username;
});