const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const CartItem = sequelize.define('cartItem', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        notNull: true
    },
    quantity: {
        type: Sequelize.INTEGER,
        notNull: true
    }
})

module.exports = CartItem
