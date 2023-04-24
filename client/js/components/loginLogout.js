const login = (event) => {
  event.preventDefault()
  const formData = new FormData(event.target)

  const loginBody = {
    loginEmail: formData.get("login-email"),
    loginPassword: formData.get("login-password")
  }

  return axios.post('/users/login', loginBody)
    .then(res => {
      loginMsg.textContent = "Login successful!"
      return window.location.replace("/")
    })
    .catch(err => {
      console.log(err)
      loginMsg.textContent = err.response.data.message 
    })
}


document.getElementById("login-form").addEventListener("submit", login)
const loginMsg = document.getElementById("message")