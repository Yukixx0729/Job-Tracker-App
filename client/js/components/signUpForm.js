const signUp = (event) => {
  event.preventDefault()
  console.log(event)

  const formData = new FormData(event.target)
  console.log(formData)

  const body = {
    userName: formData.get("userName"),
    email: formData.get("email"),
    password: formData.get("password"),
    passwordCheck: formData.get("passwordCheck")
  }

  console.log(body)

  return axios.post('/users/signup', body)
  .then(res => {
    console.log(res)
    signUpMsg.textContent = "Sign up successful!"
    signUpMsg.insertAdjacentElement('afterend', loginButton)
  })
  .catch(err => {
    console.log(err)
    signUpMsg.textContent = err.response.data.message 
  })
}

document.getElementById("signup-form").addEventListener("submit", signUp)
const signUpMsg = document.getElementById("message")
const loginButton = document.createElement('button')
loginButton.className = "loginButton"
loginButton.textContent = "Login"
