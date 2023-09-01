import jwt from "jsonwebtoken";
import Order from "../models/order.js";

const getOrders = (req, res) => {
  const token = req.query.token;
  jwt.verify(token, process.env.SECRETKEY, async (err, user) => {
    if (err) {
      res.status(401).json("invalidToken");
    }

    else if (user) {
      const orderItems = await Order.find({ user: user.resData._id });
      res.send(orderItems);
    } else {
      res.status(403).json("invalid user");
    }
  });
};
export default getOrders;
