import jwt from 'jsonwebtoken';
import Order from '../models/order.js';
import Product from '../models/Product.js';
import Stripe from 'stripe';
const addOrders = (req,res)=>{
    const query = req.query;
    const data = req.body;
    const stripe = Stripe(process.env.STRIPESECRETKEY);

    jwt.verify(data.token,process.env.SECRETKEY,async (err,user)=>{
        if(err){
            res.status(401).json("invalidToken");
        }
        else if(user){
        const allOrders = await Order.find({user:user.resData._id});
        res.send(allOrders);

        }else{
            res.status(403).send("Invalid user");
        }
})
}
export default addOrders;