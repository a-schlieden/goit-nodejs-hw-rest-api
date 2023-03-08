
//const Joi = require("joi");

//const { updateContact } = require("../../models/contacts");
const { Contact, schemas } = require("../../models/contacts");

// const contactsSchema = Joi.object({
//     name: Joi.string().required(),
//     email: Joi.string().email({
//         minDomainSegments: 2,
//         tlds: { allow: ["com", "net", "ua"] },
//     }).required(),
//     phone: Joi.number().required(),
// });

const update = async (req, res, next) => {
    try {
        const { error } = schemas.addContactSchema.validate(req.body);
        if (error) {
            error.status = 400;
            throw error;
        }
        const { contactId } = req.params;
        //const updContactById = await updateContact(contactId, req.body);
        const updContactById = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
        if (!updContactById) {
            const err = new Error(`Contact with id ${contactId} not found`);
            err.status = 404;
            throw err;
        }
        res.json({
            status: "success",
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