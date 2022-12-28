if (process.env !== 'undefined') {
    require('dotenv').config()
}
    


const database = "mongodb://localhost:27017/bluehost"
const express = require("express")
const app = express()
const back = require("./modules/backend/index")
const fs = require("fs")
const functions = require("./functions/funtions.js")
const passport = require('passport');
const { url } = require("inspector")
const isset = require("isset-php")
const { execPath } = require("process")
const { exec } = require("child_process")
const flash = require('express-flash')
const session = require('express-session')
const axios = require('axios');
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.set('view-engine', 'ejs')
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false

}))

app.use(passport.initialize())
app.use(passport.session())

//connect to database 

const appdata = functions.file("data/config.json")












if (appdata['mode'] == "development") {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
}
if (appdata['mode'] == "production") {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "https://bluehost.alexandruh.com");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
}
    
if (appdata.id = "undefined") {
    app.get("/", (req, res) => {
        res.render("app.ejs", { name: appdata['name'], port: appdata.port, mode: appdata['mode'], comm: appdata['cport'] })

    })



    app.post("/start", async (req, res) => {
        try {
            const url = 'http://localhost:3200/user/create';
            const data = { username: req.body.username, password: req.body.password, email: req.body.email };
            // Specifying headers in the config object
            const config = { 'content-type': 'application/json' };
            const response = await axios.post(url, data, config);
            console.log(response.data);
            res.redirect("/")

            functions.saver("data/config.json")
        } catch (error) {
            console.error(error);
        }

    })
}
    



fs.readdirSync('routes').forEach(file => {
    if (file.endsWith('.routes.js')) {
     const route = require(`./routes/${file}`)
     const path = `/${file.replace('.routes.js', '')}`
     app.use(path,route)

}})






exports.start = function() { 
    console.log("Starting server...");
}


app.listen(3000, () => {
    console.log("Server is running on port 3000")
})   




