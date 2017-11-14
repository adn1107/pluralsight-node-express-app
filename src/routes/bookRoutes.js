const express = require('express');
const bookRouter = express.Router();
const mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var router = (nav) => {
    var bookService = require('../services/goodreadsService')();
    const bookController = require('../controllers/bookController')(bookService, nav);

    // is user logged in?? if not, bail out
    bookRouter.use(bookController.middleware);

    bookRouter.route('/')
    .get(bookController.getIndex);

    bookRouter.route('/:id')
    .get(bookController.getById);

    return bookRouter;
};


module.exports = router;
