const validationErr = (error, data, next) => {
    const { code, name } = error;
    if (name === 'MongoServerError' && code === 11000) {
        error.status = 409;
    }

    // if (name === 'ValidationError' && code === 11000) {
    //     error.status = 400;
    // }

    else {
        error.status = 400;
    }
    next();
}
module.exports = validationErr;