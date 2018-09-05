const encryption = require("../utilities/encryption");
const User = require('../models').User;
const passport = require('passport');

module.exports = {
    registerGet: (req, res) => {
        res.render('user/register');
    },

    registerPost:(req, res) => {
        let registerArgs = req.body;

        User.findOne({ where: {email: registerArgs.email}}).then(user => {
            let errorMsg = '';
            if (user) {
                errorMsg = 'User with the same username exists!';
            } else if (registerArgs.password !== registerArgs.repeatedPassword) {
                errorMsg = 'Passwords do not match!'
            }

            if (errorMsg) {
                registerArgs.error = errorMsg;
                res.render('user/register', registerArgs)
            } else {
                let salt = encryption.generateSalt();
                let passwordHash = encryption.hashPassword(registerArgs.password, salt);

                let userObject = {
                    email: registerArgs.email,
                    passwordHash: passwordHash,
                    fullName: registerArgs.fullName,
                    salt: salt,
                    birthday: registerArgs.birthday,
                    username: registerArgs.email.substr(0, registerArgs.email.indexOf('@')),
                };

                User.create(userObject).then(user => {
                    req.logIn(user, (err) => {
                        if (err) {
                            registerArgs.error = err.message;
                            res.render('user/register', registerArgs);
                            return;
                        }
                        res.redirect('/posts/create');
                    });
                });
            }
        })
    },

    loginGet: (req, res) => {
        res.render('user/login');
    },

    loginPost: (req, res) => {
        let loginArgs = req.body;

        User.findOne({where:{email: loginArgs.email}}).then(user => {
            if (!user ||!passport.authenticate('local')) {
                loginArgs.error = 'Either username or password is invalid!';
                res.render('user/login', loginArgs);
                console.log(loginArgs);
                return;
            }

            req.logIn(user, (err) => {
                if (err) {
                    console.log(err);
                    res.redirect('/user/login', {error: err.message});
                    return;
                }

                res.redirect('/posts/create');
            })
        })
    },
    loggedIn: (req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.redirect('user/login');
        }
    },

    logout: (req, res) => {
        req.logOut();
        res.redirect('/');
    }
};