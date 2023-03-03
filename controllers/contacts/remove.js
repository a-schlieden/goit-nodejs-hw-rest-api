
const Joi = require("joi");

const { removeContact } = require("../../models/contacts");

const remove = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const removeContactById = await removeContact(contactId);
        console.log("contactId ", contactId);
        if (!removeContactById) {
            const err = new Error(`Contact with id ${contactId} not found`);
            err.staus = 404;
            throw err;
        }
        res.json({
            staus: "success",
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