const express = require("express")
const app = express()
  
function save(id) {
var xml = new XMLHttpRequest
xml.open("get","https://accessapi.cf/store.php")
xml.onload    

}
exports.communicate = function communicate(port) {

    app.get("/:id", (req, res) => {
        res.send("communicator")
        console.log("+1 Request")
    })
    app.get("/status",(req,res)=>{
        res.send("Online")
    })
    app.listen(port, () => {
        console.log("Communicator on port " + port)
    })

}
