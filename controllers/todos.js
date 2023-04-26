const express = require("express");
const db = require("../models/db");
const {
  getAllToDos,
  getToDoById,
  deleteToDoById,
  createToDo,
  updateToDo,
  getAllToDosByUserId,
} = require("../models/todo");
const router = express.Router();


router.get("/:id", (req, res, next) => {
  id = Number(req.params.id);
  return getToDoById(id).then((todo) => res.json(todo));
});

router.get("/", (req, res, next) => {
  const id = req.session.user.id
  return getAllToDosByUserId(id)
  .then((todo) => res.json(todo))
  .catch((err) => {
    console.error(err);
  });
});

router.delete("/:id", (req, res, next) => {
  const id = Number(req.params.id);
  const user = req.session.id;
  console.log(user);
  return deleteToDoById(id)
    .then((result) => {
      if (result.rowCount === 0) {
        const customError = new Error("Cannot find to do with id: " + id);
        customError.status = 404;
        next(customError);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/", (req, res, next) => {
    const { title, description, due_date, priority, status, user_id } = req.body;
    console.log("Received body", {
      title,
      description,
      due_date,
      priority,
      status,
      user_id,
    });
  
    if (!title) {
      const customError = new Error("Title cannot be empty");
      customError.status = 400;
      return next(customError);
    }
    createToDo(title, description, due_date, priority, status, user_id)
      .then((result) => {
        res.status(201);
        res.json({
          id: result.rows[0].id,
          title,
          description,
          due_date,
          priority,
          status,
          user_id,
        });
      })
      .catch((err) => {
        next(err);
      });
  });

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);

  const { title, description, due_date, priority, status } = req.body;
  console.log("Received body", {
    title,
    description,
    due_date,
    priority,
    status,
  });

  return updateToDo(id, title, description, due_date, priority, status).then(
    (updatedToDo) => res.json(updatedToDo)
  );
});

module.exports = router;
