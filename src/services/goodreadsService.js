const http = require('http');
const xml2js = require('xml2js');
var parser = xml2js.Parser({explicitArray: false});


var goodreadsService = (params) => {

    var getBookById = (id, cb) => {

        var options ={
            host: 'www.goodreads.com',
            path: '/book/show/' + id + '?format=xml&key=61ylkmn0al8eSwjuOphWlA'
        };

        var callback = (response) => {
            var str = '';

            response.on('data', (chunk) => {
                str += chunk;

            });
            response.on('end', () => {

                // console.log(str);
                parser.parseString(str, (err, result) => {
                    cb(null, result.GoodreadsResponse.book);
                });
            });

        };


        http.request(options, callback).end();
    };


    return {
        getBookById: getBookById
    };


};

module.exports = goodreadsService;
