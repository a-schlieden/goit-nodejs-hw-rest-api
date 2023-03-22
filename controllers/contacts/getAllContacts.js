const { Contact } = require("../../models/contact");

const getAllContacts = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { page = 1, limit = 20 } = req.query;
    const skipQuantity = (page - 1) * limit;
    const contactsAll = await Contact.find({ owner: _id }, "", { skip: skipQuantity, limit: Number(limit) })
      .populate("owner", "_id name email");

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
