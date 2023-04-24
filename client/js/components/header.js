const renderHeader = (user) => {
  const header = document.getElementById("header-nav");
  header.innerHTML = `
    <h1> Job Tracker </h1>  
    <p>Logged in as ${user.user_name} <button class= 'logout-btn'>Logout</button></p>
    <nav class="nav-bar">
    <ul>
      <li class="nav-item" id="homepage"> Homepage </li>
      <li class="nav-item" id="jobs"> Jobs </li>
      <li class="nav-item" id="todo"> To Do </li>
      <li class="nav-item" id="contacts"> Contacts </li>
      <li class="nav-item" id="files"> Files </li>
      <li><a href = "/signup.html" class="nav-item"> Sign Up </a></li>
      <li><a href = "/login.html" class="nav-item"> Login </a></li>
      </ul>
    </nav>
  `;

  header.addEventListener('click', (event) =>{
    const target = event.target
    if(target.className === 'logout-btn'){
      fetch('/users/login', {
        method: 'DELETE'
      }).then(()=>{
        window.location = '/login.html'
      })
    }
  })
    
  document.getElementById("homepage").addEventListener("click", (event) => {
    renderQuote();
  });
};

const renderQuote = () => {
  page.innerHTML = "";
  const quote = document.createElement("div");
  quote.id = "quoteBox";
  return axios.get("https://api.goprogram.ai/inspiration").then((res) => {
    quote.innerHTML = `${res.data.quote}  ----  ${res.data.author}`;
    page.appendChild(quote);
    renderDueJobAndTodo();
  });
};

async function renderDueJobAndTodo() {
  const container = document.createElement("div");
  container.id = "dueDataBox";
  const quote = document.getElementById("quoteBox");
  quote.appendChild(container);
  let dueData = [];
  const dueDataJob = await axios
    .get(`/jobs/1`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error(err);
    });
  const dueDataTodo = await axios
    .get(`/todos/1`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error(err);
    });
  console.log(dueDataJob, dueDataTodo);
  if (!dueDataJob && !dueDataTodo) {
    const reminder = document.createElement("div");
    reminder.innerHTML = "Nothing to worry about yet.";
    container.appendChild(reminder);
  } else {
    if (dueDataJob.length === 1 && dueDataTodo.length > 1) {
      dueData.push(dueDataJob);
      dueData = dueData.concat(dueDataTodo);
    } else if (dueDataJob.length > 1 && dueDataTodo.length === 1) {
      dueData.push(dueDataTodo);
      dueData = dueData.concat(dueDataJob);
    } else {
      dueData = dueData.concat(dueDataTodo);
      dueData = dueData.concat(dueDataJob);
    }
    console.log(dueData);
    const sortedData = dueData.sort(
      (a, b) => new Date(a["due_date"]) - new Date(b["due_date"])
    );
    console.log(sortedData);
    for (let due of sortedData) {
      const dueItem = document.createElement("div");
      dueItem.className = "dueItem";
      if (Object.keys(due)[2] === "description") {
        dueItem.innerHTML = `<p>${due.title}</p> <p> Priority : ${
          due.priority
        }</p><p>${due.due_date.substring(0, 10)}</p> `;
      }
      if (Object.keys(due)[2] === "company") {
        dueItem.innerHTML = `<p>${due.company}</p> <p> ${
          due.title
        }</p> <p>${due.due_date.substring(0, 10)}</p>`;
      }
      container.appendChild(dueItem);
    }
  }
}
