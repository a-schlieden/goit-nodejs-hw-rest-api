
const Joi = require("joi");

const { addContact } = require("../../models/contacts");

const contactsSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "ua"] },
    }).required(),
    phone: Joi.number().required(),
});

const addNew = async (req, res, next) => {
    try {
        const { error } = contactsSchema.validate(req.body);
        if (error) {
            error.status = 400;
            throw error;
        }
        const addNewContact = await addContact(req.body);
        res.status(201).json({
            status: "success",
            code: 201,
            data: {
                result: addNewContact,
            },
        });
    } catch (error) {
        next(error);
    }
}

module.exports = addNew;