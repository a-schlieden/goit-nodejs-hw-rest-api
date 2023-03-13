const express = require("express");

const router = express.Router();

const { contactsControllers } = require("../../controllers");
const { isValidId } = require("../../middlewares");

//all

router.get("/current", contactsControllers.getAllContacts);

module.exports = router;