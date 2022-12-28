if (process.env !== 'undefined') {
    require('dotenv').config()
}
    



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


routes.push(routesfile)
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.set('view-engine', 'ejs')
app.use(flash())
app.use(session({
    secret: fs.readFileSync('data/secret.txt', 'utf-8'),
    resave: false,
    saveUninitialized: false

}))

app.use(passport.initialize())
app.use(passport.session())


// Web routes

// User routes  

fs.readdirSync('routes').forEach(file => {
    if (file.endsWith('.js')) {
     const route = require(`./routes/${file}`)
     const path = `/${file.replace('.js', '')}`
     app.use(path,route)

}})
// Webhook routes





exports.start = function() { 
    console.log("Starting server...");
}


app.listen(3000, () => {
    console.log("Server is running on port 3000")
})   




