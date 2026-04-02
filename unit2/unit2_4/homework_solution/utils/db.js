// utils/db.js (SECURE + COMMENTED)
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");

const db = new sqlite3.Database("db.sqlite");

db.serialize(async () => {

    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT, role TEXT)");
    db.run("CREATE TABLE IF NOT EXISTS accounts (id INTEGER PRIMARY KEY, owner INTEGER, balance INTEGER)");

    const hash = await bcrypt.hash("password", 10);

    db.run("INSERT OR IGNORE INTO users VALUES (1, 'alice', ?, 'user')", [hash]);
    db.run("INSERT OR IGNORE INTO users VALUES (2, 'admin', ?, 'admin')", [hash]);

    db.run("INSERT OR IGNORE INTO accounts VALUES (1, 1, 1000)");
    db.run("INSERT OR IGNORE INTO accounts VALUES (2, 2, 2000)");
});

module.exports = db;
