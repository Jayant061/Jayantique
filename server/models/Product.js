import mongoose from "mongoose";

export const productSchema = mongoose.Schema({
    id:String,
    title:String,
    price:Number,
    description:String,
    category:String,
    images:[String],
    rating:{
        rate:Number,
        count:Number
    }
});
const  Product = mongoose.model("ActualProduct",productSchema);
export default Product;