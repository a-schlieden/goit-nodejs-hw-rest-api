const getAllContacts = require('./getAllContacts');
const getById = require('./getById');
const addNew = require('./addNew');
const update = require('./update');
const remove = require('./remove');
const updateByFavorite = require('./updateByFavorite');

module.exports = {
    getAllContacts,
    getById,
    addNew,
    update,
    remove,
    updateByFavorite,
};