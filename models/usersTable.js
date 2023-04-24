const db = require('./db.js')

const addUser = (userName, email, passwordHash) => {
  return db.query('INSERT INTO users (user_name, email, password_hash) VALUES ($1, $2, $3)', [userName, email, passwordHash])
    .then((result) => result)
}

const getAllusers = () => {
  return db.query("SELECT * FROM users;").then((result) => result.rows);
};


const checkUserExists = (email) => {
  return db.query('SELECT user_name, email, password_hash FROM users WHERE email = $1', [email])
    .then((result) => result)
}



module.exports = {
  addUser,
  checkUserExists,
  getAllusers
}