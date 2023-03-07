const validationErr = (error, data, next) => {
    const { code, name } = error;
    if (name === 'MongoServerError' && code === 11000) {
        error.status = 409;
    }
    else {
        error.status = 400;
    }
    next();
}
module.exports = validationErr;