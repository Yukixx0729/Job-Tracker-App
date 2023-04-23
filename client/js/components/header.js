const renderHeader = () => {
  const header = document.getElementById("header-nav");
  header.innerHTML = `
    <h1> Job Tracker </h1>  
    <nav class="nav-bar">
    <ul>
      <li class="nav-item" id="homepage"> Homepage </li>
      <li class="nav-item" id="jobs"> Jobs </li>
      <li class="nav-item" id="todo"> To Do </li>
      <li class="nav-item" id="contacts"> Contacts </li>
      <li class="nav-item" id="files"> Files </li>
      <li class="nav-item" id="add-jobs"> Add jobs </li>
      <li><a href = "/signup.html" class="nav-item"> Sign Up </a></li>
      <li><a href = "/login.html" class="nav-item"> Login </a></li>
      </ul>
    </nav>
  `;
  document.getElementById("homepage").addEventListener("click", (event) => {
    renderQuote();
  });
};

const renderQuote = () => {
  page.innerHTML = "";
  axios.get("https://api.goprogram.ai/inspiration").then((res) => {
    page.innerHTML = res.data.quote;
    console.log(res);
  });
};
