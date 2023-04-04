const { User, schemas } = require("../../models/user");
const { sendEmail } = require("../../helpers");

const resendEmailVerify = async (req, res, next) => {
  try {
    const { error } = schemas.joeEmailSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }

    const { email } = req.body;
    const userByMail = await User.findOne({ email });
    if (userByMail.verify) {
      const error = new Error(`Verification has already been passed`);
      error.status = 400;
      throw error;
    }

    const verificationMail = {
      to: email,
      subject: "Verification Email",
      html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${userByMail.verificationToken}" >Click to confirm</a>`,
    };
    await sendEmail(verificationMail);

    res.json({
      status: "success",
      code: 200,
      message: "Verification Email send",
      email,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = resendEmailVerify;
