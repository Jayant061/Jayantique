import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    orderDate: { type: Date, default: Date.now() },
    status: { type: String, enum: ['pending', 'shipped', 'delivered'], default: 'shipped' },
    orderItems: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, required: true },
      }
    ],
    orderStatus:{type:String,enum:["success","cancel"],default:"success"},
    deliveryDate:{type: Date},
  });
const Order = mongoose.model("OrderDetail",orderSchema);
export default Order;