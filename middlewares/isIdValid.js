const { isValidObjectId } = require("mongoose");
const isValidId = (req, res, next) => {
    const { id } = req.params;
    const isCorrect = isValidObjectId(id)
    if (!isCorrect) {
        const err = new Error(`id ${id} is not correct`);
        err.status = 400;
        throw err;

    }
    next()
}
module.exports = isValidId;