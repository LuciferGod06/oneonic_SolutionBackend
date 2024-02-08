const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title:{type:String,require:true},
    price:{type:Number,require:true},
    imageUrl :{type:String},
    category :{type:String ,require:true}
})

const ProductModel= mongoose.model('Product',ProductSchema)

module.exports ={ProductModel};