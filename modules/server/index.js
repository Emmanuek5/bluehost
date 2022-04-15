const express = require("express")
const app = express()
const isset = require("isset-php")
function save(id) {

}
exports.communicate = function communicate(port,data) {

    app.get("/:id", (req, res) => {
        res.send("<h1>You Are Using Communicator</h1>")
        console.log("+1 Request")
        if (isset(()=> req.body.id)) {
            res.send(data)
        }
    })
    app.get("/status",(req,res)=>{
        res.send("Online")
    })
    app.listen(port, () => {
        console.log("Communicator on port " + port)
    })

}
