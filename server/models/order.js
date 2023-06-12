import mongoose from "mongoose";

export const orderSchema = mongoose.Schema({
itemId:String,
userId:String,
deliveryDate:String,
deliveryLocation:String
});
const Order = mongoose.model("OrderDetail",orderSchema);
export default Order;