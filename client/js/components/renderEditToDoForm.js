import renderToDoList from'./renderToDoList.js'

const editToDoForm = (id) => {
  return axios.get(`/todos/${id}`)
  .then(res => {
  const page = document.getElementById('page')
  const task = res.data
  const dueDateObj = new Date(task.due_date)
  const formattedDueDate = dueDateObj.toISOString().substring(0, 10)

  page.classList = "container"
  const buttonContainer = document.createElement("div")

  buttonContainer.classList = "row justify-content-center"
  buttonContainer.id = "buttonContainer"
  page.appendChild(buttonContainer)

  const returnToJobListBtn = document.createElement("button")
  returnToJobListBtn.id = "returnToJobListBtn"
  returnToJobListBtn.textContent = "Cancel"
  returnToJobListBtn.classList = "mb-1 mt-3 btn btn-secondary col-md-3 col-sm-4 col-11"
  buttonContainer.appendChild(returnToJobListBtn)
  returnToJobListBtn.addEventListener("click", () => {
    renderToDoList(id)
  })

  page.innerHTML = `
  <form id="update-todo-form" class="mt-4">
    <div class="form-group">
    <h2 id = "create-title" > Edit task </h2> 
      <label for="title">Title</label>  
      <input type="text" name="title" value="${task.title}"></input>
    </div>
    <div class="form-group"> 
      <label for="description">Description</label>  
      <input type="text" name="description" value="${task.description}"></input>
    </div>
    <div class="form-group">  
      <label for="due_date">Due Date</label>  
      <input type="date" name="due_date" value="${formattedDueDate}"></input>
    </div>
    <div class="form-group">  
      <label for="priority">Priority</label>  
      <select name="priority" class="form-control">
        <option value="low" ${task.priority === 'low' ? 'selected' : ''}>Low</option>
        <option value="moderate" ${task.priority === 'moderate' ? 'selected' : ''}>Moderate</option>
        <option value="high" ${task.priority === 'high' ? 'selected' : ''}>High</option>
      </select>
    </div>
    <div class="form-group"> 
      <label for="status">Status</label>  
      <select name="status" class="form-control">
      <option value="planned" ${task.status === 'planned' ? 'selected' : ''}>Planned</option>
      <option value="in progress" ${task.status === 'in progress' ? 'selected' : ''}>In Progress</option>
      <option value="completed" ${task.status === 'completed' ? 'selected' : ''}>Completed</option>
      </select>
    </div>
    <input type="text" id="user_id" value =${task.user_id} hidden/>
    <div class="form-group">   
      <button type="submit">Update</button>
    </div>
  </form>
  `
  const container = document.createElement("div")
  container.innerHTML = page

  page.insertAdjacentElement('afterbegin',buttonContainer)
  document.getElementById("update-todo-form").addEventListener('submit', (event) => handleEditToDo(event, task.id))
  })
}

function handleEditToDo(event, id) {
  event.preventDefault()
  const formData = new FormData(event.target)
  
  const body = {
    title: formData.get('title'),
    description: formData.get('description'),
    due_date: formData.get('due_date'),
    priority: formData.get('priority'),
    status: formData.get('status'),
  }
  return axios.put(`/todos/${id}`, body)
  .then(res => {
    console.log(res.status)
    renderToDoList(user_id.value)
  })
  .catch(err => {
    console.error(err)
  })
}

export default editToDoForm