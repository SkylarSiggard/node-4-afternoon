require('dotenv').config()
const express = require('express')
const session = require('express-session')
const app = express()
const swagCtrl = require('./controller/swagController')
const authCtrl = require('./controller/authController')
const cartCtrl = require('./controller/cartController')
const searchCtrl = require('./controller/searchController')
const {PORT ,SESSION_SECRET} = process.env
const checkForSession = require('./middleware/checkForSession')


app.use(express.json())
app.use( 
    session({
        resave: false,
        saveUninitialized: true,
        secret: SESSION_SECRET,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 10
        }
    })
)
app.use(checkForSession.checker)
app.use(express.static(`${__dirname}/../build`))
//auth
app.post('/api/register', authCtrl.register)
app.post('/api/login', authCtrl.login)
app.post('/api/signout', authCtrl.signout)
app.get('/api/user', authCtrl.getUser)
//swag
app.get('/api/swag', swagCtrl.read)
//cart
app.post('/api/cart/checkout', cartCtrl.checkout)
app.post(`/api/cart/:id`, cartCtrl.add)
app.delete(`/api/cart/:id`, cartCtrl.delete)
//search 
app.get('/api/search', searchCtrl.search)


app.listen(PORT, () => console.log(`server running on ${PORT} my dude`))
