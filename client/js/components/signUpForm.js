const signUp = (event) => {
  event.preventDefault()
  const formData = new FormData(event.target)

  const body = {
    userName: formData.get("userName"),
    email: formData.get("email"),
    password: formData.get("password"),
    passwordCheck: formData.get("passwordCheck")
  }
  return axios.post('/users/signup', body)
  .then(res => {
    console.log(res)
    signUpMsg.textContent = "Sign up successful!"
    return window.location.replace("/login.html")
  })
  .catch(err => {
    console.log(err)
    signUpMsg.textContent = err.response.data.message 
  })
}

document.getElementById("signup-form").addEventListener("submit", signUp)
const signUpMsg = document.getElementById("message")
const loginLink = document.getElementById("account")
