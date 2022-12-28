const fs = require("fs")
const test = require("./index")


if(!fs.existsSync("data/config.json")) {
    const data = [{
    "name": "Andrew",
    "id": 83640454462,
    "db_url": "mongodb://localhost:27017/test",
    "otp": 28404815499,
    "url": "http://localhost",
    "status": "Online",
    "cport": "3200",
    "main": "/?",
    "second": "test",
    "mode": "development"
}]
    fs.writeFileSync("data/config.json", JSON.stringify(data))
}


test.start("8080","data/config.json",route = true)

