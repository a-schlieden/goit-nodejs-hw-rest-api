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

    if (!userByMail) {
      const error = new Error(`Email or password is wrong`);
      error.status = 401;
      throw error;
    }

    const isPasswordTrue = bcrypt.compareSync(password, userByMail.password);

    if (!isPasswordTrue) {
      const error = new Error(`Email or password is wrong`);
      error.status = 401;
      throw error;
    }


    //// prüfen vll.  add in linie 17 !userByMail.verify

    if (!userByMail.verify) {
      const error = new Error(`Email is no verify`);
      error.status = 401;
      throw error;
    }

    const payload = {
      id: userByMail._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
    await User.findByIdAndUpdate(userByMail._id, { token });
    res.json({
      status: "success",
      code: 200,
      token,
      user: {
        email,
        subscription: userByMail.subscription,

      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
