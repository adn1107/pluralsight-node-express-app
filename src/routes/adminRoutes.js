const express = require('express');
const adminRouter = express.Router();
const mongodb = require('mongodb').MongoClient;

var books = [
    {
        title: 'War and Peace',
        author: 'Andy Nguyen'
    },
    {
        title: 'War and Peace - final chapter',
        author: 'Andy Nguyen'
    },
    {
        title: 'War and Peace - the sequel',
        author: 'Andy Nguyen'
    }
];

var router = (nav) => {

    adminRouter.route('/addBooks')
        .get((req,res) => {
            var url = 'mongodb://localhost:27017/libraryApp';

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

}

module.exports = router;