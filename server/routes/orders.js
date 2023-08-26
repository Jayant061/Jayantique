import express from "express";
import addOrders from "../controllers/orders.js";
const router = express.Router();

router.post("/",addOrders);
export default router;