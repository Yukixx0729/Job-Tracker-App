import renderHeader from "./components/header.js"

fetch('/api/session')
  .then((res) => res.json())
  .then((data) => {
    if ('user' in data ) {
      console.log(data)
      renderHeader(data.user)
    } else {
      window.location ='/login.html'
    }
  })
