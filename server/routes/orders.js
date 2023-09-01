import express from "express";
import addOrders from "../controllers/orders.js";
import getOrders from "../controllers/getOrders.js";
const router = express.Router();

router.post("/",addOrders);
router.get("/getOrders",getOrders);
export default router;