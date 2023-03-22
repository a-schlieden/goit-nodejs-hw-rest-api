const express = require("express");

const router = express.Router();

const { userControllers } = require("../../controllers");
const { userAuthInfo } = require("../../middlewares");

//get current User info 

router.get("/current", userAuthInfo, userControllers.getCurrentUser);

module.exports = router;