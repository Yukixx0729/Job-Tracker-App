const db = require('./db.js')

const addContact = (contactName, companyName, email, phoneNumber, notes, userId) => {
  return db.query('INSERT INTO contacts (contact_name, company_name, email, phone_number, notes, user_id) VALUES ($1, $2, $3, $4, $5, $6)', [contactName, companyName, email, phoneNumber, notes, userId])
    .then((result) => result)
}

const getAllContacts = (userId) => {
  return db.query('SELECT contact_name, company_name, email, phone_number, notes FROM contacts WHERE user_id =$1', [userId])
    .then((result) => result.rows)
}

const getContactById = (id) => {
  return db.query('SELECT * FROM contacts WHERE id =$1', [id])
    .then((result) => result.rows[0])
}

const deleteContactById = (id) => {
  return db.query('DELETE FROM contacts WHERE id =$1', [id])
    .then((result) => result.rows[0])
}

const updateContact = (id, contactName, companyName, email, phoneNumber, notes) => {
  return db.query('UPDATE contacts SET contact_name = $2, company_name = $3, email = $4, phone_number = $5, notes = $6 WHERE id=$1', [id, contactName, companyName, email, phoneNumber, notes])
    .then((result) => result.rows[0])
}

module.exports = {
  addContact,
  getAllContacts,
  getContactById,
  deleteContactById,
  updateContact
}