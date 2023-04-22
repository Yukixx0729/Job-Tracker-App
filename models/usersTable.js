const db = require('./db.js')

const addUser = (userName, email, passwordHash) => {
  return db.query('INSERT INTO users (user_name, email, password_hash) VALUES ($1, $2, $3)', [userName, email, passwordHash])
    .then((result) => result)
}

const checkUserExists = (email) => {
  return db.query('SELECT email, password_hash FROM users WHERE email = $1', [email])
    .then((result) => result)
}



module.exports = {
  addUser,
  checkUserExists
}