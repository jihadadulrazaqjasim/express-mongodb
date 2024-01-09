const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const User = sequelize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        notNull:true
    },
    name:{
        type:Sequelize.STRING,
        notNull: true,
    },
    email:{
        type:Sequelize.STRING,
        notNull:true,
        unique:true
    }
})

module.exports = User