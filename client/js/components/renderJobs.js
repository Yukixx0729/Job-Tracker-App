const p = document.getElementById("page")
p.className = "container"

const jobContainer = document.createElement("div")
jobContainer.className = "row"
jobContainer.id = "jobListContainer"

const displayJobList = () => {
  jobContainer.innerHTML = ""
  p.innerHTML = ""

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

    const applicationColumn = document.createElement("div")
    applicationColumn.id = "applicationColumn"
    applicationColumn.className = "col"
    jobContainer.appendChild(applicationColumn)
    const applicationHeading = document.createElement("h2")
    applicationHeading.textContent = "Application"
    applicationColumn.appendChild(applicationHeading)

    const phoneIntColumn = document.createElement("div")
    phoneIntColumn.id = "phoneIntColumn"
    phoneIntColumn.className = "col"
    jobContainer.appendChild(phoneIntColumn)
    const phoneIntHeading = document.createElement("h2")
    phoneIntHeading.textContent = "Phone Interview"
    phoneIntColumn.appendChild(phoneIntHeading)

    const interviewColumn = document.createElement("div")
    interviewColumn.id = "interviewColumn"
    interviewColumn.className = "col"
    jobContainer.appendChild(interviewColumn)
    const interviewHeading = document.createElement("h2")
    interviewHeading.textContent = "Interview"
    interviewColumn.appendChild(interviewHeading)

    const completeColumn = document.createElement("div")
    completeColumn.id = "completeColumn"
    completeColumn.className = "col"
    jobContainer.appendChild(completeColumn)
    const completeHeading = document.createElement("h2")
    completeHeading.textContent = "Complete"
    completeColumn.appendChild(completeHeading)

    jobs
      .filter((job) => job.stages === "Application")
      .forEach((job) => {
        const id = job.id
        const title = job.title
        const company = job.company
        const location = job.location
        const description = job.description
        const jobUrl = job.job_url
        const dueDate = new Date(job.due_date)
        const stage = job.stages

        const jobDiv = document.createElement("div")
        const jobTitle = document.createElement("h4")
        const jobCompany = document.createElement("p")
        const jobLocation = document.createElement("p")
        const jobDescription = document.createElement("p")
        const jobURL = document.createElement("p")
        const jobDueDate = document.createElement("p")
        const jobStage = document.createElement("p")
        applicationColumn.appendChild(jobDiv)
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
      })


      jobs
      .filter((job) => job.stages === "Phone Interview")
      .forEach((job) => {
        const id = job.id
        const title = job.title
        const company = job.company
        const location = job.location
        const description = job.description
        const jobUrl = job.job_url
        const dueDate = new Date(job.due_date)
        const stage = job.stages

        const jobDiv = document.createElement("div")
        const jobTitle = document.createElement("h4")
        const jobCompany = document.createElement("p")
        const jobLocation = document.createElement("p")
        const jobDescription = document.createElement("p")
        const jobURL = document.createElement("p")
        const jobDueDate = document.createElement("p")
        const jobStage = document.createElement("p")
        phoneIntColumn.appendChild(jobDiv)
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
              container.remove()
            })
        })
      })

      jobs
      .filter((job) => job.stages === "Interview")
      .forEach((job) => {
        const id = job.id
        const title = job.title
        const company = job.company
        const location = job.location
        const description = job.description
        const jobUrl = job.job_url
        const dueDate = new Date(job.due_date)
        const stage = job.stages

        const jobDiv = document.createElement("div")
        const jobTitle = document.createElement("h4")
        const jobCompany = document.createElement("p")
        const jobLocation = document.createElement("p")
        const jobDescription = document.createElement("p")
        const jobURL = document.createElement("p")
        const jobDueDate = document.createElement("p")
        const jobStage = document.createElement("p")
        interviewColumn.appendChild(jobDiv)
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
              container.remove()
            })
        })
      })
    
      jobs
      .filter((job) => job.stages === "Complete")
      .forEach((job) => {
        const id = job.id
        const title = job.title
        const company = job.company
        const location = job.location
        const description = job.description
        const jobUrl = job.job_url
        const dueDate = new Date(job.due_date)
        const stage = job.stages

        const jobDiv = document.createElement("div")
        const jobTitle = document.createElement("h4")
        const jobCompany = document.createElement("p")
        const jobLocation = document.createElement("p")
        const jobDescription = document.createElement("p")
        const jobURL = document.createElement("p")
        const jobDueDate = document.createElement("p")
        const jobStage = document.createElement("p")
        completeColumn.appendChild(jobDiv)
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
              container.remove()
            })
        })
      })
  })
  p.appendChild(jobContainer)
}

const jobsBtn = document.getElementById("jobs")
jobsBtn.addEventListener("click", displayJobList)
