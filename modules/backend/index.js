
    
if (process.env.NODE_ENV == 'development') {
 require('dotenv').config()
}
    


const express = require('express')
const app = express()
const fs = require('fs')
const port = 3200
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const passportInit = require('./passport-config')
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



function save(params) {
    fs.writeFileSync('data/users.json', JSON.stringify(users))
}





app.get('/users', (req, res) => {
    res.json(users)
    save()
})



app.post('/users/create', async(req, res) => {

   try {
     
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    req.body.password = hashedPassword

       const user = {
           name: req.body.username,
           email: req.body.email,
           password: req.body.password,

           id: Date.now().toString()
       }
       users.push(user)
       save()
       res.status(201).send()
   } catch (error) {
    
    res.status(500).send()
   }
   

})

app.get('/user/dashboard', checkAuthenticated, (req, res) => { 
    res.render('web/dashboard.ejs', { name: req.user.name })

})
app.get("/user/login", checkNotAuthenticated, (req, res) => {

res.render("web/login.ejs")


})

app.post('/users/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/user/dashboard',
    failureRedirect: '/user/login',
    failureFlash: true




}))


function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/user/login')
}
    
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/user/dashboard')
    }
    next()
}
    



app.listen(port, (err) => {
    if (err) {
        console.log(err)
    }

    console.log(` Backend Server started on port ${port}`)
})