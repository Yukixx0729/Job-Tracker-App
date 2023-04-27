import displayJobList from'./renderJobs.js'

function addJobForm(id) {
  const header = document.getElementById("page")
  const form = `
    <form id="add-job-form">
    <input type="text" id="user_id" value =${id} hidden/>
        <div class="form-group"> 
        <label for="title">Title</label>  
        <input type="text" name="title"></input>
        </div>
        <div class="form-group"> 
        <label for="company">Company</label>  
        <input type="text" name="company"></input>
        </div>
        <div class="form-group"> 
          <label for="location">Location</label>  
          <input type="text" name="location"></input>
        </div>
        <div class="form-group"> 
          <label for="description">Description</label>  
          <textarea id="description" name="description" rows="6"></textarea>
        </div>
        <div class="form-group"> 
          <label for="job_url">Job url</label>  
          <input type="url" name="job_url"></input>
        </div>
        <div class="form-group"> 
          <label for="due_date">Due date</label>  
          <input type="date" name="due_date"></input>
        </div>
        <div class="form-group"> 
          <label for="stages">Stage</label>  
          <select name="stages" class="form-control">
            <option value="Application">Application</option>
            <option value="Phone Interview">Phone interview</option>
            <option value="Interview">Interview</option>
            <option value="Complete">Complete</option>
          </select>
        </div>
        <div class="form-group">
        <button type="submit">Add</button>
        </div>
    </form>
      `

  if (!header.contains(document.getElementById("add-job-form"))) {
    header.innerHTML += form;
    document
      .getElementById("add-job-form")
      .addEventListener("submit", handleFormSubmitJob)
  } else {
    header.removeChild(document.getElementById("add-job-form"))
  }
}
  
function handleFormSubmitJob(event) {
  event.preventDefault()

  const user_id = document.getElementById("user_id")
  const formData = new FormData(event.target)
  
  const body = {
    title: formData.get("title"),
    company: formData.get("company"),
    location: formData.get("location"),
    description: formData.get("description"),
    job_url: formData.get("job_url"),
    due_date: formData.get("due_date"),
    stages: formData.get("stages"),
    user_id: user_id.value
  }
  return axios.post("/jobs", body)
  .then((res) => {
    console.log(res)
    displayJobList(user_id.value)
  })
}

export default addJobForm
  
