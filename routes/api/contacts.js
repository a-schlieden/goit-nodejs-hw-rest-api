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

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { id } = req.params;
    const removeContactById = removeContact(id);
    if (!removeContactById) {
      const err = new Error(`Contact with id ${id} not found`);
      err.staus = 404;
      throw err;
    }
    res.json({
      staus: "success",
      code: 200,
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { id } = req.params;
    const updContactById = updateContact(id, req.body);
    if (!updContactById) {
      const err = new Error(`Contact with id ${id} not found`);
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
