const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");

const authRoutes = require("./routes/auth");
const transferRoutes = require("./routes/transfer");
const adminRoutes = require("./routes/admin");
const db = require("./utils/db");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret: "secret123",
    resave: false,
    saveUninitialized: true
}));

// Serve static HTML
app.use(express.static("views"));

app.use("/", authRoutes);
app.use("/", transferRoutes);
app.use("/", adminRoutes);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views/login.html"));
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
