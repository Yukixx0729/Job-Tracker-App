import displayJobList from'./renderJobs.js'

function editJob(jobData) {
    const id = jobData.data.rows[0].id
    console.log(jobData)
    const p = document.getElementById("page")
    const dueDateObj = new Date(jobData.data.rows[0].due_date)
    const formattedDueDate = dueDateObj.toISOString().substring(0, 10)
    const editForm = `
    <form id="edit-job-form" data-id="${id}">
    <input type="text" id="user_id" value =${jobData.data.rows[0].user_id} hidden/>
      <h3>Update your jobs!</h3>
        <p> 
        <label for="title">Title</label>  
        <input type="text" name="title" value = "${jobData.data.rows[0].title}"></input>
        </p>
        <p> 
        <label for="company">Company</label>  
        <input type="text" name="company" value = "${jobData.data.rows[0].company}"></input>
        </p>
         <p> 
        <label for="location">Location</label>  
        <input type="text" name="location" value = "${jobData.data.rows[0].location}"></input>
        </p>
        <p> 
        <label for="description">Description</label>  
        <textarea id="description" name="description" rows="5">${jobData.data.rows[0].description}</textarea>
        </p>
        <p> 
        <label for="job_url">Job url</label>  
        <input type="url" name="job_url" value = "${jobData.data.rows[0].job_url}"></input>
        </p>
        <p> 
        <label for="due_date">Due date</label>  
        <input type="date" name="due_date" value = "${formattedDueDate}"></input>
        </p>
        <p> 
        <label for="stages">Stage</label>  
        <select name="stages">
        <option value="Application" ${jobData.data.rows[0].stages === 'Application' ? 'selected' : ''}>Application</option>
        <option value="Phone Interview" ${jobData.data.rows[0].stages === 'Phone Interview' ? 'selected' : ''}>Phone interview</option>
        <option value="Interview" ${jobData.data.rows[0].stages === 'Interview' ? 'selected' : ''}>Interview</option>
        <option value="Complete" ${jobData.data.rows[0].stages === 'Complete' ? 'selected' : ''}>Complete</option>
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
     
    const user_id = document.getElementById("user_id")
    const formData = new FormData(event.target);
  
    const jobData = {
        id:id,
        title: formData.get("title"),
        company: formData.get("company"),
        location: formData.get("location"),
        description: formData.get("description"),
        job_url: formData.get("job_url"),
        due_date: formData.get("due_date"),
        stages: formData.get("stages"),
        user_id: user_id.value
    };
  
    axios.put(`/jobs/${id}`, jobData).then((res) => {
      displayJobList(user_id.value)
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send("Error editing job");
  });
})
}

export default editJob