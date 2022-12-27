const mongoose = require('mongoose');
//add passport-local-mongoose to the userSchema



const  userSchema = new mongoose.Schema({  

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema)