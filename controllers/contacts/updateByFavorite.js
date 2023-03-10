const { Contact, schemas } = require("../../models/contact");

const updateByFavorite = async (req, res, next) => {
  try {
    const { error } = schemas.updateFavoriteSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    const updContactByFavorite = await Contact.findByIdAndUpdate(
      contactId,
      req.body,
      { new: true }
    );
    if (!updContactByFavorite) {
      const err = new Error(`Contact with id ${contactId} not found`);
      err.status = 404;
      throw err;
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result: updContactByFavorite,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateByFavorite;
