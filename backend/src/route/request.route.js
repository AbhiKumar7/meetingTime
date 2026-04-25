import { Router } from "express";
import { verifyuser } from "../middleware/auth.middleware.js";
import { acceptFriendRequest, getFriendRequests, getMyFriends, getOutgoingFriendReqs, getRecommendedUsers, sendFriendRequest } from "../controllers/request.controller.js";


const router = Router()

router.route("/getusers").get(verifyuser,getRecommendedUsers);
router.route("/friendrequest/:recipientId").post(verifyuser,sendFriendRequest);
router.route("/myfriends").get(verifyuser,getMyFriends);
router.route("/friendrequestaccept/:requestId").post(verifyuser,acceptFriendRequest);
router.route("/Allfriendrequest").get(verifyuser,getFriendRequests);
router.route("/outgoingrequest").get(verifyuser,getOutgoingFriendReqs);

export default router