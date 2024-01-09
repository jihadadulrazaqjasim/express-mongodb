const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const Order = sequelize.define('order', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        notNull: true
    },
})
module.exports = Order