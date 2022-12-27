

const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const userSchema = require('./models/user.js')


module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            // Match user
            userSchema.findOne({
                email: email
            }).then(user => {
                if (!user) {
                    return done(null, false, { message: 'That email is not registered' });
                }

                // Match password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Password incorrect' });
                    }
                });
            })
                .catch(err => console.log(err));
        })
    );

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        userSchema.findById(id, function (err, user) {
            done(err, user);
        });
    });

}


