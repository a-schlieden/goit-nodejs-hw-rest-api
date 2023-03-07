
const Joi = require("joi");

const { updateContact } = require("../../models/contacts");

const contactsSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "ua"] },
    }).required(),
    phone: Joi.number().required(),
});

const update = async (req, res, next) => {
    try {
        const { error } = contactsSchema.validate(req.body);
        if (error) {
            error.status = 400;
            throw error;
        }
        const { contactId } = req.params;
        const updContactById = await updateContact(contactId, req.body);
        if (!updContactById) {
            const err = new Error(`Contact with id ${contactId} not found`);
            err.staus = 404;
            throw err;
        }
        res.json({
            staus: "success",
            code: 200,
            data: {
                result: updContactById,
            },
        });
    } catch (error) {
        next(error);
    }
}

module.exports = update;