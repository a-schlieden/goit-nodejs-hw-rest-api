const { User } = require("../../models/user");
const path = require("path");
const fs = require("fs").promises;

const imagesDir = path.join(__dirname, "../../", "publik", "avatars");

const updateAvatar = async (req, res, next) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id } = req.user;
  const imgName = `${_id}-${originalname}`;
  try {
    const resultUpload = path.join(imagesDir, imgName);
    await fs.rename(tempUpload, resultUpload);
    const avatarUrl = path.join("publik", "avatars", imgName);
    await User.findByIdAndUpdate(req.user._id, { avatarUrl });
    res.json({ avatarUrl });
  } catch (error) {
    await fs.unlink(tempUpload);
  }
};

module.exports = updateAvatar;
