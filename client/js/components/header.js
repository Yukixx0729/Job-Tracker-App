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
  axios.get("https://api.goprogram.ai/inspiration").then((res) => {
    page.innerHTML = `${res.data.quote}  ----  ${res.data.author}`;
  });
};
