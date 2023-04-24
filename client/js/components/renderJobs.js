const p = document.getElementById("page");

const jobContainer = document.createElement("div");
jobContainer.id = "jobListContainer";
let isDisplayed = false;

const displayJobList = () => {
  jobContainer.innerHTML = "";
  p.innerHTML = "";

  const addJobBtn = document.createElement("button");
  addJobBtn.id = "addJobBtn";
  addJobBtn.textContent = "Add Job";
  p.appendChild(addJobBtn);
  addJobBtn.addEventListener("click", () => {
    jobContainer.innerHTML = "";
    addJobForm();
  });

  axios.get("/jobs").then((result) => {
    const jobs = result.data;
    console.log(jobs);
    jobs.forEach((job) => {
      const id = job.id;
      const title = job.title;
      const company = job.company;
      const location = job.location;
      const description = job.description;
      const jobUrl = job.job_url;
      const dueDate = new Date(job.due_date);
      const stage = job.stages;

      const container = document.createElement("div");
      const ul = document.createElement("ul");

      ul.innerHTML = `
                <li>Title: ${title}</li>
                <li>Company: ${company}</li>
                <li>Location: ${location}</li>
                <li>Description: ${description}</li>
                <li>Job URL: ${jobUrl}</li>
                <li>Due date: ${dueDate.toLocaleDateString()}</li>
                <li>Stage: ${stage}</li>
                `;

      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.addEventListener("click", () => {
        return axios.get(`/jobs/${id}`).then((res) => {
          p.innerHTML = "";
          editJob(res);
        });
      });

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => {
        if (confirm("Are you sure you want to delete this job?"))
          return axios.delete(`/jobs/${id}`).then((res) => {
            container.remove();
          });
      });

      container.appendChild(ul);
      container.appendChild(editButton);
      container.appendChild(deleteButton);

      jobContainer.appendChild(container);
      p.appendChild(jobContainer);
    });
    if (!isDisplayed) {
      p.appendChild(jobContainer);
      document.body.appendChild(p);
      isDisplayed = true;
    }
  });
};

const jobsBtn = document.getElementById("jobs");

// jobsBtn.addEventListener('click', displayJobList)

export default displayJobList;
