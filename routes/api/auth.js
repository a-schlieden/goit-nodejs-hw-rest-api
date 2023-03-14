const express = require("express");

const router = express.Router();

const { authControllers } = require("../../controllers");
const { userAuthInfo, isValidId } = require("../../middlewares");

// User register

router.post("/register", userAuthInfo, authControllers.register);

// User login

router.post("/login", userAuthInfo, authControllers.login);

// User logout

router.get("/logout", userAuthInfo, authControllers.logout);

module.exports = router;
