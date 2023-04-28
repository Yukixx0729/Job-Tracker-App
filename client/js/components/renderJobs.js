import addJobForm from'./addJob.js'
import editJob from'./editJob.js'

const p = document.getElementById("page")

const colors = ["#c3acb1", "#7f9990", "#b9d6c8", "#e1caca", "#d1909c"]

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length)
  return colors[randomIndex];
}

const generateModal = () => {
  const modalDiv = document.createElement('div')
  modalDiv.id = "modalBigDiv"
  modalDiv.innerHTML = `
    <div class="modal fade" id="modalContainer" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content" id="">
        <div class="modal-header">
          <h5 class="modal-title row"> </h5>
          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h8 class="modal-company"> </h8>
        </div>
        <div class="modal-body">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
    </div>
  ` 
  p.appendChild(modalDiv)  
}
    
const displayJobList = (id) => {
  p.innerHTML = ""
  p.className = "container"

  const jobColumnContainer = document.createElement("div")
  jobColumnContainer.className = "container-fluid"
  p.appendChild(jobColumnContainer)

  const columnNoWrapContainer = document.createElement("div")
  columnNoWrapContainer.className = "row flex-nowrap overflow-auto"
  jobColumnContainer.appendChild(columnNoWrapContainer)

  const addJobBtn = document.createElement("button")
  addJobBtn.id = "addJobBtn"
  addJobBtn.textContent = "Add Job"
  p.insertAdjacentElement('afterBegin', addJobBtn)
  addJobBtn.addEventListener("click", () => {
    p.removeChild(addJobBtn)
    addJobForm(id)
  })

  axios.get(`/jobs`).then((result) => {
    const jobs = result.data.rows
  
    const createColumn = (stages) => {
      const filteredJobs = jobs.filter((job) => job.stages === stages)

      const column = document.createElement("div")
      column.id = `${stages}`
      column.className = "jobColumns mh-100"
      column.classList.add("col-4", "col-md-3", "col-lg-2", "text-center", 'border', 'border-secondary', 'mb-2', 'mx-2')
      columnNoWrapContainer.appendChild(column)
      const heading = document.createElement("h3")
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
        const dueDate = new Date(job.due_date)
        const stage = job.stages
  
        const jobDiv = document.createElement("div")
        jobDiv.draggable = "true"
        jobDiv.classList = "job card"
        
        const randomColor = getRandomColor();
        jobDiv.style.backgroundColor = randomColor;
        jobDiv.style.marginBottom = "10px";
        jobDiv.dataset.id = id
        jobDiv.dataset.stage = stage
        jobDiv.setAttribute('data-bs-toggle', 'modal')
        jobDiv.setAttribute('data-bs-target', '#modalContainer')

        const jobTitle = document.createElement("h5")
        const jobCompany = document.createElement("h6")
        const jobDueDate = document.createElement("p")
        jobDiv.appendChild(jobTitle)
        jobDiv.appendChild(jobCompany)
        jobDiv.appendChild(jobDueDate)
        jobTitle.textContent = `${title}`
        jobCompany.textContent = `${company}`
        jobDueDate.innerHTML = `<em><span class="d-none d-xl-inline-block"> Due:</span> ${dueDate.toLocaleDateString()}</em>`

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
          axios.get(`/jobs/${jobId}`)
          .then((res) => {
            const jobData = res.data;
            console.log(jobData);
            modalContainer.querySelector('.modal-content').id = jobData.id;
            modalContainer.querySelector('.modal-title').textContent = jobData.title;
            modalContainer.querySelector('.modal-company').textContent = jobData.company
            modalContainer.querySelector('.modal-body').innerHTML = `
              <p> <span class=subheading> Due: </span>${new Date (jobData.due_date).toLocaleDateString()} </p>
              <p> <span class=subheading> Stage: </span> ${jobData.stages}
              <p> <span class=subheading> Location: </span>${jobData.location} </p>
              <a href="${jobData.job_url}"> Link to job </a>
              <p> <span class=subheading> Description: </span>${jobData.description} </p>
            `;
            const modalFooter = document.querySelector(".modal-footer")
            modalFooter.innerHTML = ''
            
            const editButton = document.createElement("button")
            modalFooter.appendChild(editButton)
            editButton.textContent = "Edit"
            editButton.addEventListener("click", () => {
              document.querySelector(".modal-backdrop").classList = ""
              return axios.get(`/jobs/${id}`).then((res) => {
                p.innerHTML = ""
                editJob(res)
              })
            })
          
            const deleteButton = document.createElement("button")
            modalFooter.appendChild(deleteButton)
            deleteButton.textContent = "Delete"
            deleteButton.addEventListener("click", () => {
              document.querySelector(".modal-backdrop").classList = ""
              if (confirm("Are you sure you want to delete this job?"))
                return axios.delete(`/jobs/${id}`).then((res) => {
                  jobDiv.remove()
                  displayJobList()
                })
            })
            modalContainer.style.display = 'block';
          })
          .catch((err) => {
            console.log(err);
          });
        })
    })
  }
  createColumn("Saved")
  createColumn("Applied")
  createColumn("First Interview")
  createColumn("Follow Up Interview")
  createColumn("Practical Test")
  createColumn("Complete")
  generateModal()

  })
}

export default displayJobList