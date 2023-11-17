import Stripe from "stripe";
import { config } from "dotenv";
import Product from "../models/Product.js";
import Order from "../models/order.js";
config();
const stripe = Stripe(process.env.STRIPESECRETKEY);
const paymentGateway = async (req, res) => {
  const items = req.body.data;
  const lineItemsPromise = items && items.map(async (item) => {
    const product = await Product.findOne({ _id: item.itemId });
    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: product?.title,
          images: [product?.images[0]],
        },
        unit_amount: parseInt(product.price),
      },
      quantity: item.quantity,
    };
  });
  Promise.all(lineItemsPromise)
    .then(async (lineItems) => {
      try {
        const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        shipping_options:[{shipping_rate:req.body.DC}],
        mode: "payment",
        discounts: [{
          coupon: process.env.COUPONID,
        }],
        success_url: `${process.env.CLIENT2}/payment/success`,
        cancel_url: `${process.env.CLIENT2}/payment/cancel`,
      });
      const orders = items.map(item=>{return{product:item.itemId,quantity:item.quantity}});
      const orderRes = await Order.find({paymentId:session.id});
      if(!orderRes.length){
        const order = new Order({
          user:req.body.user,
          orderItems:orders,
          deliveryDate:req.body.DeliveryDate,
          paymentId:session.id,
          address:req.body.deliveryAddress
        });
        await order.save();
      }
      res.send({ url: session.url,id:session.id});
    } catch (error) {
      res.send({url:`${process.env.CLIENT2}/payment/error`});
      console.log(error);
    }
    })
    .catch((error) => {
      res.send({url:`${process.env.CLIENT2}/payment/error`});
      console.log(error);

    });
};
export default paymentGateway;
