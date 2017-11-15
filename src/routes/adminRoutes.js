const express = require('express');
const adminRouter = express.Router();
const mongodb = require('mongodb').MongoClient;

var books = [
    {
        title: 'War and Peace',
        author: 'Andy Nguyen',
        bookId: 656
    },
    {
        title: 'Les Misrables',
        author: 'Andy Nguyen',
        bookId: 24280
    }
];

var router = (nav) => {

    adminRouter.route('/addBooks')
        .get((req,res) => {
            var url = 'mongodb://adn1107:wav4wind2@ds157475.mlab.com:57475/heroku_33w7rsnn';

            mongodb.connect(url, (err, db) => {
                var collection = db.collection('books');
                collection.insertMany(books, (err, results) => {
                    res.send(results);
                });
                db.close();
            });
            // res.send('inserting books');
        });

    return adminRouter;

};

module.exports = router;