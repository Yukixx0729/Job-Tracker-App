const toDosBtn = document.getElementById("todo")

const renderToDoList = (event) => {
    console.log(event)
    const page = document.getElementById('page');
    page.innerHTML = '';
    const addTaskBtn = document.createElement('button')
    addTaskBtn.textContent = 'New Task'
    page.appendChild(addTaskBtn)
    addTaskBtn.addEventListener('click', renderCreateToDoForm)
  
    return axios.get('/todos')
    .then(res => {
        const tasks = res.data
        tasks.forEach(task => {
           const container = document.createElement('div')
           container.classList.add('post-it');
           if (task.priority === 'low') {
             container.classList.add('post-it-low-priority');
           } else if (task.priority === 'moderate') {
             container.classList.add('post-it-moderate-priority');
           } else if (task.priority === 'high') {
             container.classList.add('post-it-high-priority');
           }
           const title = document.createElement('h2');
           title.innerText = task.title;
           const dueDate = document.createElement('p');
           const dueDateObj = new Date(task.due_date);
            const dueDateStr = `${dueDateObj.getDate().toString().padStart(2, '0')}/${(dueDateObj.getMonth() + 1).toString().padStart(2, '0')}/${dueDateObj.getFullYear()}`;
            dueDate.innerText = `Due: ${dueDateStr}`;
           const description = document.createElement('p');
           description.innerText = task.description;

           const btnDiv = document.createElement('div');
           const deleteBtn = document.createElement('button')
           deleteBtn.textContent = "Delete"
           deleteBtn.className = "deleteBtn"
           deleteBtn.style.display = "none"
           deleteBtn.addEventListener("click", () => deleteToDo(task.id))
           btnDiv.appendChild(deleteBtn)
         
           const editBtn = document.createElement('button')
           editBtn.textContent = "Edit"
           editBtn.className = "editBtn"
           editBtn.style.display = "none"
           editBtn.addEventListener("click", () => editToDoForm(task.id))
           btnDiv.appendChild(editBtn)
        

           container.appendChild(title);
           container.appendChild(dueDate);
           container.appendChild(description);
           container.appendChild(deleteBtn);
           container.appendChild(btnDiv);
           container.addEventListener("mouseover", () => deleteBtn.style.display = "block");
           container.addEventListener("mouseout", () => deleteBtn.style.display = "none");
           container.addEventListener("mouseover", () => editBtn.style.display = "block");
           container.addEventListener("mouseout", () => editBtn.style.display = "none");
           page.appendChild(container);
        })
        
    })
  }

toDosBtn.addEventListener('click', renderToDoList)
  
  