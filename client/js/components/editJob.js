import { createButtonContainer } from './renderContactsList.js'
import displayJobList from'./renderJobs.js'

function editJob(jobData) {
  console.log(jobData)
    const id = jobData.data.id
    const p = document.getElementById("page")
    p.classList = "container"
    const buttonContainer = document.createElement("div")

    buttonContainer.classList = "row justify-content-center"
    buttonContainer.id = "buttonContainer"
    p.appendChild(buttonContainer)

    const returnToJobListBtn = document.createElement("button")
    returnToJobListBtn.id = "returnToJobListBtn"
    returnToJobListBtn.textContent = "Cancel"
    returnToJobListBtn.classList = "mb-1 mt-3 btn btn-secondary col-lg-2 col-md-3 col-sm-4 col-11"
    buttonContainer.appendChild(returnToJobListBtn)
    returnToJobListBtn.addEventListener("click", () => {
    displayJobList(id)})

    const dueDateObj = new Date(jobData.data.due_date)
    const formattedDueDate = dueDateObj.toISOString().substring(0, 10)
    const editForm = `
    <form id="edit-job-form" data-id="${id}">
    <p id ="error-container"></p>
    <input type="text" id="user_id" value =${jobData.data.user_id} hidden/>
      <div class="form-group"> 
        <label for="title">Title</label>  
        <input type="text" name="title" value = "${jobData.data.title}"></input>
        </div>
        <div class="form-group"> 
        <label for="company">Company</label>  
        <input type="text" name="company" value = "${jobData.data.company}"></input>
        </div>
        <div class="form-group"> 
        <label for="location">Location</label>  
        <input type="text" name="location" value = "${jobData.data.location}"></input>
        </div>
        <div class="form-group"> 
        <label for="description">Description</label>  
        <textarea id="description" name="description" rows="5">${jobData.data.description}</textarea>
        </div>
        <div class="form-group">  
        <label for="job_url">Job url</label>  
        <input type="url" name="job_url" value = "${jobData.data.job_url}"></input>
        </div>
        <div class="form-group">  
        <label for="due_date">Due date</label>  
        <input type="date" name="due_date" value = "${formattedDueDate}"></input>
        </div>
        <div class="form-group"> 
        <label for="stages">Stage</label>  
        <select name="stages" class="form-control">
        <option value="Saved" ${jobData.data.stages === 'Saved' ? 'selected' : ''}>Saved</option>
        <option value="Applied" ${jobData.data.stages === 'Applied' ? 'selected' : ''}>Applied</option>
        <option value="First Interview" ${jobData.data.stages === 'First Interview' ? 'selected' : ''}>First interview</option>
        <option value="Follow Up Interview" ${jobData.data.stages === 'Follow Up Interview' ? 'selected' : ''}>Follow Up Interview</option>
        <option value="Practical Test" ${jobData.data.stages === 'Practical Test' ? 'selected' : ''}> Practical Test</option>
        <option value="Complete" ${jobData.data.stages === 'Complete' ? 'selected' : ''}>Complete</option>
        </select>
      <button type="submit">Update</button>
      </div>
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
  
    axios
      .put(`/jobs/${id}`, jobData)
      .then((res) => {
        displayJobList(user_id.value)
      })
      .catch((err) => {
        const errMsg = document.getElementById('error-container')
        errMsg.textContent = 'The form is not filled out correctly.. Try again! ' 
    
      })
})
}

export default editJob