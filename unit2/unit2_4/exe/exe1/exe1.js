app.post("/transfer", (req, res) => {
    const user = req.session.user;
    transfer(user, req.body.to, req.body.amount);
});