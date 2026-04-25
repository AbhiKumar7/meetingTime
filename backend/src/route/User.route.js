import { Router } from "express";
import { googleLogin } from "../controllers/googleUser.controller.js";
import { loginUser, logoutUser, onBoard, resgisterUser } from "../controllers/User.controller.js";
import { verifyuser } from "../middleware/auth.middleware.js";

const router = Router()

router.route("/google").post(googleLogin);
router.route("/register").post(resgisterUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyuser,logoutUser);
router.route("/onboard").post(verifyuser,onBoard);
router.route("/me").get(verifyuser, (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});
export default router