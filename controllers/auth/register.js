const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { User, schemas } = require("../../models/user");

const register = async (req, res, next) => {
  try {
    const { error } = schemas.joeRegisterSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { email, subscription, password } = req.body;
    const userByMail = await User.findOne({ email });
    if (userByMail) {
      const error = new Error(`Email in use`);
      error.status = 409;
      throw error;
    }
    const avatarURL = gravatar.url(email);
    const hashPswd = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const result = await User.create({
      email,
      subscription,
      password: hashPswd,
      avatarURL,
    });
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        user: {
          email,
          subscription,
          avatarURL,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
