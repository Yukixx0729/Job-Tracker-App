const { Pool } = require('pg')

const db = new Pool({
  database: 'job_tracker',
  password: 'password'
})

module.exports = db
