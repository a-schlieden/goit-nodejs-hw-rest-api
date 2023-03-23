const { User } = require("../../models/user");
const path = require("path");
const fs = require("fs");

const updateAvatar = async (req, res, next) => {
    try {
        await fs.rename()
    }
    catch (error) {
        await fs.unlink();
        throw error
    }
};

module.exports = updateAvatar;