const express = require("express");

const router = express.Router();

const { contactsControllers } = require("../../controllers");
const { userAuthInfo, isValidId } = require("../../middlewares");

//all

router.get("/", userAuthInfo, contactsControllers.getAllContacts);

//byId

router.get("/:contactId", isValidId, contactsControllers.getById);

//add

router.post("/", userAuthInfo, contactsControllers.addNew);

//delete

router.delete("/:contactId", isValidId, contactsControllers.remove);

//update

router.put("/:contactId", isValidId, contactsControllers.update);

//updete field favorite

router.patch("/:contactId/favorite", isValidId, contactsControllers.updateByFavorite);

module.exports = router;
