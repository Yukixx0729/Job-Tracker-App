const db = require('./db.js')

const addContact = (contactName, companyName, email, phoneNumber, notes, userId) => {
  return db.query('INSERT INTO contacts (contact_name, company_name, email, phone_number, notes, user_id) VALUES ($1, $2, $3, $4, $5, $6)', [contactName, companyName, email, phoneNumber, notes, userId])
    .then((result) => result)
}

const getAllContacts = (userId) => {
  return db.query('SELECT * FROM contacts WHERE user_id =$1 ORDER BY contact_name ASC', [userId])
    .then((result) => result.rows)
}

const getContactById = (id, userId) => {
  return db.query('SELECT * FROM contacts WHERE id =$1 AND user_id = $2', [id, userId])
    .then((result) => result.rows[0])
}

const deleteContactById = (id, userId) => {
  return db.query('DELETE FROM contacts WHERE id =$1 AND user_id = $2', [id, userId])
    .then((result) => result.rows[0])
}

const updateContact = (id, userId, contactName, companyName, email, phoneNumber, notes, ) => {
  return db.query('UPDATE contacts SET contact_name = $3, company_name = $4, email = $5, phone_number = $6, notes = $7 WHERE id=$1 AND user_id = $2', [id, userId, contactName, companyName, email, phoneNumber, notes])
    .then((result) => result.rows[0])
}

module.exports = {
  addContact,
  getAllContacts,
  getContactById,
  deleteContactById,
  updateContact
}