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

    const query = "SELECT * FROM users WHERE username = ? AND password = ?"


    console.log("\nExecuting SQL:")
    console.log(query)

    db.all(query, (err, rows) => {

        if (err) {
            console.log("SQL error:", err.message)
            return res.send("<h2>Database error</h2>")
        }

        if (rows && rows.length > 0) {

            let html = ""

            const injectionText = (username + password).toLowerCase()

            // Only display results if UNION injection is used
            if (injectionText.includes("union")) {

                html += "<h1>Query Results</h1>"
                html += "<h3>Rows returned by database:</h3>"

                rows.forEach(r => {
                    html += "<pre>" + JSON.stringify(r) + "</pre>"
                })

                html += "<hr>"
            }

            html += "<h2>Items</h2>"

            db.all("SELECT * FROM items", (err, items) => {

                if (err) {
                    return res.send("Error loading items")
                }

                items.forEach(i => {
                    html += `<p>${i.name} - $${i.price}</p>`
                })

                res.send(html)

            })

        } else {

            res.send("<h2>Login failed</h2>")

        }

    })

})

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000")
})