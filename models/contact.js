const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { validationErr } = require("../helpers")

const phoneRegexp = /^(d{4}) d{3}-d{2}-d{2}$/;

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
    },
    phone: {
        //  match: phoneRegexp,
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
}, { versionKey: false, timestamps: true })

contactSchema.post("save", validationErr);

const addContactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "ua"] },
    }).required(),
    phone: Joi.string().required(),
    favorite: Joi.bool()
});

const updateFavoriteSchema = Joi.object({
    favorite: Joi.bool().required(),
});

const schemas = {
    addContactSchema,
    updateFavoriteSchema,
}

const Contact = model("contact", contactSchema);

module.exports = {
    Contact,
    schemas,
};