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

const generateModal = (id) => {
  return axios.get(`/jobs/${id}`)
  .then((res) => {
    const jobData = res.data
    console.log(jobData)
    const modalContainer = document.createElement('div')
    modalContainer.classList = "modal fade"
    modalContainer.id = "modalContainer"
    modalContainer.tabindex = "-1"
    modalContainer.role="dialog"
    modalContainer.setAttribute('aria-labelledby', "modalLabel")
    modalContainer.setAttribute('aria-hidden', 'true')
    modalContainer.innerHTML = `
    <div class="modal-dialog" role="document">
      <div class="modal-content" id=${jobData.id}>
        <div class="modal-header">
          <h5 class="modal-title row"> ${jobData.title} </h5>
          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h8 class=""> ${jobData.company} </h8>
        </div>
        <div class="modal-body">
        <p> <span id=subheading> Due: </span>${new Date (jobData.due_date).toLocaleDateString()} </p>
        <p> <span id=subheading> Location: </span>${jobData.location} </p>
        <a href="${jobData.job_url}"> Link to job </a>
        <p> <span id=subheading> Description: </span>${jobData.description} </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
    `
    p.appendChild(modalContainer)
  })
  .catch((err) => {
    console.log(err)
  })
  }
  


  
const displayJobList = (id) => {
  jobContainer.innerHTML = ""
  p.innerHTML = ""
  p.className = "container"

  const addJobBtn = document.createElement("button")
  addJobBtn.id = "addJobBtn"
  addJobBtn.textContent = "Add Job"
  p.appendChild(addJobBtn)
  addJobBtn.addEventListener("click", () => {
    jobContainer.innerHTML = ""
    addJobForm(id)
  })

  axios.get(`/jobs`).then((result) => {
    const jobs = result.data.rows
  
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
        jobDiv.setAttribute('data-bs-toggle', 'modal')
        jobDiv.setAttribute('data-bs-target', '#modalContainer')

        const jobTitle = document.createElement("h4")
        const jobCompany = document.createElement("p")
        const jobLocation = document.createElement("p")
        const jobDescription = document.createElement("p")
        const jobURL = document.createElement("p")
        const jobDueDate = document.createElement("p")
        jobDiv.appendChild(jobTitle)
        jobDiv.appendChild(jobCompany)
        jobDiv.appendChild(jobLocation)
        jobDiv.appendChild(jobDescription)
        jobDiv.appendChild(jobURL)
        jobDiv.appendChild(jobDueDate)
        jobTitle.textContent = `${title}`
        jobCompany.innerHTML = `<span id=subheading> Company: </span>${company}`
        jobLocation.innerHTML = `<span id=subheading> Location: </span>${location}`
        jobDescription.innerHTML = `<span id=subheading> Description: </span>${description}`
        jobURL.innerHTML = `<a href="${jobUrl}"> Link to job </a>`
        jobDueDate.innerHTML = `<span id=subheading> Due: </span>${dueDate.toLocaleDateString()}`
  
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
        jobDiv.addEventListener("click", (event) => {
          const jobId = event.currentTarget.dataset.id
          generateModal(jobId)
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

export default displayJobList