import renderToDoList from'./renderToDoList.js'

const editToDoForm = (id) => {
    return axios.get(`/todos/${id}`)
    .then(res => {
    const page = document.getElementById('page');
    const task = res.data
    const dueDateObj = new Date(task.due_date);
    const formattedDueDate = dueDateObj.toISOString().substring(0, 10);

    page.innerHTML = `
    <form id="update-todo-form">
      <h2>Update your Task</h2>
      <p> 
        <label for="title">Title</label>  
        <input type="text" name="title" value="${task.title}"></input>
      </p>
      <p> 
        <label for="description">Description</label>  
        <input type="text" name="description" value="${task.description}"></input>
      </p>
      <p> 
        <label for="due_date">Due Date</label>  
        <input type="date" name="due_date" value="${formattedDueDate}"></input>
      </p>
      <p> 
          <label for="priority">Priority</label>  
          <select name="priority">
            <option value="low" ${task.priority === 'low' ? 'selected' : ''}>Low</option>
            <option value="moderate" ${task.priority === 'moderate' ? 'selected' : ''}>Moderate</option>
            <option value="high" ${task.priority === 'high' ? 'selected' : ''}>High</option>
          </select>
        </p>
        <p> 
          <label for="status">Status</label>  
          <select name="status">
            <option value="planned" ${task.status === 'planned' ? 'selected' : ''}>Planned</option>
            <option value="in progress" ${task.status === 'in progress' ? 'selected' : ''}>In Progress</option>
            <option value="completed" ${task.status === 'completed' ? 'selected' : ''}>Completed</option>
          </select>
        </p>
      <button type="submit">Update Task</button>
    </form>
  `;

    document.getElementById("update-todo-form").addEventListener('submit', (event) => handleEditToDo(event, task.id))
    })
}

function handleEditToDo(event, id) {
    console.log(id)
    event.preventDefault();
    console.log(event)
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
    return axios.put(`/todos/${id}`, body)
      .then(res => {
        console.log(res.status);
  
        renderToDoList();
      })
      .catch(err => {
        console.error(err);
      })
  
  }

  export default editToDoForm