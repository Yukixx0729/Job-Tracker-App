function editJob(jobData) {
    const id = jobData.data.id
    const p = document.getElementById("page")
    const dueDateObj = new Date(jobData.data.due_date)
    const formattedDueDate = dueDateObj.toISOString().substring(0, 10)
    const editForm = `
    <form id="edit-job-form" data-id="${id}">
      <h3>Update your jobs!</h3>
        <p> 
        <label for="title">Title</label>  
        <input type="text" name="title" value = "${jobData.data.title}"></input>
        </p>
        <p> 
        <label for="company">Company</label>  
        <input type="text" name="company" value = "${jobData.data.company}"></input>
        </p>
         <p> 
        <label for="location">Location</label>  
        <input type="text" name="location" value = "${jobData.data.location}"></input>
        </p>
        <p> 
        <label for="description">Description</label>  
        <textarea id="description" name="description" rows="5">${jobData.data.description}</textarea>
        </p>
        <p> 
        <label for="job_url">Job url</label>  
        <input type="url" name="job_url" value = "${jobData.data.job_url}"></input>
        </p>
        <p> 
        <label for="due_date">Due date</label>  
        <input type="date" name="due_date" value = "${formattedDueDate}"></input>
        </p>
        <p> 
        <label for="stages">Stage</label>  
        <select name="stages">
        <option value="Application" ${jobData.data.stages === 'Application' ? 'selected' : ''}>Application</option>
        <option value="Phone Interview" ${jobData.data.stages === 'Phone Interview' ? 'selected' : ''}>Phone interview</option>
        <option value="Interview" ${jobData.data.stages === 'Interview' ? 'selected' : ''}>Interview</option>
        <option value="Complete" ${jobData.data.stages === 'Complete' ? 'selected' : ''}>Complete</option>
        </select>
        </p>
     
      <button type="submit">Update</button>
    </form>
      `;

 
    const container = document.createElement("div")
    container.innerHTML = editForm

    p.appendChild(container);

    container.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
  
    const jobData = {
        id:id,
        title: formData.get("title"),
        company: formData.get("company"),
        location: formData.get("location"),
        description: formData.get("description"),
        job_url: formData.get("job_url"),
        due_date: formData.get("due_date"),
        stages: formData.get("stages")
    };
  
    axios.put(`/jobs/${id}`, jobData).then((res) => {
      displayJobList()

  })
})
}