import renderCreateToDoForm from './renderCreateToDoForm.js'
import editToDoForm from'./renderEditToDoForm.js'
import deleteToDo from'./deleteToDo.js'

const generateModal = () => {
  const modalDiv = document.createElement('div')
  modalDiv.id = "modalBigDiv"
  modalDiv.innerHTML = 
  `
  <div class="modal fade" id="modalContainer" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
    <div class="modal-dialog container" role="document">
      <div class="modal-content p-3" id="">
        <div class="modal-header row justify-content-end">
        <button type="button" class="btn-close col-1" data-bs-dismiss="modal" aria-label="Close">
        </button>
        </div>
        <div class="modal-body">
          <p class="modal-text"> Are you sure you want to delete this contact? </p>
        </div>
        <div class="modal-footer row justify-content-center">
          <button id="modalDeleteBtn" type="button" class="btn-sm contact-edit-delete col-sm-2 col-4">Delete</button>
        </div>
      </div>
    </div>
  </div>
  ` 
  page.appendChild(modalDiv)  
}


const renderToDoList = (id) => {
  const page = document.getElementById("page")
  page.innerHTML = ""

  const addTaskBtnContainer = document.createElement("div")
  addTaskBtnContainer.classList = "row justify-content-center"
  page.insertAdjacentElement('afterbegin', addTaskBtnContainer)

  const addTaskBtn = document.createElement("button")
  addTaskBtn.textContent = "Add Task + "
  addTaskBtnContainer.appendChild(addTaskBtn)
  addTaskBtn.classList = "m-3 btn btn-secondary col-lg-2 col-sm-3 col-11"
  addTaskBtn.addEventListener("click", () => {renderCreateToDoForm(id)})

  const container = document.createElement("div")
  container.classList.add("container")
  page.appendChild(container)
  const row = document.createElement("div")
  row.classList.add("row")
  container.appendChild(row)
  const statuses = ["planned", "in progress", "completed"]
  statuses.forEach((status) => {
    const col = document.createElement("div")
    col.id = status
    col.classList.add("taskColumn", "col", "text-center", 'border', 'rounded', 'border-secondary', 'mb-2', 'mx-2')
    const title = document.createElement("h2")
    title.classList.add("text-center")
    title.innerText = status.charAt(0).toUpperCase() + status.slice(1)
    col.appendChild(title)
    row.appendChild(col)
    col.addEventListener("dragover", (event) => {
      event.preventDefault()
      const draggingJob = document.querySelector(".is-dragging")
      col.appendChild(draggingJob)
    })
    col.addEventListener("drop", (event) => {
      event.preventDefault()
      const todoId = event.dataTransfer.getData('text/plain')
      const body = {
        id: Number(todoId),
        status
      }
      axios.put(`/todos/${todoId}`, body)
      .then(() => {
        renderToDoList()
      })
      .catch((err) => {
        console.error(err)
      })
    })
    axios.get(`/todos`).then((res) => {
      const tasks = res.data
      tasks.sort((a, b) => {
        if (a.priority === "high" && b.priority !== "high") {
          return -1
        } else if (a.priority !== "high" && b.priority === "high") {
          return 1
        } else {
          return new Date(a.due_date) - new Date(b.due_date)
        }
      })
      tasks
        .filter((task) => task.status === status)
        .forEach((task) => {
          const card = document.createElement("div")
          card.draggable = "true"
          card.id = task.id
          card.classList.add("card", "mb-3", "mx-auto")
          if (task.status === "completed") {
            card.classList.add("task-card", "completed")
          } else {
            switch (task.priority) {
              case "low":
                card.classList.add("task-card", "low")
                break
              case "moderate":
                card.classList.add("task-card", "moderate")
                break
              case "high":
                card.classList.add("task-card", "high")
                break
            }
          }
          const cardBody = document.createElement("div")
          cardBody.classList.add("card-body", "mx-auto")
          const cardTitle = document.createElement("h5")
          cardTitle.classList.add("card-title")
          cardTitle.innerText = task.title
          const cardSubtitle = document.createElement("h6")
          cardSubtitle.classList.add("card-subtitle", "mb-2", "text-muted")
          const dueDateObj = new Date(task.due_date)
          const dueDateStr = `${dueDateObj
            .getDate()
            .toString()
            .padStart(2, "0")}/${(dueDateObj.getMonth() + 1)
            .toString()
            .padStart(2, "0")}/${dueDateObj.getFullYear()}`
          cardSubtitle.innerText = `Due: ${dueDateStr}`
          if (task.job_id) {
            const jobId = document.createElement("p")
            jobId.classList.add("card-text")
            axios.get(`/jobs/${task.job_id}`).then((res) => {
              const jobTitle = res.data.title
              jobId.innerText = `Job: ${jobTitle}`
              cardSubtitle.insertAdjacentElement('afterend', jobId)
            })
          }
          const cardText = document.createElement("p")
          cardText.classList.add("card-text")
          cardText.innerText = task.description

          const deleteBtn = document.createElement("button")
          deleteBtn.textContent = "Delete"
          deleteBtn.classList.add("btn", "btn-outline-dark", "btn-sm", "hidden", "card-btn")
          deleteBtn.dataset.id = task.id
          deleteBtn.setAttribute('data-bs-toggle', 'modal')
          deleteBtn.setAttribute('data-bs-target', '#modalContainer')

          deleteBtn.addEventListener("click", (event) => {
            modalContainer.style.display = 'block'
            modalContainer.dataset.id = event.currentTarget.dataset.id
          })

          const editBtn = document.createElement("button")
          editBtn.textContent = "Edit"
          editBtn.classList.add("btn", "btn-outline-dark", "btn-sm", "mx-2", "hidden", "card-btn")
          editBtn.addEventListener("click", () => editToDoForm(task.id))
          cardBody.appendChild(cardTitle)
          cardBody.appendChild(cardSubtitle)
          cardBody.appendChild(cardText)
          cardBody.appendChild(deleteBtn)
          cardBody.appendChild(editBtn)
          card.appendChild(cardBody)
          col.appendChild(card)

          card.addEventListener("mouseenter", () => {
            deleteBtn.classList.remove("hidden")
            editBtn.classList.remove("hidden")
          })
          card.addEventListener("mouseleave", () => {
            deleteBtn.classList.add("hidden")
            editBtn.classList.add("hidden")
          });
          card.addEventListener("dragstart", (event) => {
            card.classList.add("is-dragging")
            event.dataTransfer.setData('text/plain', task.id)
        })
          card.addEventListener("dragend", (event) => {
            card.classList.remove("is-dragging")
        })
      })
    })
  })
  generateModal()
  const modalDeleteBtn = document.getElementById("modalDeleteBtn")
  modalDeleteBtn.addEventListener("click", () => {
    const toDo = document.getElementById("modalContainer").dataset.id
    document.querySelector(".modal-backdrop").classList = ""
    deleteToDo(toDo)
  })
  modalDeleteBtn.addEventListener
}

export default renderToDoList