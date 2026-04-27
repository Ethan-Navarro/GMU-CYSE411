const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("db.sqlite");

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)");
    db.run("CREATE TABLE IF NOT EXISTS accounts (id INTEGER PRIMARY KEY, owner INTEGER, balance INTEGER)");

    db.run("INSERT OR IGNORE INTO users VALUES (1, 'alice', 'password')");
    db.run("INSERT OR IGNORE INTO users VALUES (2, 'bob', 'password')");

    db.run("INSERT OR IGNORE INTO accounts VALUES (1, 1, 1000)");
    db.run("INSERT OR IGNORE INTO accounts VALUES (2, 2, 1000)");
});

module.exports = db;
