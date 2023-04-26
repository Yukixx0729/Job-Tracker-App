const express = require("express");
const db = require("../models/job");
const router = express.Router();

const {
  getAllJobs,
  getJobById,
  addJob,
  updateJob,
  deleteJobById,
  getJobByUserId,
} = require("../models/job");

// router.get("/", (req, res) => {
//   return getAllJobs().then((jobs) => {
//     res.json(jobs);
//   });
// });

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  return getJobById(id).then((job) => {
    res.json(job);
  });
});

//get jobs by user_id
router.get("/", (req, res) => {
  const id = req.session.user.id 
  return getAllJobs(id).then((jobs) => {
    res.json(jobs);
  });
});

router.post("/", (req, res) => {
  const {
    title,
    company,
    location,
    description,
    job_url,
    due_date,
    stages,
    user_id,
  } = req.body;
  console.log("Body received:", {
    title,
    company,
    location,
    description,
    job_url,
    due_date,
    stages,
    user_id,
  });

  return addJob(
    title,
    company,
    location,
    description,
    job_url,
    due_date,
    stages,
    user_id
  ).then((result) => {
    const newJob = {
      id: result.rows[0].id,
      title,
      company,
      location,
      description,
      job_url,
      due_date,
      stages,
      user_id,
    };
    res.json(newJob);
  });
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const { title, company, location, description, job_url, due_date, stages } =
    req.body;
  console.log(req.body);
  return updateJob(
    id,
    title,
    company,
    location,
    description,
    job_url,
    due_date,
    stages
  )
    .then(() => {
      res.json({ message: "Job updated" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error updating job");
    });
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  return deleteJobById(id)
    .then(() => {
      res.json({ message: "Job deleted successfully" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error deleting job");
    });
});

module.exports = router;
