const { getContactById, } = require("../../models/contacts");

const getById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const contactById = await getContactById(contactId);
        if (!contactById) {
            const err = new Error(`Contact with id ${contactId} not found`);
            err.staus = 404;
            throw err;
        }
        res.json({
            staus: "success",
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