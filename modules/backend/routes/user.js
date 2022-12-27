const express = require('express')
const router = express.Router()
const passport = require('passport')
const userSchema = require('../models/user')
const passportInit = require('../passport-config')
passportInit(passport, email => users.find(user => user.email === email), id => users.find(user => user.id === id))
const { checkAuthenticated, checkNotAuthenticated } = require('../functions/authfunc')

const fs = require('fs')
const users = JSON.parse(fs.readFileSync('data/users.json', 'utf-8'))
const bcrypt = require('bcrypt')

function save(params) {
    fs.writeFileSync('data/users.json', JSON.stringify(users))
}



router.get('/list',async(req, res) => {
try {
    const users = await userSchema.find()
    res.send(users)
}catch (error) {
    res.status(500).send()
}



})

router.post('/create', async (req, res) => {

    try {

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        req.body.password = hashedPassword

        const user = new userSchema({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password,

        })
        users.push(user)
        save()
        userSchema.create(user)
        res.status(201).send()

    } catch (error) {

        res.status(500).send()
    }


})

router.get('/dashboard', checkAuthenticated, (req, res) => {
    
    res.render('dashboard.ejs', { name: req.user.name })

})
router.get("/login", checkNotAuthenticated, (req, res) => {

    res.render("login.ejs")


})
//create logout route
router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.status(400).send('Unable to log out')
            } else {
                res.status(200).redirect("/user/login")
            }
        });
    } else {
        res.end()
    }
})


router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/user/dashboard',
    failureRedirect: '/user/login',
    failureFlash: true

}))

router.delete('/delete/:id', async(req, res) => {
    try {
        // 
        const user = await userSchema.findByIdAndDelete(req.params.id)
        if (!user) {
            res.status(404).send()
        }
        res.send(user)

        } catch (error) {
        res.send(500).send()
    }


})



module.exports = router