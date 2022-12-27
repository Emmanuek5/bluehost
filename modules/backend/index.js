
    
if (process.env.NODE_ENV == 'development') {
 require('dotenv').config()
}
const database = "mongodb://localhost:27017/bluehost"
const express = require('express')
const app = express()
const fs = require('fs')
const port = 3200
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const passportInit = require('./passport-config')
const mongoose = require('mongoose')
mongoose.connect(database, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.set('strictQuery', true);

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
    console.log('Connected to database')
})
passportInit(passport, email => users.find(user => user.email === email), id => users.find(user => user.id === id))

const users = JSON.parse(fs.readFileSync('data/users.json', 'utf-8'))

//genrate random number
function rand(min, max) {
    var min = min || 0,
        max = max || Number.MAX_SAFE_INTEGER;
       return Math.random() * (max - min + 1) + min;
}
        

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


const userRouter = require('./routes/user')
app.use('/user', userRouter)







app.listen(port, (err) => {
    if (err) {
        console.log(err)
    }

    console.log(` Backend Server started on port ${port}`)
})