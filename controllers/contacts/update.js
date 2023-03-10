const { Contact, schemas } = require("../../models/contact");

const update = async (req, res, next) => {
  try {
    const { error } = schemas.addContactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;

    const updContactById = await Contact.findByIdAndUpdate(
      contactId,
      req.body,
      { new: true }
    );
    if (!updContactById) {
      const err = new Error(`Contact with id ${contactId} not found`);
      err.status = 404;
      throw err;
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result: updContactById,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = update;
