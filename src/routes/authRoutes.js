const express = require('express');
const authRouter = express.Router();
const mongodb = require('mongodb').MongoClient;
const passport = require('passport');

var router = function () {

    authRouter.route('/signUp')
        .post((req, res) => {
            console.log(req.body);

            var url = 'mongodb://adn1107:wav4wind2@ds157475.mlab.com:57475/heroku_33w7rsnn';

            mongodb.connect(url, (err, db) => {
                var collection = db.collection('users');

                var user = {
                    username: req.body.userName,
                    password: req.body.password
                };

                collection.insert(user, (err, results) => {
                    req.login(results.ops[0], () => {
                        res.redirect('/auth/profile');
                    });
                });
            });

        });

    authRouter.route('/signIn')
        .post(passport.authenticate('local', {
            failureRedirect: '/'
        }), (req, res) => {
            res.redirect('/auth/profile');
        });

    authRouter.route('/profile')
        .all((req, res, next)=> {
            if (!req.user) {
                res.redirect('/');
            }
            next();
        })
        .get((req, res) => {
            res.json(req.user);
        });

    return authRouter;
};

module.exports = router;