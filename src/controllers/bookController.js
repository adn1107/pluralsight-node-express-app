const mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var bookController = (bookService, nav) => {

    var middleware = (req, res, next) => {
        // if (!req.user) {
        //     res.redirect('/');
        // }
        next();
    }

    var getIndex = (req,res) => {
        var url = 'mongodb://adn1107:wav4wind2@ds157475.mlab.com:57475/heroku_33w7rsnn';

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


    };

    var getById = (req,res) => {

        var id = new objectId(req.params.id);

        var url = 'mongodb://adn1107:wav4wind2@ds157475.mlab.com:57475/heroku_33w7rsnn';

        mongodb.connect(url, (err, db) => {

            var collection = db.collection('books');

            collection.findOne({_id: id}, (err, results) => {
                if (results.bookId) {
                    bookService.getBookById(results.bookId, (err, book) => {
                        results.book = book;
                        res.render('bookView', {
                            title: 'Books',
                            nav: nav,
                            book: results
                        });
                    });
                } else {
                    res.render('bookView', {
                        title: 'Books',
                        nav: nav,
                        book: results
                    });

                }


            });

        });
    };

    return {
        middleware: middleware,
        getIndex: getIndex,
        getById: getById
    };

}

module.exports = bookController;
