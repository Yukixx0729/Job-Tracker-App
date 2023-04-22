const express = require('express')
const { addContact, getAllContacts, getContactById, deleteContactById, updateContact } = require('../models/contactsTable.js')
const router = express.Router()

router.get('/', (res, req, next)=> {
  
})

module.exports=router