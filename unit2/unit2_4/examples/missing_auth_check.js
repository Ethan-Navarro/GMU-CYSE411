//missing authentication check
app.get("/admin", (req, res) => {
    if (req.session.user) {
        res.send("Welcome Admin");
    }
});

//Missing Authentication Check fix
if (req.session.user && req.session.role === "admin") {
    res.send("Welcome Admin");
} else {
    res.status(403).send("Forbidden");
}