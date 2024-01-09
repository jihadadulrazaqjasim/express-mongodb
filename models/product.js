const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL(12, 2),
    allowNull: false
  },
  description: Sequelize.TEXT('medium'),
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Product
