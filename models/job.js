const db = require('./db.js')


const getAllJobs = () =>{
    return db
    .query("SELECT * FROM jobs")
    .then(result => result.rows)

}

const getJobById = (id) =>{
    return db
    .query("SELECT * FROM jobs WHERE id = $1;", [id])
    .then((result) => result.rows[0])
}

const addJob = (title,company,location,description,job_url,due_date,stages) =>{
    const sql = `INSERT INTO jobs (title, company, location, description, job_url, due_date, stages) 
                 VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING id;`
                return db
                .query(sql, [title,company,location,description,job_url,due_date,stages])
}   

const updateJob = (title,company,location,description,job_url,due_date,stages,id) =>{
    const sql = `UPDATE jobs
                 SET title = $2, company = $3, location = $4, description = $5, job_url = $6, due_date = $7, stages = $8
                 WHERE id = $1
                 RETURNING *;`
                 return db.query(sql, [title, company, location, description, job_url, due_date, stages, id])
                 .then(result => result.rows[0])
}

const deleteJobById = (id) =>{
    return db.query("DELETE FROM jobs WHERE id = $1;",[id])
}


module.exports={
    getAllJobs,
    getJobById,
    addJob,
    updateJob,
    deleteJobById
}