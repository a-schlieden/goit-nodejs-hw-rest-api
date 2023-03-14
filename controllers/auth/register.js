
const { Contact, schemas } = require("../../models/user");

const register = async (req, res, next) => {
    try {
        const { error } = schemas.joeRegisterSchema.validate(req.body);
        if (error) {
            error.status = 400;
            throw error;
        }
        const { email, subscription } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            error.status = 409;
            error.message = "Email in use";
            throw error;
        }
        const result = await User.create({ email, subscription });
        res.status(201).json({
            status: "success",
            code: 201,
            data: {
                user: {
                    email,
                    subscription,
                },
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = register;