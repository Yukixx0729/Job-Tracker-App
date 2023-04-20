require('dotenv').config()
const express = require('express')
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)

const db = require('./database/db')
// const challengesController = require('./controllers/challenges')
// const usersController = require('./controllers/users')
// const sessionController = require('./controllers/session')
// const logger = require('./middleware/logger')
// const errorHandler = require('./middleware/error-handler')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static('client'))
app.use(express.json())
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  store: new pgSession({
    pool: db,
    createTableIfMissing: true
  })
}))
// app.use(logger)

// app.use(errorHandler)

app.listen(PORT, () => {
  console.log('Listening on port', PORT)
})