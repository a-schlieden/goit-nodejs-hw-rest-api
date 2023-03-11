
const { Contact, schemas } = require("../../models/contact");

const addNew = async (req, res, next) => {
  try {
    const { error } = schemas.addContactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const addNewContact = await Contact.create(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result: addNewContact,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addNew;
