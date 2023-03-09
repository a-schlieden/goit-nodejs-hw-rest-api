const { isValidObjectId } = require("mongoose");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  const isCorrect = isValidObjectId(contactId);
  if (!isCorrect) {
    const err = new Error(`id ${contactId} is not correct`);
    err.status = 400;
    throw err;
  }
  next();
};

module.exports = isValidId;
