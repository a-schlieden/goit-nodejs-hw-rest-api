
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, schemas } = require("../../models/user");
const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
    try {
        const { error } = schemas.joeLoginSchema.validate(req.body);
        if (error) {
            error.status = 400;
            throw error;
        }

        const { email, password } = req.body;
        const userByMail = await User.findOne({ email });
        const isPasswordTrue = bcrypt.compareSync(password, userByMail.password);

        if (!userByMail || !isPasswordTrue) {
            const error = new Error(`Email or password is wrong`);
            error.status = 401;
            throw error;
        }

        const payload = {
            id: userByMail._id,
        }
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
        /// muss ganz User sein !!!!!  PRÜFEN !!!!!! 

        res.json({
            status: "success",
            code: 200,
            data: {
                token,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = login;

