//const { getContactById } = require("../../models/contacts");
const { Contact } = require("../../models/contacts");

const getById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        //const contactById = await getContactById(contactId);
        const contactById = await Contact.findById(contactId);
        if (!contactById) {
            const err = new Error(`Contact with id ${contactId} not found`);
            err.status = 404;
            throw err;
        }
        res.json({
            status: "success",
            code: 200,
            data: {
                result: contactById,
            },
        });
    } catch (error) {
        next(error);
    }
}

module.exports = getById;