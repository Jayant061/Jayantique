import express from "express";
const router = express.Router();
import postLogin from "../controllers/login.js";

router.post("/",postLogin);
export default router;