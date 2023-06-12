import  express from "express";
import verifyToken from "../controllers/user.js";

const router = express.Router();
router.post("/",verifyToken);

export default router;