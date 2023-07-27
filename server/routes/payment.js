import express from "express";
const router = express.Router();
import paymentGateway from "../controllers/payment.js";

 router.post("/",paymentGateway);
 export default router;