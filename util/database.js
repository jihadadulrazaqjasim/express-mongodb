const Sequelize = require('sequelize')

const sequelize = new Sequelize('node-app', 'root', 'jihad@1234', { dialect: 'mysql', host: 'localhost' })

module.exports = sequelize
