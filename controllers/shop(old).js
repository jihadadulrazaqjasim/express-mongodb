// const Product = require('../models/product')
// const Cart = require('../models/cart')
//
// exports.show = (req, res) => {
//   Product.findById(req.params.productId).then(([product]) => {
//     res.render('shop/product-detail', {
//       pageTitle: product.title,
//       path: '/products',
//       product: product[0]
//     })
//   }).catch(err => console.log(err))
// }
//
// exports.getProducts = (req, res) => {
//   Product.getAll().then(([rows, fieldData]) => {
//     res.render('shop/product-list', {
//       path: '/products',
//       products: rows,
//       pageTitle: 'All Products'
//     })
//   }).catch(err => console.log(err))
// }
//
// exports.getIndex = (req, res) => {
//   Product.getAll().then(([rows, fieldData]) => {
//     console.log(rows)
//     console.log(fieldData)
//     res.render('shop/index', {
//       path: '/',
//       products: rows,
//       pageTitle: 'My Shop'
//     })
//   }).catch(err => console.log(err))
// }
//
// exports.cart = (req, res) => {
//   Cart.getCart(cart => {
//     Product.getAll().then(([rows, fieldData]) => {
//       const cartProducts = []
//       for (product of rows) {
//         const cartProductData = cart.products.find(cartProduct => cartProduct.id === product.id)
//
//         if (cartProductData) {
//           cartProducts.push({ productData: product, qty: cartProductData.productQty })
//         }
//       }
//
//       return res.render('shop/cart', {
//         pageTitle: 'Your Cart',
//         path: '/cart',
//         products: cartProducts,
//         cartTotal: cart.totalPrice
//       })
//     }).catch(err => console.log(err))
//   })
// }
//
// exports.addToCart = (req, res) => {
//   Product.findById(req.body.productId, (product) => {
//     Cart.addProduct(req.body.productId, product.price)
//     res.redirect('/cart')
//   })
// }
//
// exports.deleteFromCart = (req, res) => {
//   const productId = req.params.id
//   Product.findById(productId, product => {
//     Cart.getCart((cart) => {
//       Cart.decrementOrDeleteProduct(cart, product)
//       res.redirect('/cart')
//     })
//   })
// }
//
// exports.checkout = (req, res) => {
//   return res.render('shop/checkout', {
//     pageTitle: 'Checkout',
//     path: '/checkout'
//   })
// }
//
// exports.getOrders = (req, res) => {
//   return res.render('shop/orders', {
//     pageTitle: 'Orders',
//     path: '/orders'
//   })
// }
