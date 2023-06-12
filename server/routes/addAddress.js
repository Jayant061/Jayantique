import  express from "express";
import addAddress from "../controllers/addAddress.js";

const router = express.Router();
router.post("/",addAddress);

export default router;