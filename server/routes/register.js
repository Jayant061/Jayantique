import express from "express";
const router = express.Router();
import postRegister from "../controllers/register.js";

router.post("/",postRegister );

export default router