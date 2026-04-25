import { Router } from "express";
import { verifyuser } from "../middleware/auth.middleware.js";
import { getStreamToken } from "../controllers/chat.controller.js";


const router = Router()
router.route("/token").get(verifyuser,getStreamToken);



export default router