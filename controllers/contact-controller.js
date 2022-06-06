/* eslint-disable no-unused-vars */
const Contact = require('../models/contact');
const createPath = require('../helpers/create-path');
const handleError = (error, res) => {
  console.log('Error: ', error);
  res.render(createPath('error'), { title: 'Error' });
};
const getContacts = (req, res) => {
  const title = 'Contacts';
  Contact.find()
    .then((contacts) => {
      console.log('Contacts: ', contacts);
      res.render(createPath('contacts'), { title, contacts });
    })
    .catch((error) => handleError);
};

module.exports = {
  getContacts,
};
