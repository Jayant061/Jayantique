import express from "express";
import updateOrders from "../controllers/orders.js";
import getOrders from "../controllers/getOrders.js";
const router = express.Router();

router.post("/",updateOrders);
router.get("/getOrders",getOrders);
export default router;