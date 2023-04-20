const pg = require('pg')

const db = new pg.Pool({
  database: 'job_tracker'
})

module.exports = db
