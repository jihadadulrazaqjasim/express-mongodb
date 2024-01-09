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

// Models
const User = require('./models/user')
const Product = require('./models/product')
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')
const {Sequelize} = require('sequelize')
const Order = require("./models/order");
const OrderItem = require("./models/order-item");

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

// Define relationship:
Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE', foreignKey: 'createdBy'})
User.hasMany(Product, {foreignKey: 'createdBy'})

Cart.belongsTo(User)
User.hasOne(Cart)

Cart.belongsToMany(Product, {through: CartItem})
Product.belongsToMany(Cart, {through: CartItem})

//User & Order
User.hasMany(Order, {constraints: true, onDelete: 'CASCADE'})
Order.belongsTo(User)


//Order & Product
Order.belongsToMany(Product, {through: OrderItem})
Product.belongsToMany(Order, {through: OrderItem})

sequelize
    // .sync({force: true})
    .sync()
    .then((result) => {
        return User.findAll({order: Sequelize.literal('rand()'), limit: 1})
        // return User.findOrCreate({where: {id: 1},defaults:{name:'Jihad',email:'jihadabdulrazaq@gmail.com'}})
    })
    .then(users => {
        if (users[0] == null) {
            return User.create({name: faker.person.firstName(), email: faker.internet.email()})
        }
        return Promise.resolve(users[0])
    })
    .then(user => {
        // return user.createCart()
    })
    .then(result => {
        app.listen(3000)
    })
    .catch(err => console.log(err))
