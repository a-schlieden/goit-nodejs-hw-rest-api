const express = require("express");

const router = express.Router();

const { userControllers } = require("../../controllers");
const { userAuthInfo, upload } = require("../../middlewares");

//get current User info 

router.get("/current", userAuthInfo, userControllers.getCurrentUser);

//update Users avatar

router.patch("/avatars", userAuthInfo, upload.single("avatar"), userControllers.updateAvatar);

//update Verify User Mail

router.get("/verify/:verificationToken", userControllers.emailVerify);

//update resend Verify User Mail

router.post("/verify", userControllers.resendEmailVerify);

module.exports = router;