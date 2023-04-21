document.getElementById("login-form").addEventListener("submit", handleLogin)
const loginMsg = document.getElementById("login-error")

const login = (event) => {
  const formData = new FormData(event.target)

  const loginBody = {
    loginEmail: formData.get("login-email"),
    loginPassword: formData.get("login-password")
  }

  return axios.post('/users/login', loginBody)
    .then(res => {
      console.log(res)
      loginMsg.textContent = "Login successful!"
      // return window.location.replace("/")
    })
    .catch(err => {
      loginMsg.textContent = err.response.data.message 
    })
}

const logout = () => {

}

export { login, logout }