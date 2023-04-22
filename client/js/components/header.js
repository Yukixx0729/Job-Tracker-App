const renderHeader = () => {
  const header = document.getElementById("header-nav")
  header.innerHTML = `
    <h1> Job Tracker </h1>
    <div class="nav-bar">
      <p class="nav-item" id="contacts"> Contacts </p>
      <a href = "/signup.html" class="nav-item"> Sign Up </a>
      <a href = "/login.html" class="nav-item"> Login </a>
    </div>
  `
}