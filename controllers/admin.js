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

//I will make some changes to this file
exports.store = (req, res) => {
  const reqBody = req.body
  const title = reqBody.title
  const description = reqBody.description
  const imageUrl = reqBody.imageUrl
  const price = reqBody.price

  req.user.createProduct({
    title,
    description,
    imageUrl,
    price
    // createdBy:req.user.id
  }).then((product, second) => {
    console.log(product.dataValues)
    res.redirect('/admin/products')
  }).catch(err => console.log('error on insert: ' + err))
}

exports.getProducts = (req, res) => {
  // 1-All products associated with this particular user
  req.user.getProducts().then(products => {
    res.render('admin/products', {
      path: '/admin/products',
      products,
      pageTitle: 'Admin Products'
    })
  }).catch(err => console.log(err))

  // 2-All products.
  // Product.findAll().then((products)=>{
  //         res.render('admin/products', {
  //             path:'/admin/products',
  //             products:products,
  //             pageTitle:'Admin Products',
  //         });
  //     }).catch(err=>console.log(err))
}

exports.editProduct = (req, res) => {
  const editMode = req.query.edit
  if (!editMode) {
    return res.redirect('/')
  }

  const productId = req.params.id
  // 1-Using user model to get the associated product with that user.
  req.user.getProducts({ where: { id: productId } }).then(products => {
    const product = products[0]

    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product
    })
  }).catch(err => console.log(err))

  // 2-Without user restriction.
  // Product.findOne({where:{id:productId}}).then(product => {
  //         res.render('admin/edit-product',{
  //             pageTitle:'Edit Product',
  //             path:'/admin/edit-product',
  //             editing:editMode,
  //             product:product
  //         })
  // }).catch(err=>console.log(err))
}

exports.updateProduct = (req, res) => {
  const productId = req.params.id

  // 1-Using update method with options:
  Product.update({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    imageUrl: req.body.imageUrl
  }, {
    where: { id: productId }
  })
    .then(r => {
      console.log(r)
      res.redirect('/admin/products')
    }).catch(err => console.log(err))
    // 2-Using findOne() and save() methods:
    // Product.findOne({where:{id:productId}})
    //     .then((product)=>{
    //         product.title=req.body.title
    //         product.description=req.body.description
    //         product.price=req.body.price
    //         product.imageUrl=req.body.imageUrl
    //         return product.save()
    // }).then((result)=>res.redirect('/admin/products')
    // ).catch(err=>console.log(err))

  // 3-Using findByPk() and save():
  // Product.findByPk(productId).then((product)=>{
  //         product.title=req.body.title
  //         product.description=req.body.description
  //         product.price=req.body.price
  //         product.imageUrl=req.body.imageUrl
  //        return product.save()
  // }).then((result)=>res.redirect('/admin/products')).catch(err=>console.log(err))
}

exports.destroyProduct = (req, res) => {
  const id = req.params.id
  // Product.destroy({where:{id:id}}).then((result)=>{
  //     console.log(result)
  //     res.redirect('/admin/products')
  // }).catch(err=>console.log(err))

  Product.findByPk(id).then((product) => {
    return product.destroy() // note we're returning the promise then handling in the next then
  }).then((result) => res.redirect('/admin/products'))
    .catch(err => console.log(err))
}
