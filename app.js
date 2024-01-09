// packages
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const {faker} = require('@faker-js/faker')

// local
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const errorController = require('./controllers/error')
const sequelize = require('./util/database')

const app = express()
app.set('view engine', 'ejs')
// app.set('views','views') //Not needed

// parse body
app.use(bodyParser.urlencoded({extended: false}))

// serve static content from public folder
app.use(express.static(path.join(__dirname, 'public')))

// middleware to store user in req:
app.use((req, res, next) => {
    User.findAll({order: Sequelize.literal('rand()'), limit: 1})
        .then(users => {
            req.user = users[0]
            next()
        }).catch()
})

// Routes
app.use('/admin', adminRoutes)
app.use(shopRoutes)
app.use(errorController.get404)
