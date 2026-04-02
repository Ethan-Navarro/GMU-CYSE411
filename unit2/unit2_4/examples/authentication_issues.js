//Weak Password Handling
db.get("SELECT * FROM users WHERE username=? AND password=?", [u, p]);

//Weak Password Handling fix 
const bcrypt = require("bcrypt");
const match = await bcrypt.compare(password, user.passwordHash);

//No Rate Limiting
app.post("/login", (req, res) => {
    // no protection
});

//Secure Fix
const rateLimit = require("express-rate-limit");

app.use("/login", rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5
}));

//Session Fixation
req.session.user = username;

//Session Fixation fix
req.session.regenerate(() => {
    req.session.user = username;
});
