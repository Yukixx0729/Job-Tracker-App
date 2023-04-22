require('dotenv').config()
const express = require('express')
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)

const db = require('./models/db')
// const challengesController = require('./controllers/challenges')
const usersController = require('./controllers/users')
const httpLoggerMiddleware = require('./middleware/httpLogger')
// const sessionController = require('./controllers/session')
// const errorHandler = require('./middleware/error-handler')

const app = express()
app.use(express.static('client'))
app.use(express.json())

app.use('/users', httpLoggerMiddleware, usersController)

app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  store: new pgSession({
    pool: db,
    createTableIfMissing: true
  })
}))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log('Listening on port', PORT)
})