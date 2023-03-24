
const multer = require("multer");
const path = require("path");

const tmpDir = path.join(__dirname, "../", "temp");

const multerCfg = multer.diskStorage({
    destination: (req, file, cbf) => {
        cbf(null, tmpDir)
    },
    filename: (req, file, cbf) => {
        cbf(null, file.originalname)
    },
    limits: {
        fileSize: 2048
    }
})

const upload = multer({
    storage: multerCfg
})

module.exports = upload;