app.post("/transfer", (req, res) => {
    const from = req.body.fromAccount;
    const to = req.body.toAccount;

    transfer(from, to, req.body.amount);
    
    res.send("Transfer complete");
});