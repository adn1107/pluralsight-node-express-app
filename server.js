var finalhandler = require('finalhandler')
var http         = require('http')
var Router       = require('router')
var os = require('os')

var router = Router()
router.get('/', function (req, res) {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.end('Hello World!')
})

router.get('/test', function (req, res) {
  res.setHeader('Content-Type', 'text/json; charset=utf-8')
//   res.end(JSON.stringify(os.release() + os.arch()))
  res.end(JSON.stringify(Buffer.isEncoding(process)))
})

var server = http.createServer(function(req, res) {
  router(req, res, finalhandler(req, res))
})

server.listen(3000)

console.log('Server running at http://127.0.0.1:3000/');

// console.log(process.env);


