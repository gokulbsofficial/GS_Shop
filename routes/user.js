const { response } = require('express');
var express = require('express');
var router = express.Router();
const adminHelpers = require('../helpers/admin-helpers');
const userHelpers = require('../helpers/user-helpers')
const verifyLogin = ((req, res, next) => {
  if (req.session.userLoggedIn) {
    next()
  } else {
    res.redirect('/login')
  }
})

/* GET home page. */
router.get('/', async function (req, res, next) {
  let user = req.session.user
  let cartCount = 0
  if (req.session.user) {
    cartCount = await userHelpers.getCartCount(req.session.user._id)
  }
  let trendingProds = await userHelpers.getTrendingProducts()
  let featuredProds = await userHelpers.getFeaturedProducts()
  let specialProds = await userHelpers.getSpecialProducts()
  adminHelpers.getAllProducts().then((products) => {
    res.render('user/home', { products, trendingProds, featuredProds, specialProds, user, cartCount, EcommerceDesign: true, Guest: true })
  })
});
router.get('/view-product/:id', async (req, res) => {
  let user = req.session.user
  let cartCount = 0
  let trendingProds = await userHelpers.getTrendingProducts()
  let proDetails = await userHelpers.getProductView(req.params.id)
  if (req.session.user) {
    cartCount = await userHelpers.getCartCount(req.session.user._id)
    cartDetails = await userHelpers.getCartProducts(req.session.user._id, req.params.id)
  }
  adminHelpers.getAllProducts().then((products) => {
    res.render('user/view-product', { trendingProds, proDetails, products, user, cartCount, EcommerceDesign: true ,Guest: true})
  })
})
router.get('/login', (req, res) => {
  if (req.session.user) {
    response.redirect('/')
  } else {

    res.render('user/login', { 'loginErr': req.session.userLoginErr, noneHeader: true })
    req.session.userLoginErr = false
  }
})
router.get('/signup', (req, res) => {
  if (req.session.user) {
    res.render('user/signup')
  } else {
    res.render('user/signup', { 'signupErr': req.session.userSignupErr, noneHeader: true })
    req.session.userSignupErr = false
  }
})
router.post('/signup', (req, res) => {
  userHelpers.doSignup(req.body).then((response) => {
    if (response.status == false) {
      req.session.userSignupErr = 'Account already exist'
      res.redirect('/signup')
    } else {
      req.session.user = response
      req.session.userLoggedIn = true
      res.redirect('/')
    }
  })
})
router.post('/login', (req, res) => {
  userHelpers.doLogin(req.body).then((response) => {
    if (response.status) {
      req.session.user = response.user
      req.session.userLoggedIn = true
      res.redirect('/')
    } else {
      req.session.userLoginErr = 'Invalid username or password'
      res.redirect('/login')
    }
  })
})
router.get('/logout', (req, res) => {
  req.session.user = null
  req.session.userLoggedIn = false
  res.redirect('/')
})
router.get('/profile', verifyLogin, async (req, res) => {
  let userDetails = await userHelpers.getUserDetails(req.session.user._id)
  res.render('user/profile', { userDetails, user: req.session.user, EcommerceDesign: true })
})
router.post('/profile/:id', (req, res) => {
  console.log(req.params.id, req.body);
  userHelpers.editProfile(req.params.id, req.body).then((response) => {
    res.redirect('/profile')
  })
})
router.get('/cart', verifyLogin, async (req, res) => {
  let products = await userHelpers.getCartProducts(req.session.user._id)
  let totalValue = 0
  cartCount = await userHelpers.getCartCount(req.session.user._id)
  if (products.length > 0) {
    totalValue = await userHelpers.getTotalAmount(req.session.user._id)
  }
  res.render('user/cart', { products, user: req.session.user, totalValue, cartCount, EcommerceDesign: true })
})
router.get('/add-to-cart/:id', (req, res) => {
  userHelpers.addToCart(req.params.id, req.session.user._id).then((response) => {
    res.json({ status: true })
  })
})
router.post('/change-product-quantity', verifyLogin, (req, res, next) => {
  userHelpers.changeProductQuantity(req.body).then(async (response) => {
    response.total = await userHelpers.getTotalAmount(req.body.user)
    res.json(response)
  })
})
router.post('/remove-cart', verifyLogin, (req, res) => {
  userHelpers.removeCart(req.body).then((response) => {
    res.json(response)
  })
})
router.get('/place-order', verifyLogin, async (req, res) => {
  let total = await userHelpers.getTotalAmount(req.session.user._id)
  res.render('user/place-order', { total, user: req.session.user, RazorPay: true, EcommerceDesign: true })
})
router.post('/place-order', verifyLogin, async (req, res) => {
  let products = await userHelpers.getCartProductList(req.body.userId)
  let totalPrice = await userHelpers.getTotalAmount(req.body.userId)
  userHelpers.placeOrder(req.body, products, totalPrice, req.session.user.Name).then((orderId) => {
    if (req.body['payment-method'] === 'COD') {
      res.json({ CODSuccess: true })
    } else {
      userHelpers.generateRazorpay(orderId, totalPrice).then((response) => {
        res.json(response)
      })
    }
  })
})
router.get('/order-success', verifyLogin, (req, res) => {
  res.render('user/order-success', { user: req.session.user, EcommerceDesign: true })
})

router.get('/orders', verifyLogin, async (req, res) => {
  let orders = await userHelpers.getUserOrders(req.session.user._id)
  res.render('user/orders', { user: req.session.user, orders, EcommerceDesign: true })
})
router.get('/cancelled-status/:id', verifyLogin, (req, res) => {
  userHelpers.changeCancelledStatus(req.params.id).then((response) => {
    res.redirect('/orders')
  })
})
router.get('/view-order-products/:id', verifyLogin, async (req, res) => {
  let products = await userHelpers.getOrderProducts(req.params.id)
  res.render('user/view-order-products', { user: req.session.user, products, EcommerceDesign: true })
})
router.post('/verify-payment', verifyLogin, (req, res) => {
  userHelpers.verifyPayment(req.body).then(() => {
    userHelpers.changePaymentStatus(req.body['order[receipt]']).then(() => {
      console.log("Payment-Successfull");
      res.json({ status: true })
    })
  }).catch((err) => {
    console.log(err);
    res.json({ status: false, errMsg: '' })
  })
})
module.exports = router;
