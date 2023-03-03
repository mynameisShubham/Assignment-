const mongoose=require('mongoose');
const productSchema=new mongoose.Schema({
    product_name:{
        type:String,
        required:true
    },
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true
    }
})
const Product=mongoose.model('Product',productSchema)
module.exports=Product;