const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const uuid = require("uuid");
const { User, schemas } = require("../../models/user");
const { sendEmail } = require("../../helpers");

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

    const verificationToken = uuid.v4();
    const avatarURL = gravatar.url(email);
    const hashPswd = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const result = await User.create({
      email,
      subscription,
      password: hashPswd,
      avatarURL,
      verificationToken,
    });

    const verificationMail = {
      to: email,
      subject: "Verification Email",
      html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}" >Click to confirm</a>`,
    };
    await sendEmail(verificationMail);

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        user: {
          email,
          subscription,
          avatarURL,
          verificationToken,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
