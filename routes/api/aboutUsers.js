const express = require("express");

const router = express.Router();

const { authControllers } = require("../../controllers");

//get current User info 

router.get("/current", userAuthInfo, authControllers.getCurrentUser);

module.exports = router;