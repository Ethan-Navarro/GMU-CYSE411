app.post("/transfer", (req, res) => {

    // ❌ Parameter Tampering:
    // The attacker controls "fromAccount"
    // They can change it to someone else's account
    const from = req.body.fromAccount;

    // ❌ Parameter Tampering:
    // Destination is also controlled by the attacker
    const to = req.body.toAccount;

    // ❌ Broken Access Control:
    // The system does NOT verify that "from" belongs to the logged-in user
    // No ownership validation

    // ❌ CSRF:
    // No CSRF token or origin validation
    // The server trusts any request with a valid session cookie

    transfer(from, to, req.body.amount);

    res.send("Transfer complete");
});