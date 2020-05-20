const User = require('../models/user');
const path = require('path')

const userController = {};

userController.signup = function (req, res) {
    const newUser = new User({ username: req.body.username, passwordHash: req.body.password })

    newUser.save((err, u) => {
        if (!err) {
            res.redirect('/');
        }
        else {
            res.render('signup', { error: "what did u do?? try to use a username that's already registered? put an illegal character? figure it out!" })
        }
    });
};

userController.login = function (req, res) {
    User.findOne({ username: req.body.username }, function (err, user) {
        if (err || user == null) {
            res.render('login', { error: "user not found. try again!" });
        }
        else {
            user.comparePassword(req.body.password, function(err, success) {
                if (err) {
                    res.render('login', {error: "pasword wrong"});
                }
                else {
                    // TODO: cookie session blahblah
                    res.redirect('/');
                }
            });
        }
    });
}

module.exports = userController