require("dotenv").config();
const express = require("express");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);

const db = require("./models/db");
const contactsController = require("./controllers/contacts");
const todosController = require("./controllers/todos");
const jobsController = require("./controllers/jobs");
const usersController = require("./controllers/users");
const fileController = require("./controllers/fileUpload");
const errorHandling = require("./middleware/errorHandle");
const httpLoggerMiddleware = require("./middleware/httpLogger");

// const sessionController = require('./controllers/session')
// const errorHandler = require('./middleware/error-handler')
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.static("client"));
app.use(express.json());

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: new pgSession({
      pool: db,
      createTableIfMissing: true,
    }),
  })
);

app.use(httpLoggerMiddleware);
app.use("/contacts", contactsController);
app.use("/users", usersController);
app.use("/todos", todosController);
app.use("/jobs", jobsController);
app.use("/files", fileController);
app.use(errorHandling);

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
