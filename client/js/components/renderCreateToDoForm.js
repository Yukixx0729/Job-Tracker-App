import renderToDoList from'./renderToDoList.js'

const renderCreateToDoForm = (id) => {
  const header = document.getElementById('page')
  header.classList = "container"
  const buttonContainer = document.createElement("div")
  buttonContainer.classList = "row justify-content-center"
  buttonContainer.id = "buttonContainer"
  axios.get('/jobs').then(res => {
      const jobs = res.data.rows;
      jobs.sort((a, b) => a.title.localeCompare(b.title))
      const jobOptions = jobs
      .map(job => `<option value="${job.id}">${job.title}: ${job.company} </option>`)
      .join('') + `<option value="0" selected>Unassigned</option>`

      header.innerHTML = `
        <form id="create-todo-form" class="mt-4">
          <h2 id = "create-title" >Create task </h2>
          <div class="form-group"> 
            <label for="title">Title</label>  
            <input type="text" name="title"></input>
          </div>
          <div class="form-group"> 
            <label for="description">Description</label>  
            <textarea id="description" name="description" rows="5"></textarea>
          </div>
          <div class="form-group"> 
            <label for="due_date">Due Date</label>  
            <input type="date" name="due_date"></input>
          </div>
          <div class="form-group">  
          <label for="priority">Priority</label>  
          <select name="priority" class="form-control">
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="high">High</option>
          </select>
          </div>
          <div class="form-group"> 
          <label for="status">Status</label>  
          <select name="status" class="form-control">
              <option value="planned">Planned</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
          </select>
          </div>
          <div class="form-group"> 
          <label for="job_id">Job</label>
          <select name="job_id" id="job_id">
            ${jobOptions}
          </select>
          </div>
          <input type="text" id="user_id" value=${id} hidden/>
          <div class="form-group"> 
          <button type="submit"> Create Task</button>
          </div>
        </form>
      `
      document.getElementById("create-todo-form").addEventListener("submit", handleFormSubmit)
      const returnToJobListBtn = document.createElement("button")
      returnToJobListBtn.id = "returnToJobListBtn"
      returnToJobListBtn.textContent = "Cancel"
      returnToJobListBtn.classList = "mb-1 mt-3 btn btn-secondary col-md-3 col-sm-4 col-11"
      buttonContainer.appendChild(returnToJobListBtn)
      header.insertAdjacentElement('afterbegin',buttonContainer)
      returnToJobListBtn.addEventListener("click", () => {
      renderToDoList(id)})
      })
      .catch(err => {
        console.error(err)
      })
}
  
function handleFormSubmit(event) {
  event.preventDefault()
  const user_id = document.getElementById("user_id")
  const job_id = document.getElementById("job_id").value
  const formData = new FormData(event.target)
  
  const body = {
    title: formData.get('title'),
    description: formData.get('description'),
    due_date: formData.get('due_date'),
    priority: formData.get('priority'),
    status: formData.get('status'),
    user_id: user_id.value,
    job_id: job_id === '0' ? null : job_id
  }
  return axios.post(`/todos`, body)
    .then(res => {
      renderToDoList(user_id.value)
    })
    .catch(err => {
      console.error(err)
    })
}
  
export default renderCreateToDoForm