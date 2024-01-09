const Product = require('../models/product')

exports.create = (req, res) => {
  return res.render('admin/edit-product',
    {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      product: {},
      editing: false
    })
}

exports.store = (req, res) => {
  const reqBody = req.body
  const title = reqBody.title
  const description = reqBody.description
  const imageUrl = reqBody.imageUrl
  const price = reqBody.price
  const product = new Product(title, description, imageUrl, price)
  product.create().then(() => {
    res.redirect('/admin/products')
  }
  ).catch(err => console.log(err))
}

exports.getProducts = (req, res) => {
  Product.getAll().then(([rows, fieldData]) => {
    res.render('admin/products', {
      path: '/admin/products',
      products: rows,
      pageTitle: 'Admin Products'
    })
  }).catch(err => console.log(err))
}

exports.editProduct = (req, res) => {
  const editMode = req.query.edit
  const id = req.params.id
  if (!editMode) {
    return res.redirect('/')
  }

  Product.findById(id).then(([product]) => {
    if (product.length < 1) res.redirect('/admin/products')
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product[0]
    })
  }).catch(err => console.log(err))
}

exports.updateProduct = (req, res) => {
  const id = req.params.id
  Product.update(id, { title: req.body.title, description: req.body.description, price: req.body.price, imageUrl: req.body.imageUrl })
    .then((result) => {
      console.log(result[0].affectedRows > 0)
      res.redirect('/admin/products')
    }).catch(err => console.log(err))
}

exports.destroyProduct = (req, res) => {
  const id = req.params.id
  Product.destroyById(id).then((result) => {
    console.log(result[0].affectedRows > 0)
    res.redirect('/admin/products')
  }).catch(err => console.log(err))
}
