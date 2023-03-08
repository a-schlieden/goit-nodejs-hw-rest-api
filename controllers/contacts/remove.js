
const Joi = require("joi");

//const { removeContact } = require("../../models/contacts");
const { Contact } = require("../../models/contacts");

const remove = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        //const removeContactById = await removeContact(contactId);
        const removeContactById = await Contact.findByIdAndRemove(contactId);
        console.log("contactId ", contactId);
        if (!removeContactById) {
            const err = new Error(`Contact with id ${contactId} not found`);
            err.status = 404;
            throw err;
        }
        res.json({
            status: "success",
            code: 200,
            message: "contact deleted",
            data: {
                result: removeContactById,
            },
        });
    } catch (error) {
        next(error);
    }
}

module.exports = remove;