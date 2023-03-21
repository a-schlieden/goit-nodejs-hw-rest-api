const { User, schemas } = require("../../models/user");

const getCurrentUser = async (req, res, next) => {
  const { email, subscription } = req.user;

  res.json({
    status: "success",
    code: 200,
    data: {
      user: {
        subscription,
        email,
      },
    },
  });
};

module.exports = getCurrentUser;
