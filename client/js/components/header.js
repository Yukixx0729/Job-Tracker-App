import renderFiles from "./renderFile.js";
import displayJobList from "./renderJobs.js";
import { renderContacts } from "./renderContactsList.js";
import renderToDoList from "./renderToDoList.js";

export const renderHeader = (user) => {
  const header = document.getElementById("header-nav");
  header.id = "header-nav-row";
  header.innerHTML = `
    <div class="row-container container">
      <div class="row nav-row align-items-center">
        <h1 class="nav-item col-5 h-30" id="homepage"> Job Tracker </h1>
        <h3 class="nav-item col h-30 justify-content-around text-center" role="button" data-render="jobs" > Jobs </h3>
        <h3 class="nav-item col h-30 justify-content-around text-center" role="button" data-render="todo" > Tasks </h3>
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
        renderFiles();
        break;
      case "jobs":
        displayJobList(`${user.id}`);
        break;
      case "todo":
        renderToDoList(`${user.id}`);
        break;
      case "contacts":
        renderContacts();
        break;
    }
  });

  document.getElementById("homepage").addEventListener("click", (event) => {
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
    .get(`/jobs`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error(err);
    });
  const dueDataTodo = await axios
    .get(`/todos`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error(err);
    });
  // console.log("funny", dueDataTodo);
  const reminderTitle = document.createElement("div");
  reminderTitle.innerHTML = `<h3>Due in 7 days:</h3>`;
  container.appendChild(reminderTitle);
  if (!dueDataJob.rowCount && !dueDataTodo.length) {
    const reminder = document.createElement("div");
    reminder.innerHTML = "Nothing to worry about yet.";
    reminderTitle.appendChild(reminder);
  } else {
    for (let item of dueDataJob.rows) {
      dueData.push(item);
    }
    for (let item of dueDataTodo) {
      if (item.status !== "completed") {
        dueData.push(item);
      }
    }
    const sortedData = dueData.sort(
      (a, b) => new Date(a["due_date"]) - new Date(b["due_date"])
    );
    // console.log("result", sortedData);
    const currentDate = new Date();
    const dueDate7Days = new Date();
    dueDate7Days.setDate(currentDate.getDate() + 7);
    // console.log(dueDate7Days);
    const filteredData = sortedData.filter((item) => {
      const dueDate = new Date(item["due_date"]);
      return dueDate <= dueDate7Days && dueDate >= currentDate;
    });
    // console.log("result", filteredData);
    for (let due of filteredData) {
      const dueItem = document.createElement("div");
      dueItem.className = "dueItem";
      if (Object.keys(due)[2] === "description") {
        dueItem.innerHTML = `<p>Task: ${due.title}</p> <p> Priority : ${
          due.priority
        }</p><p>Due date: ${due.due_date.substring(0, 10)}</p> <p>Status: ${
          due.status
        }</p>`;
        dueItem.style.backgroundColor = "#c3acb1";
      }
      if (Object.keys(due)[2] === "company") {
        if (!due.stages) {
          dueItem.innerHTML = `<p>Job company: ${
            due.company
          }</p> <p>Job title:  ${
            due.title
          }</p> <p>Due date: ${due.due_date.substring(0, 10)}</p>`;
        } else {
          dueItem.innerHTML = `<p>Job company: ${
            due.company
          }</p> <p>Job title: ${
            due.title
          }</p> <p>Due date: ${due.due_date.substring(0, 10)}</p><p>Stage: ${
            due.stages
          }</p>`;
        }
        dueItem.style.backgroundColor = "#7f9990";
      }
      container.appendChild(dueItem);
    }
  }
}
