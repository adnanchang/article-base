/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const passport = require('passport');

module.exports = {
    //Login
    login: function(req, res){
        passport.authenticate('local', function(err, user, info){
            if (err || !user){
                return res.send({message: info.message, user});
            }

            req.login(user, function(err){
                if (err) res.send(err);
                sails.log('User ' + user.id + 'has logged in');
                return res.redirect('/');
            })
        })(req, res);
    },

    //Logout
    logout: function(req, res) {
        req.logout();
        res.redirect('/');
    },

    //Register
    register: function(req, res){
        //TODO: Form validation here

        data = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            description: req.body.description
        }

        User.create(data).exec(function (err, user){
            if (err) return res.negotiate(err);

            //TODO: Maybe send confirmation email
            req.login(user, function(err){
                if (err) res.send(err);
                sails.log('User ' + user.id + 'has logged in');
                return res.redirect('/');
            })
        })
    }
};

