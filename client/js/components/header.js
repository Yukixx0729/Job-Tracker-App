import renderFiles from "./renderFile.js";
import displayJobList from "./renderJobs.js";
import renderContacts from "./renderContactsList.js";
import renderToDoList from "./renderToDoList.js";

export const renderHeader = (user) => {
  const header = document.getElementById("header-nav");
  header.id = "header-nav-row";
  header.innerHTML = `
    <div class="row-container container">
      <div class="row nav-row align-items-center">
        <h1 class="nav-item col-5 h-30" id="homepage"> Job Tracker </h1>
        <h3 class="nav-item col h-30 justify-content-around text-center" role="button" data-render="jobs" > Jobs </h3>
        <h3 class="nav-item col h-30 justify-content-around text-center" role="button" data-render="todo" > To Do </h3>
        <h3 class="nav-item col h-30 justify-content-around text-center" role="button" data-render="contacts" > Contacts </h3>
        <h3 class="nav-item col h-30 justify-content-around text-center" role="button" data-render="files"> Files </h3>
        <h3 class="nav-item logout-btn col h-30 justify-content-around text-center" role="button"> Logout </h3>
      </div>
    </div>
  `;
  const subheading = document.createElement("div");
  subheading.id = "welcome-row";
  subheading.innerHTML = `
  <div class="container" id="welcome"> 
    <div class="row">
      <h6 class="col justify-content-end"> Welcome ${user.user_name} </h6>
    </div>
  </div>
  `;
  header.insertAdjacentElement("afterend", subheading);

  header.addEventListener("click", (event) => {
    const target = event.target;
    if (target.className.includes("logout-btn")) {
      fetch("/users/login", {
        method: "DELETE",
      }).then(() => {
        window.location = "/login.html";
      });
    }
    const render = event.target.dataset.render;
    switch (render) {
      case "files":
        renderFiles(`${user.id}`);
        break;
      case "jobs":
        displayJobList();
        break;
      case "todo":
        renderToDoList();
        break;
      case "contacts":
        renderContacts();
        break;
    }
  });

  document.getElementById("homepage").addEventListener("click", (event) => {
    console.log("home", user.id);
    renderQuote();
  });
};

const quoteContainer = document.createElement("div");
quoteContainer.id = "quote-row";

export const renderQuote = () => {
  page.innerHTML = "";
  quoteContainer.innerHTML = "";

  const quote = document.createElement("div");
  quote.id = "quoteBox";
  quote.classList = "row justify-content-center";
  quoteContainer.appendChild(quote);

  return axios.get("https://api.goprogram.ai/inspiration").then((res) => {
    quote.innerHTML = `<p id="quote" class="row justify-content-center" >${res.data.quote}</p> <p id="author" class="row justify-content-center">${res.data.author}</p>`;
    page.insertAdjacentElement("beforebegin", quoteContainer);
    console.log("inside ");
    renderDueJobAndTodo();
  });
};

async function renderDueJobAndTodo() {
  const container = document.createElement("div");
  container.id = "dueDataBox";
  container.classList = "container";
  const page = document.getElementById("page");
  page.appendChild(container);
  let dueData = [];
  const dueDataJob = await axios
    .get(`/jobs/4`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error(err);
    });
  const dueDataTodo = await axios
    .get(`/todos/4`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error(err);
    });
  // console.log(dueDataJob, dueDataTodo);
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
    // console.log(dueData);
    const sortedData = dueData.sort(
      (a, b) => new Date(a["due_date"]) - new Date(b["due_date"])
    );
    // console.log(sortedData);
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

// export default { renderHeader, renderQuote };
