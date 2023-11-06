import jwt from "jsonwebtoken";
import Order from "../models/order.js";
import Product from "../models/Product.js";

const getOrders = (req, res) => {
  const token = req.query.token;
  jwt.verify(token, process.env.SECRETKEY, async (err, user) => {
    if (err) {
      res.status(401).json("invalidToken");
    } else if (user) {

      const allOrders = await Order.find({ user: user.resData._id });
      const orderPromises = allOrders.map(async (order) => {
        const allProductPromise = order.orderItems.map(async (item) => {
          const product = await Product.findOne({ _id: item.product }).select(
            "_id title price images category"
          );
          return {
            product,
            quantity: item.quantity,
          };
        });

        const productItems = await Promise.all(allProductPromise);
        return {
          id:order._id,
          orderDate: order.orderDate,
          deliveryDate: order.deliveryDate,
          status: order.status,
          orderStatus: order.orderStatus, 
          address: order.address,
          orderItems: productItems,
        };
      });

      Promise.all(orderPromises)
        .then((resData) => {
          res.status(200).send(resData); 
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send("Internal Server Error");
        });

    } else {
      res.status(403).json("invalid user");
    }
  });
};
export default getOrders;
