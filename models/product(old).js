// // const Cart = require('./cart')
// const db = require('../util/database')
//
// module.exports = class Product {
//   constructor (title, description, imageUrl, price) {
//     this.title = title
//     this.description = description
//     this.imageUrl = imageUrl
//     this.price = price
//   }
//
//   create () {
//     return db.execute('INSERT INTO products (title,price,description,imageUrl) VALUES (?,?,?,?)', [
//       this.title, this.price, this.description, this.imageUrl
//     ])
//   }
//
//   static getAll () {
//     return db.execute('SELECT * FROM products')
//   }
//
//   static findById (id) {
//     return db.execute('SELECT * FROM products WHERE id=?', [id])
//   }
//
//   static update (id, data) {
//     return db.execute('UPDATE products SET title=?,price=?,description=?,imageUrl=? WHERE id=?', [
//       data.title, data.price, data.description, data.imageUrl, id
//     ])
//   }
//
//   static destroyById (id) {
//     return db.execute('DELETE FROM products WHERE id=?', [id])
//   }
// }
