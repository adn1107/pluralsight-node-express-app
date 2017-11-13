const express = require('express')

const app = express()
const port = process.env.PORT || 5000

var nav = [{
    Link: '/Books',
    Text: 'Books'
}, {
    Link: '/Authors',
    Text: 'Authors'
}];

const bookRouter = require('./src/routes/bookRoutes')(nav)
const adminRouter = require('./src/routes/adminRoutes')(nav)

//html resources
app.use(express.static('public'))
app.set('views', './src/views')
app.set('view engine', 'ejs')

//app routers
app.use('/Books', bookRouter)
app.use('/Admin', adminRouter)

app.get('/', (req, res) => {
    res.render('index',
        {
        title: 'Hello from render',
        nav: nav
        }
    )
})

app.listen(port, err => {
    console.log(`running server on port ${port}`)
})