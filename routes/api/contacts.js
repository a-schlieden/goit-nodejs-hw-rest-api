const express = require("express");

const router = express.Router();

const { contactsControllers } = require("../../controllers");

//all

router.get("/", contactsControllers.getAllContacts);

//byId

router.get("/:contactId", contactsControllers.getById);

//add

router.post("/", contactsControllers.addNew);

//delete

router.delete("/:contactId", contactsControllers.remove);

//update

router.put("/:contactId", contactsControllers.update);

//updete field favorite

router.put("/:contactId/favorite", contactsControllers.updateByFavorite);

module.exports = router;
