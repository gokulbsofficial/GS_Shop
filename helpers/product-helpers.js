var db=require('../config/connection').get()
module.exports={

    addProduct:(product,callback)=>{
        console.log(product);
        db.collection('product').insertOne(product).then((data)=>{
            callback(true)
        })

    }
}