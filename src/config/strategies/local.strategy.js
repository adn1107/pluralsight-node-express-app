const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongodb = require('mongodb').MongoClient;

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'userName',
        passwordField: 'password'
    },
    (username, password, done) => {

        var url = 'mongodb://adn1107:wav4wind2@ds157475.mlab.com:57475/heroku_33w7rsnn';

        console.log(`password is ${password}`);

        mongodb.connect(url, (err, db) => {

            var collection = db.collection('users');
            collection.findOne({
                username: username
            },
            (err, results) => {
                if (results.password === password) {
                    var user = results;
                    done(null, user);
                } else {
                    done('Bad password', null);
                }
            });
        });
    }));
};
