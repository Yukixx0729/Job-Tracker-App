const express = require('express')
const { addContact, getAllContacts, getContactById, deleteContactById, updateContact } = require('../models/contactsTable.js')
const router = express.Router()

router.get('/', (req, res, next)=> {
  return getAllContacts() 
    .then((contacts) => {
      res.json(contacts)
    })
})

router.get('/:id', (req, res, next) => {
  const id = Number(req.params.id)
  return getContactById(id)
    .then((contact) => {
      res.json(contact)
    })
})

router.post('/', (req, res, next) => {
  const { contactName, companyName, email, phoneNumber, notes } = req.body
  console.log(`Receievd body:`, {contactName, companyName, email, phoneNumber, notes })

  if (!contactName) {
    const customError = new Error("Name cannot be empty")
    customError.status = 400
    return next(customError)
  }
  return addContact(contactName, companyName, email, phoneNumber, notes)
    .then((contact) => {
      res.json(contact)
    }) 
    .catch((err) => {
      console.log(err.message)
      res.status(500).json({
        message: "Unexpected server error, please try again"
      })
    })
})

router.put('/:id', (req, res, next) => {
  const id = Number(req.params.id)
  const { contactName, companyName, email, phoneNumber, notes } = req.body
  console.log(`Receievd body:`, {contactName, companyName, email, phoneNumber, notes })

  return updateContact(id, contactName, companyName, email, phoneNumber, notes )
    .then((contact) => {
      res.json(contact)
    })
    .catch((err) => {
      console.log(err.message)
      res.status(500).json({
        message: "Unexpected server error, please contact admin"
      })
    })
})

// router.delete('/:id' (res, req, next) => {
//   const id = Number(req.)
// })

module.exports=router