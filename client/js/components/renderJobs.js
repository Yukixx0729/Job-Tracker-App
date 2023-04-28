import addJobForm from'./addJob.js'
import editJob from'./editJob.js'
import { createButtonContainer } from './renderContactsList.js'

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
      <div class="modal-content p-3" id="">
        <div class="modal-header row justify-content-around">
          <h5 class="modal-title col"> </h5>
          <button type="button" class="btn-close col-1" data-bs-dismiss="modal" aria-label="Close">
          </button>
          <h8 class="modal-company row ml-5"> </h8>
        </div>
        <div class="modal-body">
        </div>
        <div class="modal-footer">
        </div>
      </div>
    </div>
    </div>
  ` 
  p.appendChild(modalDiv)  
}

const generateConfirmDeleteModal = () => {
  const deleteModal = document.createElement('div')
  deleteModal.id="deleteModal"
  deleteModal.innerHTML = 
  `
  <div class="modal fade" id="deleteModalContainer" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content p-3" id="">
      <div class="modal-header row justify-content-right">
        <button type="button" class="btn-close col-1" data-bs-dismiss="modal" aria-label="Close">
        </button>
      </div>
      <div class="row justify-content-center">
        <h6 class="modal-company col ml-5"> Are you sure you want to delete this job? </h6>
      </div>
      <div id="delete-modal-footer">
      </div>
    </div>
  </div>
  </div>
  `
  p.appendChild(deleteModal)         
}
    
const displayJobList = (id) => {
  p.innerHTML = ""
  p.className = ""

  const jobColumnContainer = document.createElement("div")
  jobColumnContainer.className = "row h-100 flex-nowrap m-5 overflow-auto"
  jobColumnContainer.id = "jobColumnContainer"
  p.appendChild(jobColumnContainer)

  const addJobBtnContainer = document.createElement("div")
  addJobBtnContainer.classList = "row justify-content-center"
  p.insertAdjacentElement('afterbegin', addJobBtnContainer)

  const addJobBtn = document.createElement("button")
  addJobBtn.id = "addJobBtn"
  addJobBtn.textContent = "Add Job +"
  addJobBtn.classList = "m-3 btn btn-secondary col-lg-2 col-sm-3 col-11"
  addJobBtnContainer.appendChild(addJobBtn)
  addJobBtn.addEventListener("click", () => {
    p.removeChild(addJobBtn)
    addJobForm(id)
  })

  axios.get(`/jobs`).then((result) => {
    const jobs = result.data.rows
    const createColumn = (stages) => {
      const filteredJobs = jobs.filter((job) => job.stages === stages)
      const column = document.createElement("div")
      column.id = `${stages}-column`
      column.className = "jobColumns mh-100"
      column.classList.add("col-11", "col-sm-4", "col-md-3", "col-lg-2", "text-center", 'border', 'rounded', 'border-secondary', 'mb-2', 'mx-2')
      jobColumnContainer.appendChild(column)

      const headingDiv = document.createElement("div")
      headingDiv.id = "headingDiv"
      headingDiv.classList = "d-flex align-items-center justify-content-center"
      column.insertAdjacentElement('afterbegin', headingDiv)

      const heading = document.createElement("h4")
      heading.textContent = stages
      headingDiv.appendChild(heading)

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
        jobDiv.classList = "job row"
        
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
            modalFooter.classList = "row justify-content-around"
            modalFooter.id = "modalFooter"
            
            const editButton = document.createElement("button")
            modalFooter.appendChild(editButton)
            editButton.textContent = "Edit"
            editButton.className = "mb-3 editBtn btn-sm contact-edit-delete col-2"
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
            deleteButton.className = "mb-3 deleteBtn btn-sm contact-edit-delete col-2"
            deleteButton.addEventListener("click", (event) => {
              console.log(event.target)
              const displayModal = document.getElementById("modalContainer")
              displayModal.style.display = "none"
              const mainModal = new bootstrap.Modal(displayModal)
              document.querySelector(".modal-backdrop").classList = ""
              mainModal.hide()
              
              const deleteModalElement = document.getElementById("deleteModalContainer")
              const deleteModal = new bootstrap.Modal(deleteModalElement)
              deleteModal.show()

              const deleteModalFooter = document.getElementById("delete-modal-footer")
              deleteModalFooter.innerHTML = ''
              const deleteModalButtonContainer = document.createElement("div")
              deleteModalButtonContainer.classList = "row justify-content-between"
              deleteModalFooter.appendChild(deleteModalButtonContainer)
              deleteModalFooter.classList="row justify-content-around"

              const deleteModalButton = document.createElement("button")
              deleteModalButtonContainer.appendChild(deleteModalButton)
              deleteModalButton.textContent = "Delete"
              deleteModalButton.className = "my-3 deleteBtn btn-sm contact-edit-delete col-2"
              deleteModalButton.addEventListener('click', () => {
                deleteModal.hide()
                document.querySelector(".modal-backdrop").classList = ""
                modalContainer.style.display = 'block';              
                return axios.delete(`/jobs/${id}`).then((res) => {
                  jobDiv.remove()
                  displayJobList()
                })
                .catch((err) => {
                console.log(err);
                })
              })
            })
            const mainModal = new bootstrap.Modal(document.getElementById("modalContainer"))
            mainModal._element.addEventListener('hidden.bs.modal', function (event) {
            document.querySelector(".modal-backdrop").remove()
            })
          })
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
    generateConfirmDeleteModal()
  })
}

export default displayJobList