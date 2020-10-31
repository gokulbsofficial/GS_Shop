const { response } = require('express');
var express = require('express');
const { request } = require('http');
const {render} = require('../app');
const adminHelpers = require('../helpers/admin-helpers');
var router = express.Router();
const verifyLogin=((req,res,next)=>{
  if(req.session.adminLoggedIn){
    next()
  }else{
    res.redirect('/admin/login')
  }
})
/* GET users listing. */
router.get('/login',(req,res)=>{
  if(req.session.admin){
    response.redirect('/view-product')
  }else{
    res.render('admin/login',{'adminLoginErr':req.session.adminLoginErr,admin:true})
    req.session.adminLoginErr=false
  }
})
router.post('/login',(req,res)=>{
  adminHelpers.doAdminLogin(req.body).then((response)=>{
    if(response.status){
      req.session.admin=response.admin
      req.session.adminLoggedIn=true
      res.redirect('/admin/view-product')
    }else{
      req.session.adminLoginErr='Invalid username or password'
      res.redirect('/admin/login')
    }
  })
})
router.get('/logout',(req,res)=>{
  req.session.admin=null
  req.session.adminLoggedIn=false
  res.redirect('/admin/login')
})
router.get('/view-product',verifyLogin,function (req, res, next) {
  let admin=req.session.admin
  adminHelpers.getAllProducts().then((products)=>{
    res.render('admin/view-products', { admin: true,products,admin})
  })
});
router.get('/add-product',verifyLogin,(req,res)=>{
  res.render('admin/add-product',{ admin: true})
})
router.post('/add-product',(req,res)=>{
  req.body.Price = parseInt(req.body.Price)
  adminHelpers.addProduct(req.body,(id)=>{
    let image=req.files.Image
    image.mv('./public/product-images/'+id+'.jpeg',(err)=>{
      if(!err){
        res.render("admin/add-product",{admin: true})
      }else{
        console.log(err)
      }
    })
  })
})
router.get('/delete-product/:id',verifyLogin,(req,res)=>{
    let proId=req.params.id
    adminHelpers.deleteProduct(proId).then((response)=>{
      res.redirect('/admin/view-product')
    })
})
router.get('/edit-product/:id',verifyLogin,async(req,res)=>{
  let product=await adminHelpers.getProductDetails(req.params.id)
  res.render('admin/edit-product',{admin:true,product})
})
router.post('/edit-product/:id',(req,res)=>{
  let id=req.params.id
  adminHelpers.updateProduct(req.params.id,req.body).then(()=>{
    res.redirect('/admin/view-product')
    if(req.files.Image){
      let image = req.files.Image
      image.mv('./public/product-images/'+id+'.jpeg')
    }
  })
})
router.get('/users',verifyLogin,(req, res)=>{
  adminHelpers.getAllUsers().then((users)=>{
    res.render('admin/view-users', { users,admin: true})
  })

});
router.get('/orders',verifyLogin,(req,res)=>{
  adminHelpers.getAllOrders().then((orders)=>{
  res.render("admin/view-orders",{ admin: true,orders})
  })
});
router.get('/packed-status/:id',verifyLogin,(req,res)=>{
  adminHelpers.changePackedStatus(req.params.id).then((response)=>{
    res.redirect('/admin/orders')
  })
})
router.get('/shipped-status/:id',verifyLogin,(req,res)=>{
  adminHelpers.changeShippedStatus(req.params.id).then((response)=>{
    res.redirect('/admin/orders')
  })
})
router.get('/delivered-status/:id',verifyLogin,(req,res)=>{
  adminHelpers.changeDeliveredStatus(req.params.id).then((response)=>{
    res.redirect('/admin/orders')
  })
})
router.get('/cancelled-status/:id',verifyLogin,(req,res)=>{
  adminHelpers.changeCancelledStatus(req.params.id).then((response)=>{
    res.redirect('/admin/orders')
  })
})
router.get('/remove-user/:id',verifyLogin,(req,res)=>{
  console.log(req.params.id);
  adminHelpers.removeUser(req.params.id).then((response)=>{
    res.redirect('/admin/users')
  })
})
module.exports = router;