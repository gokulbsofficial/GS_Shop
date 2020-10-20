const { response } = require('express');
var express = require('express');
const { request } = require('http');
const {render} = require('../app');
const productHelpers = require('../helpers/product-helpers');
var router = express.Router();
var productHelper=require('../helpers/product-helpers')

/* GET users listing. */
router.get('/', function (req, res, next) {
  productHelpers.getAllProducts().then((products)=>{
    res.render('admin/view-products', { admin: true,products})
  })
});
router.get('/add-product',(req,res)=>{
  res.render('admin/add-product',{ admin: true})
})
router.post('/add-product',(req,res)=>{

  productHelpers.addProduct(req.body,(id)=>{
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
router.get('/delete-product/:id',(req,res)=>{
    let proId=req.params.id
    productHelpers.deleteProduct(proId).then((response)=>{
      res.redirect('/admin/')
    })
})
router.get('/edit-product/:id',async(req,res)=>{
  let product=await productHelpers.getProductDetails(req.params.id)
  res.render('admin/edit-product',{admin:true,product})
})
router.post('/edit-product/:id',(req,res)=>{
  let id=req.params.id
  productHelpers.updateProduct(req.params.id,req.body).then(()=>{
    res.redirect('/admin')
    if(req.files.Image){
      let image = req.files.Image
      image.mv('./public/product-images/'+id+'.jpeg')
    }
  })
})
router.get('/users', function (req, res, next) {
  productHelpers.getAllUsers().then((users)=>{
    res.render('admin/view-users', { users,admin: true})
  })

});
module.exports = router;