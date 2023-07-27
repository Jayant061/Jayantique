    import Stripe from "stripe";
    import { config } from "dotenv";
import Product from "../models/Product.js";
    config();
    const stripe = Stripe(process.env.STRIPESECRETKEY);
    const paymentGateway = async (req, res) => {

            const items = req.body.data;
            const lineItemsPromise = items.map(async(item) => {
                const product = await Product.findOne({_id:item.itemId});
                return({
                    price_data : {
                        currency:"inr",
                        product_data:{
                            name:product.title,
                            images:[product.image]
                        },
                    unit_amount:(parseInt(product.price)*100)
                },
                quantity:item.quantity
            })
        });
        Promise.all(lineItemsPromise).then(async (lineItems) => {
    
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.CLIENT2}/payment/success`,
      cancel_url: `${process.env.CLIENT2}/payment/cancel`,
    });
    res.send({url:session.url});
  })
  .catch((error) => {
    console.error("Error fetching line items:", error);})

  
  };
  export default paymentGateway;
  