import addJobForm from'./addJob.js'
import editJob from'./editJob.js'

const p = document.getElementById("page")

const jobContainer = document.createElement("div")
jobContainer.className = "row justify-content-evenly"
jobContainer.id = "jobListContainer"

const colors = ["#c3acb1", "#7f9990", "#b9d6c8", "#e1caca", "#d1909c"];

const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
};
  

const displayJobList = () => {
  jobContainer.innerHTML = ""
  p.innerHTML = ""
  p.className = "container"

  const addJobBtn = document.createElement("button")
  addJobBtn.id = "addJobBtn"
  addJobBtn.textContent = "Add Job"
  p.appendChild(addJobBtn)
  addJobBtn.addEventListener("click", () => {
    jobContainer.innerHTML = ""
    addJobForm()
  })

  axios.get("/jobs").then((result) => {
    const jobs = result.data
    console.log(jobs)
  
    const createColumn = (stages) => {
      const filteredJobs = jobs.filter((job) => job.stages === stages)
      const column = document.createElement("div")
      column.id = `${stages}`
      column.className = "col mh-100"
      column.classList.add("col", "text-center", 'border', 'border-secondary', 'mb-2', 'mx-2')
      jobContainer.appendChild(column)
      const heading = document.createElement("h2")
      heading.textContent = stages
      column.appendChild(heading)

      column.addEventListener("dragover", (event) => {
        event.preventDefault()
        const draggingJob = document.querySelector(".is-dragging")
        column.appendChild(draggingJob)
      })

      column.addEventListener("drop", (event) => {
        event.preventDefault()
        const jobId = event.dataTransfer.getData('text/plain')
        const body = {
          id: jobId,
          stages
        }
        console.log(body)
        axios.put(`/jobs/${jobId}`, body) 
        .then((response) => {
          console.log(response.data)
        //   displayJobList()
        })
        .catch((error) => {
          console.error(error)
        })
      })

      filteredJobs.forEach((job) => {
        const id = job.id
        const title = job.title
        const company = job.company
        const location = job.location
        const description = job.description
        const jobUrl = job.job_url
        const dueDate = new Date(job.due_date)
        const stage = job.stages
  
        const jobDiv = document.createElement("div")
        jobDiv.draggable = "true"
        jobDiv.classList = "job"
        
        const randomColor = getRandomColor();
        jobDiv.style.backgroundColor = randomColor;
        jobDiv.style.marginBottom = "10px";
        jobDiv.dataset.id = id
        jobDiv.dataset.stage = stage

        const jobTitle = document.createElement("h4")
        const jobCompany = document.createElement("p")
        const jobLocation = document.createElement("p")
        const jobDescription = document.createElement("p")
        const jobURL = document.createElement("p")
        const jobDueDate = document.createElement("p")
        const jobStage = document.createElement("p")
        jobDiv.appendChild(jobTitle)
        jobDiv.appendChild(jobCompany)
        jobDiv.appendChild(jobLocation)
        jobDiv.appendChild(jobDescription)
        jobDiv.appendChild(jobURL)
        jobDiv.appendChild(jobDueDate)
        jobDiv.appendChild(jobStage)
        jobTitle.textContent = `${title}`
        jobCompany.innerHTML = `<span id=subheading> Company: </span>${company}`
        jobLocation.innerHTML = `<span id=subheading> Location: </span>${location}`
        jobDescription.innerHTML = `<span id=subheading> Description: </span>${description}`
        jobURL.innerHTML = `<a href="${jobUrl}"> Link to job </a>`
        jobDueDate.innerHTML = `<span id=subheading> Due: </span>${dueDate.toLocaleDateString()}`
        jobStage.innerHTML = `<span id=subheading> Stage: </span>${stage}`
  
        const editButton = document.createElement("button")
        jobDiv.appendChild(editButton)
        editButton.textContent = "Edit"
        editButton.addEventListener("click", () => {
          return axios.get(`/jobs/${id}`).then((res) => {
            p.innerHTML = ""
            editJob(res)
          })
        })
  
        const deleteButton = document.createElement("button")
        jobDiv.appendChild(deleteButton)
        deleteButton.textContent = "Delete"
        deleteButton.addEventListener("click", () => {
          if (confirm("Are you sure you want to delete this job?"))
            return axios.delete(`/jobs/${id}`).then((res) => {
              jobDiv.remove()
            })
        })
        column.appendChild(jobDiv)

        jobDiv.addEventListener("dragstart", (event) => {
            console.log(event.target)
            jobDiv.classList.add("is-dragging")
            event.dataTransfer.setData('text/plain', id)
        })
        jobDiv.addEventListener("dragend", (event) => {
            console.log(event.target)
            jobDiv.classList.remove("is-dragging")
        })
    })
  }
    createColumn("Application")
    createColumn("Phone Interview")
    createColumn("Interview")
    createColumn("Complete")
  })
  p.appendChild(jobContainer)
}

// const jobsBtn = document.getElementById("jobs")
// jobsBtn.addEventListener("click", displayJobList)

export default displayJobList