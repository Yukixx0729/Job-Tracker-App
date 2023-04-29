import { renderHeader, renderQuote } from "./components/header.js";

axios.get("/users/login")
  .then((res) => {
    const { user } = res.data
    console.log(user.id)
    if (user) {
      renderHeader(user)
      renderQuote(user.id)
    } else {
      window.location.href = "/login.html"
    }
  })
  .catch((err) => {
    console.log(err)
    if (err.response.status === 401) {
      window.location.href = "/login.html"
    }
  })
