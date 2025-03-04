const express = require("express");

const router = express.Router();

const { userControllers } = require("../../controllers");
const { userAuthInfo, upload } = require("../../middlewares");

//get current User info 

router.get("/current", userAuthInfo, userControllers.getCurrentUser);

//update Users avatar

router.patch("/avatars", userAuthInfo, upload.single("avatar"), userControllers.updateAvatar);

module.exports = router;