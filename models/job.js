const db = require("./db.js");

const getAllJobs = () => {
  return db
    .query("SELECT * FROM jobs ORDER BY due_date ASC;")
    .then((result) => result.rows);
};

const getJobById = (id) => {
  return db
    .query("SELECT * FROM jobs WHERE id=$1", [id])
    .then((result) => result);
};

const getJobByUserId = (user_id) => {
  return db
    .query("SELECT * FROM jobs WHERE user_id=$1", [user_id])
    .then((result) => result);
};

const addJob = (
  title,
  company,
  location,
  description,
  job_url,
  due_date,
  stages,
  user_id
) => {
  const sql = `INSERT INTO jobs (title, company, location, description, job_url, due_date, stages,user_id) 
                 VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id;`;
  return db.query(sql, [
    title,
    company,
    location,
    description,
    job_url,
    due_date,
    stages,
    user_id,
  ]);
};

const updateJob = (
  id,
  title,
  company,
  location,
  description,
  job_url,
  due_date,
  stages
) => {
  let sql;
  let params;

  if (
    id &&
    stages &&
    !title &&
    !company &&
    !location &&
    !description &&
    !job_url &&
    !due_date
  ) {
    sql = `UPDATE jobs SET stages = $2 WHERE id = $1;`;
    params = [id, stages];
  } else {
    sql = `UPDATE jobs SET title = $2, company = $3, location = $4, description = $5, job_url = $6, due_date = $7, stages = $8 WHERE id = $1;`;
    params = [
      id,
      title,
      company,
      location,
      description,
      job_url,
      due_date,
      stages,
    ];
  }
  return db.query(sql, params).then((result) => result.rows[0]);
};

const deleteJobById = (id) => {
  return db.query("DELETE FROM jobs WHERE id = $1;", [id]);
};

module.exports = {
  getAllJobs,
  getJobById,
  addJob,
  updateJob,
  deleteJobById,
  getJobByUserId,
};
