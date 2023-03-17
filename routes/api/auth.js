const express = require("express");

const router = express.Router();

const { authControllers } = require("../../controllers");
const { userAuthInfo } = require("../../middlewares");

// User register

router.post("/register", authControllers.register);

// User login

router.post("/login", authControllers.login);

// User logout

router.get("/logout", userAuthInfo, authControllers.logout);

module.exports = router;
