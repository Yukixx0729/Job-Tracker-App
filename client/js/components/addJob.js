import displayJobList from'./renderJobs.js'

function addJobForm(id) {

  const header = document.getElementById("page")
  header.classList = "container"
  const buttonContainer = document.createElement("div")

  buttonContainer.classList = "row justify-content-center"
  buttonContainer.id = "buttonContainer"
  header.appendChild(buttonContainer)

  const returnToJobListBtn = document.createElement("button")
  returnToJobListBtn.id = "returnToJobListBtn"
  returnToJobListBtn.textContent = "Cancel"
  returnToJobListBtn.classList = "mb-1 mt-3 btn btn-secondary col-lg-2 col-md-3 col-sm-4 col-11"
  buttonContainer.appendChild(returnToJobListBtn)
  console.log(returnToJobListBtn)
  returnToJobListBtn.addEventListener("click", () => {
    
  displayJobList(id)
})

  const form = `
    <form id="add-job-form">
    <input type="text" id="user_id" value =${id} hidden/>
    <h2 id = "create-title" > Add Job </h2>
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
            <option value="Saved">Saved</option>
            <option value="Applied">Applied</option>
            <option value="First Interview">First interview</option>
            <option value="Follow Up Interview" >Follow Up Interview</option>
            <option value="Practical Test" > Practical Test</option>
            <option value="Complete" >Complete</option>
          </select>
        </div>
        <div class="form-group">
        <button type="submit">Add</button>
        </div>
    </form>
      `
    const container = document.createElement("div")
    container.innerHTML = form

    header.appendChild(container);

  // if (!header.contains(document.getElementById("add-job-form"))) {
  //   header.innerHTML += form;
    document
      .getElementById("add-job-form")
      .addEventListener("submit", handleFormSubmitJob)
  // } else {
  //   header.removeChild(document.getElementById("add-job-form"))
  // }
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
   
    displayJobList(user_id.value)
  })
}

export default addJobForm
  
