const express = require("express");

const router = express.Router();

const { contactsControllers } = require("../../controllers");
const { userAuthInfo, isValidId } = require("../../middlewares");

router.post("/register", userAuthInfo, contactsControllers.getAllContacts);
router.post("/login", userAuthInfo, contactsControllers.getAllContacts);
router.get("/logout", userAuthInfo, contactsControllers.getAllContacts);

module.exports = router;