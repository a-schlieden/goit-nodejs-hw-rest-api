const fs = require("fs").promises;

const path = require("path");
const uuid = require("uuid");

const contactsPath = path.resolve("./models/contacts.json");

const parsData = async () => {
  const contactsStr = await fs.readFile(contactsPath, "utf8");
  const contactsArr = JSON.parse(contactsStr);
  return contactsArr;
};

const listContacts = async () => {
  const parsContacts = await parsData();
  return parsContacts;
};

const getContactById = async (contactId) => {
  const parsContacts = await parsData();
  const contact = parsContacts.find((item) => item.id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
};

const removeContact = async (contactId) => {
  const parsContacts = await parsData();
  const index = parsContacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  parsContacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(parsContacts));
};

const addContact = async (body) => {
  const newContact = { ...body, id: uuid.v4() };
  const parsContacts = await parsData();
  parsContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(parsContacts));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const parsContacts = await parsData();
  const index = parsContacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  parsContacts[index] = { ...body, contactId };
  await fs.writeFile(contactsPath, JSON.stringify(parsContacts));
  return parsContacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
