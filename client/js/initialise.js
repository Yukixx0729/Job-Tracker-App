import { renderHeader, renderQuote } from "./components/header.js";

renderQuote();

axios
  .get("/users/login")
  .then((res) => {
    const { user } = res.data;
    if (user) {
      renderHeader(user);
    } else {
      window.location.href = "/login.html";
    }
  })
  .catch((err) => {
    console.log(err);
    if (err.response.status === 401) {
      window.location.href = "/login.html";
    }
  });
