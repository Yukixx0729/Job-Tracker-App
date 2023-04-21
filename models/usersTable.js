const db = require('./db.js')

const addUser = (userName, email, passwordHash) => {
  return db.query('INSERT INTO users (userName, email, passwordHash) VALUES ($1, $2, $3, $4)', [userName, email, passwordHash])
    .then((result) => result)
}

const checkUserExists = (email) => {
  return db.query('SELECT email, passwordHash FROM users WHERE email = $1', [email])
    .then((result) => result)
}



module.exports = {
  addUser,
  checkUserExists
}