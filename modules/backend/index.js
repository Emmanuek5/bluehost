const express = require('express')
const app = express()
const fs = require('fs')
const port = 3200
const bcrypt = require('bcrypt')

const users = JSON.parse(fs.readFileSync('data/users.json', 'utf-8'))


app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.set('view-engine', 'ejs')

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

app.get("/user/login", (req, res) => {

res.render("web/login.ejs")


})

app.post('/users/login', async(req, res) => {

    const user = users.find(user => user.name === req.body.username)
    if (user == null) {
        return res.status(400).send('User not found')
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send('Success')
        } else {
            res.send('Wrong password')
        }
    } catch (error) {
        res.status(500).send()
    }


})


app.listen(port, (err) => {
    if (err) {
        console.log(err)
    }
    console.log(app.routes)
    console.log(` Backend Server started on port ${port}`)
})