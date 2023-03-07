
const Joi = require("joi");

const { updateContact } = require("../../models/contacts");
//const { Contact } = require("../../models/contacts");

const contactsSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "ua"] },
    }).required(),
    phone: Joi.number().required(),
});

const updateByFavorite = async (req, res, next) => {
    try {
        const { error } = contactsSchema.validate(req.body);
        if (error) {
            error.status = 400;
            throw error;
        }
        const { contactId } = req.params;
        const updContactByFavorite = await updateContact(contactId, req.body);
        // const updContactByFavorite = await Contact.findByIdAndUpdate(contactId, req.body, {new:true});
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
}

module.exports = updateByFavorite;