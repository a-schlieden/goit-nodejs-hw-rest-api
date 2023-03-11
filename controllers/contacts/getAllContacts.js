const { Contact } = require("../../models/contact");

const getAllContacts = async (req, res, next) => {
  try {
    const contactsAll = await Contact.find();
    res.json({
      status: "success",
      code: 200,
      data: {
        result: contactsAll,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllContacts;
