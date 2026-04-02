// Vulnerable Code
app.post("/transfer", (req, res) => {
    transfer(req.body.fromAccount, req.body.toAccount, req.body.amount);
});

//Fix
const fromAccount = req.session.userAccount;
const toAccount = req.body.toAccount;
const amount = req.body.amount;

