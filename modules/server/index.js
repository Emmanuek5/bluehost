const express = require("express")
const app = express()
const isset = require("isset-php")
const fs = require("fs")
const jas = []

app.set('view-engine', 'ejs')

app.use(express.urlencoded({ extended: false }))
function save(id) {

}
const file = "./node_modules/bluehost/modules/server/requests.json"

exports.communicate = function communicate(port, data) {

    app.get("/", (req, res) => {



        console.log("+1 Request")
        if (isset(() => req.query.id)) {
            var id = req.query.id
            if (id == data['id']) {


                res.json(data)
                const tmp = {
                    "location": req.headers.host,
                    "ip": req.ip,
                    "Method": req.method,
                    "Host": req.headers.host,
                    "id": data['id']
                }
                var newtmp = JSON.stringify(tmp)
                // fs.writeFileSync
                jas.push(tmp)
                console.log(tmp)
                jaass = k = JSON.stringify(jas)
                fs.writeFileSync(file, jaass, "utf-8")
            } else {
                res.status(500).send("Id Incorrect")
            }
        } else {
            res.send("<h1>You Are Using Communicator</h1>")
        }
    })
    app.get("/status", (req, res) => {

        res.send("Online" + req.query.name)
    })
    app.listen(port, () => {
        console.log("Communicator on port " + port)
    })

}
