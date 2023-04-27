import renderToDoList from'./renderToDoList.js'

const renderCreateToDoForm = (id) => {
    const header = document.getElementById('page')

    axios.get('/jobs')
    .then(res => {
      const jobs = res.data.rows;

      // Generate job options markup
      const jobOptions = jobs.filter(job => job.id !== null).map(job => `<option value="${job.id}">${job.title}</option>`).join('');

      // Update form markup
      header.innerHTML = `
        <form id="create-todo-form">
          <h2>Create new task </h2>
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
      `;

      document.getElementById("create-todo-form").addEventListener("submit", handleFormSubmit);
    })
    .catch(err => {
      console.error(err);
    });
};
  
  function handleFormSubmit(event) {
    event.preventDefault();
    const user_id = document.getElementById("user_id")
    const job_id = document.getElementById("job_id")
    console.log(user_id)
    console.log(job_id)
    const formData = new FormData(event.target);
  
    console.log(formData);
  
    const body = {
      title: formData.get('title'),
      description: formData.get('description'),
      due_date: formData.get('due_date'),
      priority: formData.get('priority'),
      status: formData.get('status'),
      user_id: user_id.value,
      job_id: job_id.value
    };
    console.log(body)
    return axios.post(`/todos`, body)
      .then(res => {
        console.log(res.status);
  
        renderToDoList(user_id.value);
      })
      .catch(err => {
        console.error(err);
      })
  }
  
  export default renderCreateToDoForm