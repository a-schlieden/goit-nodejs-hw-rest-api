const { User } = require("../../models/user");
const path = require("path");
const fs = require("fs").promises;
var jimp = require("jimp");


const imagesDir = path.join(__dirname, "../../", "publik", "avatars");

const updateAvatar = async (req, res, next) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id } = req.user;
  const imgName = `${_id}-${originalname}`;


  const residedImg = await jimp.read("imgName", (err, imgName) => {
    if (err) throw err;
    imgName.resize(250, 250)
  });



  try {
    const resultUpload = path.join(imagesDir, residedImg);
    //const resultUpload = path.join(imagesDir, imgName);
    await fs.rename(tempUpload, resultUpload);
    const avatarUrl = path.join("publik", "avatars", imgName);
    await User.findByIdAndUpdate(req.user._id, { avatarUrl });
    res.json({ avatarUrl });
  } catch (error) {
    await fs.unlink(tempUpload);
  }
};

module.exports = updateAvatar;
