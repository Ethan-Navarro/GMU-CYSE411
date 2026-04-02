// server.js (Instructor Secure Version - COMMENTED)
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");

const authRoutes = require("./routes/auth");
const transferRoutes = require("./routes/transfer");
const adminRoutes = require("./routes/admin");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret: "very_secure_secret",
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, sameSite: "Lax" }
}));

app.use(express.static("views"));

app.use("/", authRoutes);
app.use("/", transferRoutes);
app.use("/", adminRoutes);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views/login.html"));
});

app.listen(3000, () => console.log("Secure server running on 3000"));
