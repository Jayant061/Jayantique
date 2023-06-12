import mongoose from "mongoose";

export const productSchema = mongoose.Schema({
    id:String,
    title:String,
    price:Number,
    description:String,
    category:String,
    image:String,
    rating:{
        rate:Number,
        count:Number
    }
});
const  Product = mongoose.model("Product",productSchema);
export default Product;