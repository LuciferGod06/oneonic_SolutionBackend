const {Router}= require('express');
const { model } = require('mongoose');
const { ProductModel } = require('../model/Product.model');



const ProductRouter  = Router();

ProductRouter.get('/',async(req,res)=>{
    const product = await ProductModel.find();
    res.send({product:product});
})


ProductRouter.get('/',async(req,res)=>{
    const param = req.query;
    console.log(param)
    const product = await ProductModel.find().sort({price:1});
    res.send({product:product});
})

ProductRouter.get('/:id',async(req,res)=>{
    const id = req.params.id;

    const product = await ProductModel.findById(id);
    res.send({product:product});
})


ProductRouter.post('/add',async(req,res)=>{

    const {title,price,imageUrl,category} = req.body;
  

    const newProduct = new ProductModel({
         title,
         price,
         imageUrl,
         category
    })
    
    try {
        newProduct.save();
        res.send('Product Added Successfully')
    } catch (error) {
        res.status(500).send("Something Went Wrong");
    }
})


ProductRouter.put('/edit/:productId',async(req,res)=>{
    const productId = req.params.productId;
    // const {title,price,imageUrl,category} = req.body;
    const paylaod = req.body;
   await ProductModel.findByIdAndUpdate(productId,
    paylaod
    );

    res.send(`${productId} Product has Been Updated`)
})


ProductRouter.delete('/delete/:productId',async(req,res)=>{
    const productId = req.params.productId;

    try {
        
        await ProductModel.findByIdAndDelete(productId)
        res.send("Product deleted")
    } catch (error) {
        res.status(500).send("Something Went Wrong");
    }
    
})




module.exports  = {ProductRouter};