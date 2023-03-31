const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = new Schema({

    password: {
        type: String,
        required: [true, 'Password is required'],
        minliengh: 5,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
        type: String,
        default: null,
    },
    avatarURL: {
        type: String,
        required: true,
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        required: [true, 'Verify token is required'],
    },
}, { versionKey: false, timestamps: true })

const joeRegisterSchema = Joi.object({
    password: Joi.string().min(5).required(),
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net", "ua"] },
        })
        .required(),
    subscription: Joi.string(),
    token: Joi.string(),
});

const joeLoginSchema = Joi.object({
    password: Joi.string().min(5).required(),
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net", "ua"] },
        })
        .required(),
});

const User = model("user", userSchema);


const schemas = {
    joeRegisterSchema,
    joeLoginSchema,
};


module.exports = {
    User,
    schemas,
};
