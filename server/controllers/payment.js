import Stripe from "stripe";
import { config } from "dotenv";
import Product from "../models/Product.js";
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
          name: product.title,
          images: [product.image],
        },
        unit_amount: parseInt(product.price*82),
      },
      quantity: item.quantity,
    };
  });
  Promise.all(lineItemsPromise)
    .then(async (lineItems) => {
      const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        shipping_options:[{shipping_rate:req.body.DC}],
        mode: "payment",
        discounts: [{
          coupon: process.env.COUPONID,
        }],
        success_url: `${process.env.CLIENT2}?paymentSuccess=true`,
        cancel_url: `${process.env.CLIENT2}?paymentCancel=true`,
      });
      res.send({ url: session.url });
    })
    .catch((error) => {
      console.log(error)
      res.send({url:`${process.env.CLIENT2}?transactionError=true`});
    });
};
export default paymentGateway;
