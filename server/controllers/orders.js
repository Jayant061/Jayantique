import Order from "../models/order.js";
import Stripe from 'stripe';

const updateOrders = async(req,res)=>{
    const stripe = Stripe(process.env.STRIPESECRETKEY);
    const id = req.body.sessionId;
    const session = await stripe.checkout.sessions.retrieve(id);
    const currtime = new Date();
    if(session.payment_status === "unpaid"&& currtime>session.expires_at){
        await Order.findOneAndDelete({paymentId:id});
        res.send({status:"deleted"});
    }
    else if(session.payment_status === "paid"){
        const orderItem = await Order.findOneAndUpdate({paymentId:id},{status:"shipped",orderStatus:"success"},{new:true})
        .select("-paymentId -user");
        res.send({status:"success",orderItem});
    }
    else{
        res.send({status:"pending",url:session.url});
    }
}
export default updateOrders;