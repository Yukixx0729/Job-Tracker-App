function addJobForm() {
    const header = document.getElementById("page");
    const form = `
        <form id="add-job-form">
          <h3>Add your jobs!</h3>
            <p> 
            <label for="title">Title</label>  
            <input type="text" name="title"></input>
            </p>
            <p> 
            <label for="company">Company</label>  
            <input type="text" name="company"></input>
            </p>
             <p> 
            <label for="location">Location</label>  
            <input type="text" name="location"></input>
            </p>
            <p> 
            <label for="description">Description</label>  
            <textarea id="description" name="description" rows="5"></textarea>
            </p>
            <p> 
            <label for="job_url">Job url</label>  
            <input type="url" name="job_url"></input>
            </p>
            <p> 
            <label for="due_date">Due date</label>  
            <input type="date" name="due_date"></input>
            </p>
            <p> 
            <label for="stages">Stage</label>  
            <select name="stages">
            <option value="application">Application</option>
            <option value="phone-interview">Phone interview</option>
            <option value="interview">Interview</option>
            <option value="complete">Complete</option>
            </select>
            </p>

         
          <button type="submit">Add job</button>
        </form>
      `;

      if (!header.contains(document.getElementById("add-job-form"))) {
        header.innerHTML += form;
        document
          .getElementById("add-job-form")
          .addEventListener("submit", handleFormSubmit)
      } 
      else {
        
        header.removeChild(document.getElementById("add-job-form"))
      }
  }
  
function handleFormSubmit(event) {
    event.preventDefault()
  
    const formData = new FormData(event.target)
  
    const body = {
        title: formData.get("title"),
        company: formData.get("company"),
        location: formData.get("location"),
        description: formData.get("description"),
        job_url: formData.get("job_url"),
        due_date: formData.get("due_date"),
        stages: formData.get("stages")
    }
  
    return axios.post("/jobs", body)
    .then((res) => {
        console.log(res)
        displayJobList()
        addJobForm()
    })
  }
  
const addJobsBtn = document.getElementById('add-jobs')

addJobsBtn.addEventListener('click', addJobForm)