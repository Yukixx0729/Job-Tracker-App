import renderCreateToDoForm from'./renderCreateToDoForm.js'
import editToDoForm from'./renderEditToDoForm.js'
import deleteToDo from'./deleteToDo.js'

const renderToDoList = (id) => {
  const page = document.getElementById("page");
  page.innerHTML = "";
  const addTaskBtn = document.createElement("button");
  addTaskBtn.textContent = "New Task";
  page.appendChild(addTaskBtn);
  addTaskBtn.classList.add("btn", "btn-secondary", "btn-sm");
  addTaskBtn.addEventListener("click", () => {renderCreateToDoForm(id)});

  const container = document.createElement("div");
  container.classList.add("container");
  page.appendChild(container);

  const row = document.createElement("div");
  row.classList.add("row");
  container.appendChild(row);

  const statuses = ["planned", "in progress", "completed"];

  statuses.forEach((status) => {
    const col = document.createElement("div");
    col.classList.add("col", "text-center", 'border', 'border-secondary', 'mb-2', 'mx-2');
    const title = document.createElement("h2");
    title.classList.add("text-center");
    title.innerText = status.charAt(0).toUpperCase() + status.slice(1);
    col.appendChild(title);
    row.appendChild(col);
    axios.get(`/todos`).then((res) => {
      const tasks = res.data;
      console.log(tasks)
      tasks.sort((a, b) => {
        if (a.priority === "high" && b.priority !== "high") {
          return -1;
        } else if (a.priority !== "high" && b.priority === "high") {
          return 1;
        } else {
          // If priority is equal, sort by due date
          return new Date(a.due_date) - new Date(b.due_date);
        }
      });
      tasks
        .filter((task) => task.status === status)
        .forEach((task) => {
          const card = document.createElement("div");
          card.classList.add("card", "mb-3", "mx-auto");
          if (task.status === "completed") {
            card.classList.add("task-card", "completed");
          } else {
            switch (task.priority) {
              case "low":
                card.classList.add("task-card", "low");
                break;
              case "moderate":
                card.classList.add("task-card", "moderate");
                break;
              case "high":
                card.classList.add("task-card", "high");
                break;
            }
          }
          const cardBody = document.createElement("div");
          cardBody.classList.add("card-body", "mx-auto");
          const cardTitle = document.createElement("h5");
          cardTitle.classList.add("card-title");
          cardTitle.innerText = task.title;
          const cardSubtitle = document.createElement("h6");
          cardSubtitle.classList.add("card-subtitle", "mb-2", "text-muted");
          const dueDateObj = new Date(task.due_date);
          const dueDateStr = `${dueDateObj
            .getDate()
            .toString()
            .padStart(2, "0")}/${(dueDateObj.getMonth() + 1)
            .toString()
            .padStart(2, "0")}/${dueDateObj.getFullYear()}`;
          cardSubtitle.innerText = `Due: ${dueDateStr}`;
          const cardText = document.createElement("p");
          cardText.classList.add("card-text");
          cardText.innerText = task.description;
          const deleteBtn = document.createElement("button");
          deleteBtn.textContent = "Delete";
          deleteBtn.classList.add("btn", "btn-light", "btn-sm", "hidden");
          deleteBtn.addEventListener("click", () => deleteToDo(task.id));
          const editBtn = document.createElement("button");
          editBtn.textContent = "Edit";
          editBtn.classList.add("btn", "btn-light", "btn-sm", "mx-2", "hidden");
          editBtn.addEventListener("click", () => editToDoForm(task.id));
          cardBody.appendChild(cardTitle);
          cardBody.appendChild(cardSubtitle);
          cardBody.appendChild(cardText);
          cardBody.appendChild(deleteBtn);
          cardBody.appendChild(editBtn);
          card.appendChild(cardBody);
          col.appendChild(card);
          if (task.job_id) {
            const jobId = document.createElement("p");
            jobId.classList.add("card-text");
            axios.get(`/jobs/${task.job_id}`).then((res) => {
              const jobTitle = res.data.title;
              jobId.innerText = `Job: ${jobTitle}`;
              cardBody.appendChild(jobId);
            });
          }

          card.addEventListener("mouseenter", () => {
            deleteBtn.classList.remove("hidden");
            editBtn.classList.remove("hidden");
          });

          card.addEventListener("mouseleave", () => {
            deleteBtn.classList.add("hidden");
            editBtn.classList.add("hidden");
          });
        });
    });
  });
};

// const toDosBtn = document.getElementById("todo");
// toDosBtn.addEventListener('click', renderToDoList)

export default renderToDoList;