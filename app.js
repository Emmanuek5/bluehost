const fs = require("fs")
const test = require("./index")


if(!fs.existsSync("config.json")) {
    const data = {
        "name": "Andrew",
        "id":"",
        "otp":"",
        "url": "http://localhost",
        "status": "Online",
        "cport": "3000",
        "main": "/?",
        "second": "test",
        "mode": "development",
        "urls": {
            "1": "index.ejs",
            "2": "second.ejs"
        }
    }
    fs.writeFileSync("config.json", JSON.stringify(data))
}


test.start("8080","config.json",route = true)
test.routes("config.json")
