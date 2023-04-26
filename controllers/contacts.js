const express = require('express')
const { addContact, getAllContacts, getContactById, deleteContactById, updateContact } = require('../models/contactsTable.js')
const router = express.Router()

router.get('/', (req, res, next)=> {
  const userId = req.session.user.id
  const letter = req.query.letter
  return getAllContacts(userId, letter) 
    .then((contacts) => {
      res.json(contacts)
    })
    .catch((err) => {
      console.error(err)
      next(err)
    })
})

router.get('/:id', (req, res, next) => {
  const id = Number(req.params.id)
  const session_id = req.session.user.id
  return getContactById(id, session_id)
    .then((contact) => {
      res.json(contact)
    })
})

router.post('/', (req, res, next) => {
  const { contactName, companyName, email, phoneNumber, notes } = req.body
  const session_id = req.session.user.id
  console.log(`Received body:`, {contactName, companyName, email, phoneNumber, notes, session_id })

  if (!contactName) {
    const customError = new Error("Name cannot be empty")
    customError.status = 400
    return next(customError)
  }
  return addContact(contactName, companyName, email, phoneNumber, notes, session_id)
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
  const session_id = req.session.user.id
  const { contactName, companyName, email, phoneNumber, notes } = req.body
  console.log(`Received body:`, {contactName, companyName, email, phoneNumber, notes })

  return updateContact(id, session_id, contactName, companyName, email, phoneNumber, notes )
    .then(() => {
      res.sendStatus(200)
    })
    .catch((err) => {
      console.log(err.message)
      res.status(500).json({
        message: "Unexpected server error, please contact admin"
      })
    })
})

router.delete('/:id', (req, res, next) => {
  const id = Number(req.params.id)
  const session_id = req.session.user.id
  console.log(id)
  return deleteContactById(id, session_id)
    .then(() => {
      res.sendStatus(204)
    })
    .catch((err) => {
      console.log(err.message)
      res.status(500).json({
        message: "Unexpected error, please contact admin"
      })
    })
})

module.exports=router