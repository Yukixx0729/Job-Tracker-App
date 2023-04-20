const express = require('express')
const bcrypt = require('bcrypt')

const db = require('../database/db')

const router = express.Router()

const generateHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)