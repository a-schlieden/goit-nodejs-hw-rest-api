const express = require("express");
const Joi = require("joi");

const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "ua"] },
  }),
  phone: Joi.number().required(),
});
const {
  //getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

const { contactsControllers } = require("../../controllers");

router.get("/", contactsControllers.getAllContacts);

router.get("/:contactId", contactsControllers.getById);

//add
// functioniert !

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const addNewContact = await addContact(req.body);
    res.status(201).json({
      staus: "success",
      code: 201,
      data: {
        result: addNewContact,
      },
    });
  } catch (error) {
    next(error);
  }
});

//delete
// functioniert !

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const removeContactById = await removeContact(contactId);
    console.log("contactId ", contactId);
    if (!removeContactById) {
      const err = new Error(`Contact with id ${contactId} not found`);
      err.staus = 404;
      throw err;
    }
    res.json({
      staus: "success",
      code: 200,
      message: "contact deleted",
      data: {
        result: removeContactById,
      },
    });
  } catch (error) {
    next(error);
  }
});

//update
// functioniert !

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    const updContactById = await updateContact(contactId, req.body);
    if (!updContactById) {
      const err = new Error(`Contact with id ${contactId} not found`);
      err.staus = 404;
      throw err;
    }
    res.json({
      staus: "success",
      code: 200,
      data: {
        result: updContactById,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
