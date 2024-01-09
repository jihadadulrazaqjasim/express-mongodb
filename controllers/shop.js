const Product = require('../models/product')

exports.show = (req, res) => {
    Product.findByPk(req.params.productId).then((product) => {
        res.render('shop/product-detail', {
            pageTitle: product.title,
            path: '/products',
            product
        })
    }).catch(err => {
        console.log(err)
    })
}

exports.getProducts = (req, res) => {
    Product.findAll().then((products) => {
        res.render('shop/product-list', {
            path: '/products',
            products,
            pageTitle: 'All Products'
        })
    }).catch(err => console.log(err))
}

exports.getIndex = (req, res) => {
    Product.findAll().then((products) => {
        res.render('shop/index', {
            path: '/',
            products,
            pageTitle: 'My Shop'
        })
    }).catch(err => console.log(err))
}

exports.cart = (req, res) => {
    req.user.getCart()
        .then(cart => {
            if (cart == null) return [];
            return cart.getProducts()
        })
        .then((products) => {
            products = products == null ? [] : products
            return res.render('shop/cart', {
                pageTitle: 'Your Cart',
                path: '/cart',
                products,
                // cartTotal: 1000
            })
        })
        .catch(err => console.log(err))
}

exports.addToCart = (req, res) => {
    let fetchedCart;
    const productId = req.body.productId
    let newQuantity = 1
    req.user.getCart()
        .then(cart => {
            fetchedCart = cart
            return cart.getProducts({where: {id: productId}})
        })
        .then(products => {
            let product
            if (products.length > 0) {
                product = products[0]
            }
            if (product) {
                newQuantity = product.cartItem.quantity + 1
                return product;
            }
            return Product.findByPk(productId)
        })
        .then(product => {
            return fetchedCart.addProduct(product, {through: {quantity: newQuantity}})
        })
        .then(() => {
            res.redirect('/cart')
        })
        .catch(err => console.log(err))
}

exports.deleteFromCart = (req, res) => {
    const productId = req.params.id
    let fetchedCart;
    req.user.getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts({where: {id: productId}})
        })
        .then(products => {
            const product = products[0]
            return fetchedCart.removeProduct(product)

            //OR
            // return product.cartItem.destroy()
        })
        .then(() => {
            res.redirect('/cart')
        })
        .catch(err => console.log(err))
}

exports.checkout = (req, res) => {
    return res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout'
    })
}

exports.getOrders = (req, res) => {
    req.user.getOrders({include: ['products']})
        .then(orders => {
            console.log(JSON.stringify(orders))
            return res.render('shop/orders', {
                pageTitle: 'Orders',
                path: '/orders',
                orders,
            })
        }).catch(err => console.log(err))

}

exports.storeOrder = (req, res) => {
    let createdOrder
    let fetchedCart
    req.user.createOrder()
        .then(order => {
            createdOrder = order
            return req.user.getCart()
        })
        .then(cart => {
            fetchedCart = cart
            return cart.getProducts()
        })
        .then(cartProducts => {
            return createdOrder.addProducts(
                cartProducts.map(product => {
                    product.orderItem = {quantity: product.cartItem.quantity}
                    return product
                }))
        })
        .then(result => fetchedCart.setProducts(null))
        .then(result => {
            res.redirect('/orders')
        })
        .catch(err => console.log(err))
}