import jwt from 'jsonwebtoken';
import Order from '../models/order.js';
import Product from '../models/Product.js';
const addOrders = (req,res)=>{
    const query = req.query;
    const data = req.body;


    jwt.verify(data.token,process.env.SECRETKEY,async (err,user)=>{
        if(err){
            res.status(401).json("invalidToken");
        }
        else if(user){

                const items = data.items.map((item)=>{
                    return {
                        product:item.itemId,
                        quantity:item.quantity,
                        
                    }
                });
                const orders = new Order({
                    user:user.resData._id,
                    orderItems:items,
                    orderStatus:data.status,
                    deliveryDate:data.deliveryDate
                })
                await orders.save();
                res.send(orders);
        }else{
            res.status(403).send("Invalid user");
        }
})
}
export default addOrders;