const p = document.getElementById("page")

const jobContainer = document.createElement("div")
jobContainer.className = "row"
jobContainer.id = "jobListContainer"

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
  
    const createColumn = (stage) => {
      const filteredJobs = jobs.filter((job) => job.stages === stage)
      const column = document.createElement("div")
      column.id = `${stage}Column`
      column.className = "col"
      jobContainer.appendChild(column)
      const heading = document.createElement("h2")
      heading.textContent = stage
      column.appendChild(heading)
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
        jobDescription.innerHTML = `<span id=subheading> Company: </span>${description}`
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
              container.remove()
            })
        })
        column.appendChild(jobDiv)

        // jobDiv.addEventListener("dragstart", (event) => {
        //     console.log(event.target)
        //     jobDiv.classList.add("is-dragging")
        // jobDiv.addEventListener("dragend", (event) => {
        //     console.log(event.target)
        //     jobDiv.classList.remove("is-dragging")
        // })

        // column.addEventListener("dragover", (event) => {
        //     event.preventDefault()
        //     const draggingJob = document.querySelector(".is-dragging")
        //     column.appendChild(draggingJob)

        // })
        
        // jobDiv.addEventListener("drop", (event) => {
        //     event.preventDefault()
        //     const body = {
        //         id: event.dataTransfer.getData("text"),
        //         stage: event.currentTarget.parentElement.id
        //     }
        //     axios.put(`/jobs/${id}`, body) 
        //       .then((response) => {
        //         console.log(response.data)
        //       })
        //       .catch((error) => {
        //         console.error(error)
        //       })
        //   })
        // return jobDiv
    //   })
    })
    createColumn("Application")
    createColumn("Phone Interview")
    createColumn("Interview")
    createColumn("Complete")
  }
  p.appendChild(jobContainer)
})
}

const jobsBtn = document.getElementById("jobs")
jobsBtn.addEventListener("click", displayJobList)