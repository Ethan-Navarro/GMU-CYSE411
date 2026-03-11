const express = require("express")
const sqlite3 = require("sqlite3").verbose()
const bodyParser = require("body-parser")

const app = express()
const db = new sqlite3.Database("portal.db")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

app.post("/login", (req, res) => {

    const username = req.body.username
    const password = req.body.password

    const query =
        "SELECT * FROM users WHERE username = '" +
        username +
        "' AND password = '" +
        password +
        "'"

    db.all(query, (err, rows) => {

        if (rows.length > 0) {

            db.all("SELECT * FROM items", (err, items) => {

                let html = "<h1>Items</h1>"

                items.forEach(i => {
                    html += `<p>${i.name} - $${i.price}</p>`
                })

                res.send(html)

            })

        } else {
            res.send("Login failed")
        }

    })

})

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000")
})