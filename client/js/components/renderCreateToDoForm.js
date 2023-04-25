const renderCreateToDoForm = () => {
    const header = document.getElementById('page')
    header.innerHTML = `
      <form id="create-todo-form">
        <h2>Create new task </h2>
        <p> 
          <label for="title">Title</label>  
          <input type="text" name="title"></input>
        </p>
        <p> 
          <label for="description">Description</label>  
          <textarea id="description" name="description" rows="5"></textarea>
        </p>
        <p> 
          <label for="due_date">Due Date</label>  
          <input type="date" name="due_date"></input>
        </p>
        <p> 
        <label for="priority">Priority</label>  
        <select name="priority">
            <option value="low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
        </select>
        </p>
        <p> 
        <label for="status">Status</label>  
        <select name="status">
            <option value="planned">Planned</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
        </select>
        </p>
        <button type="submit"> Create Task</button>
      </form>
    `;
  
    document.getElementById("create-todo-form").addEventListener("submit", handleFormSubmit)
  
  };
  
  function handleFormSubmit(event) {
    event.preventDefault();
  
    const formData = new FormData(event.target);
  
    console.log(formData);
  
    const body = {
      title: formData.get('title'),
      description: formData.get('description'),
      due_date: formData.get('due_date'),
      priority: formData.get('priority'),
      status: formData.get('status'),
    };
    console.log(body)
    return axios.post('/todos', body)
      .then(res => {
        console.log(res.status);
  
        renderToDoList();
      })
      .catch(err => {
        console.error(err);
      })
  
  }
  
