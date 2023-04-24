const express = require('express')
const bcrypt = require('bcrypt')
const { addUser, checkUserExists } = require('../models/usersTable.js')

const router = express.Router()

function generateHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}
function checkValidPassword(password) {
  const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const numbers = "0123456789"
  const specialChars = "!@#$%^&*()"

  let hasUpperCase = false
  let hasNumber = false
  let hasSpecialChar = false

  for (const char of password) {
    if (uppercaseLetters.includes(char)) {
      hasUpperCase = true
    } else if (numbers.includes(char)) {
      hasNumber = true
    } else if (specialChars.includes(char)) {
      hasSpecialChar = true
    }
  }
  return hasUpperCase && hasNumber && hasSpecialChar && password.length >= 8
}

function checkPasswordsMatch(password, passwordCheck) {
  return password === passwordCheck
}

router.post('/signup', (req, res, next) => {
  const { userName, email, password, passwordCheck } = req.body
  console.log(req.body)
  console.log(`Received body: `, { userName, email })
  if (userName && email && password && passwordCheck) {
    checkUserExists(email)
    .then((result) => {
      if (result.rowCount > 0) {
        return res.status(409).json({ message: "User already exists, please login"})
      }

      if (!checkValidPassword(password)) {
        return res.status(400).json({ message: "Password must be at least 8 characters long, with at least one capital, one number, and one special character" })
      }
        
      if (!checkPasswordsMatch(password, passwordCheck)) {
        return res.status(400).json({ message: "Passwords do not match"})
      } else {
        passwordHash = generateHash(password)
      }

      return addUser(userName, email, passwordHash)
        .then(() => {
          return res.sendStatus(201)
        })
        .catch((err) => {
          next(err)
        })
    })
  } else if (!userName || !email || !password) {
    return res.status(400).json({ message: "Missing field" })
  }  
})


router.post('/login', (req, res) => {
  const { loginEmail, loginPassword } = req.body
  checkUserExists(loginEmail)
  .then((result) => {
    if (result.rowCount === 1) {
      const user = result.rows[0]
      
      if (bcrypt.compareSync(loginPassword, user.password_hash)) {
        req.session.user = user
        return res.status(200).json({ message: "Login successful" })
      } else {
        return res.status(401).json({ message: "Email or password invalid" })
      }
    }
  })
})

router.get('/login', (req,res)=>{
  const { user } = req.session
  if (!req.session.user){
    return res.status(401).json({ message: 'Not logged in'})
  }
  res.json({ user })
})

router.delete('/login', (req,res)=>{
  req.session.destroy(() =>{
    res.json({ message: 'logged out' })
   
  })
})


module.exports = router