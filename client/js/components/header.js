const renderHeader = () => {
  const header = document.getElementById("header-nav")
  header.innerHTML = `
    <h1> Job Tracker </h1>
    <div class="nav-bar">
      <p class="nav-item" id="jobs"> Jobs </p>
      <p class="nav-item" id="todo"> To Do </p>
      <p class="nav-item" id="contacts"> Contacts </p>
      <p class="nav-item" id="files"> Files </p>
      <p class="nav-item" id="add-jobs"> Add jobs </p>
      <a href = "/signup.html" class="nav-item"> Sign Up </a>
      <a href = "/login.html" class="nav-item"> Login </a>
    </div>
  `
}