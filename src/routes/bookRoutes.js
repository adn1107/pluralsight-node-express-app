const express = require('express');
const bookRouter = express.Router();
const mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var router = (nav) => {

    bookRouter.route('/')
    .get((req,res) => {
        var url = 'mongodb://localhost:27017/libraryApp';

        mongodb.connect(url, (err, db) => {

            var collection = db.collection('books');

            collection.find({}).toArray((err, results) => {
                res.render('bookListView', {
                    title: 'Books',
                    nav: nav,
                    books: results
                });

            });

        });


    });

    bookRouter.route('/:id')
    .get((req,res) => {

        var id = new objectId(req.params.id);

        var url = 'mongodb://localhost:27017/libraryApp';

        mongodb.connect(url, (err, db) => {

            var collection = db.collection('books');

            collection.findOne({_id: id}, (err, results) => {
                res.render('bookView', {
                    title: 'Books',
                    nav: nav,
                    book: results
                });

            });

        });
    });

    return bookRouter;
};


module.exports = router;
