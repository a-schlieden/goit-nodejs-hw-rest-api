
const getCurrentUser = require('./curentUser');
const updateAvatar = require('./updAvatar');
const emailVerify = require('./emailVerify');
const resendEmailVerify = require("./resendEmailVerify");

module.exports = {
    getCurrentUser,
    updateAvatar,
    emailVerify,
    resendEmailVerify,
};