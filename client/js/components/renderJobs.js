

const jobContainer = document.createElement('div')
jobContainer.id = 'jobListContainer'
let isDisplayed = false


const displayJobList = () =>{
    if (isDisplayed) {
        document.body.removeChild(jobContainer)
        jobContainer.innerHTML = ''
        isDisplayed = false
      } 
      else {
        axios.get("/jobs")
            .then((result) =>{
                const jobs = result.data
                console.log(jobs)
                jobs.forEach((job) =>{

                const title = job.title
                const company = job.company
                const location = job.location
                const description = job.description
                const jobUrl = job.job_url
                const dueDate = new Date(job.due_date)
                const stage = job.stages

                const container = document.createElement('div')
                const ul = document.createElement('ul')
               
                ul.innerHTML = `
                <li>Title: ${title}</li>
                <li>Company: ${company}</li>
                <li>Location: ${location}</li>
                <li>Description: ${description}</li>
                <li>Job URL: ${jobUrl}</li>
                <li>Due date: ${dueDate.toLocaleDateString()}</li>
                <li>Stage: ${stage}</li>
                `

                // const editButton = document.createElement("button");
                // editButton.textContent = "Edit";
                // editButton.addEventListener("click", () => {
                //   return axios.get(`/jobs/${id}`)
                //     .then((res) => {
                //      (info)
                //     })
                // })
                 
                    
                // const deleteButton = document.createElement("button");
                // deleteButton.textContent = "Delete";
                // deleteButton.addEventListener("click", () => {
                //     return axios.delete(`/jobs/${id}`)
                //     .then((res) => {
                //     container.remove();
                //     })

                // })

                container.appendChild(ul)
                // container.appendChild(editButton)
                // container.appendChild(deleteButton)
                jobContainer.appendChild(container)
            })
            document.body.appendChild(jobContainer)
            isDisplayed = true
            })
        }
    }





const jobsBtn = document.getElementById('jobs')

jobsBtn.addEventListener('click', displayJobList)
