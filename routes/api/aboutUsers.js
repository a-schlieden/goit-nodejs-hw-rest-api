const express = require("express");

const router = express.Router();

const { userControllers } = require("../../controllers");

//get current User info 

router.get("/current", userControllers.getCurrentUser);

module.exports = router;