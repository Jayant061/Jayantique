import express from "express";
import { config } from "dotenv";
config();
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: [process.env.CLIENT1, process.env.CLIENT2],
    methods: ["GET", "POST"],
  })
);

  try {
    await mongoose.connect(process.env.MONGOURL);
    
  } catch (error) {
    console.log(error);
  }

export const secretkey = process.env.SECRETKEY;

//general Route
app.get("/",(req,res)=>{
  res.send("Working All good No Problem");
})

// All products route
import productsRoute from "./routes/products.js"
app.use("/products",productsRoute);

// register Route
import registerRoutes from "./routes/register.js";
app.use("/register",registerRoutes);

//login route
import loginRoutes from "./routes/login.js"
app.use("/login",loginRoutes);

// authoriseRoute
import authRoute from "./routes/user.js";
app.use("/auth/updateUser",authRoute);

// change details route
import addAddressRoute from "./routes/addAddress.js"
app.use("/auth/updateUser/addAddress",addAddressRoute);

// add orders;
import addOrdersRoute from "./routes/orders.js";
app.use("/auth/orders",addOrdersRoute);

// payment route
import paymentRoute from "./routes/payment.js";
app.use("/checkout",paymentRoute);
app.listen(3000, () => {
  console.log("server is running at port 3000");
});
