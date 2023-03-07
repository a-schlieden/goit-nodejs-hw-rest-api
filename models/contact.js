const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
    },
    phone: {
        //  match: /(d{4}) d{3}-d{2}-d{2}$/,
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
}, { versionKey: false, timestamps: true })


const addContactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "ua"] },
    }).required(),
    phone: Joi.number().required(),
    favorite: Joi.bool()
});
const schemas = {
    addContactSchema,
}

const Contact = (model("contact", contactSchema));
module.exports = {
    Contact,
    schemas,
};