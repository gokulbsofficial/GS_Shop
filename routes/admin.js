var express = require('express');
const {render} = require('../app');
const productHelpers = require('../helpers/product-helpers');
var router = express.Router();
var productHelper=require('../helpers/product-helpers')

/* GET users listing. */
router.get('/', function (req, res, next) {
  productHelpers.getAllProducts().then((products)=>{
    console.log(products);
    res.render('admin/view-products', { admin: true,products})
  })

});
router.get('/add-product',(req,res)=>{
  res.render('admin/add-product',{ admin: true})
})
router.post('/add-product',(req,res)=>{

  productHelpers.addProduct(req.body,(id)=>{
    let image=req.files.Image
    console.log(id);
    image.mv('./public/product-images/'+id+'.jpeg',(err)=>{
      if(!err){
        res.render("admin/add-product")
      }else{
        consol.log(err)
      }
    })
    res.render("admin/add-product",{ admin: true})
  })
})

module.exports = router;