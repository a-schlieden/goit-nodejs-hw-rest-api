
const { listContacts } = require("../../models/contacts");
//const { Contact } = require("../../models/contacts");

const getAllContacts = async (req, res, next) => {
    try {
        const contactsAll = await listContacts();
        // const contactsAll = await Contact.find();
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
}

module.exports = getAllContacts;