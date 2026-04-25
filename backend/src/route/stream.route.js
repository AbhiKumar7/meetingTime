import { Router } from "express";
import { verifyuser } from "../middleware/auth.middleware.js";
import { getStreamToken } from "../controllers/stream.controller.js";

const router = Router()

router.route("/streamtoken").get(verifyuser,getStreamToken)

export default router