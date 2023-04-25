const db = require("./db.js");

const getAllToDos = () => {
  return db.query("SELECT * FROM to_do;").then((result) => result.rows);
};

const getAllToDosByUserId = (userId) => {
  return db
    .query("SELECT * FROM to_do WHERE user_id =$1;", [userId])
    .then((result) => result);
};

const getToDoById = (id) => {
  return db
    .query(`SELECT * FROM to_do WHERE id=${id};`)
    .then((result) => result.rows[0]);
};

const deleteToDoById = (id) => {
  return db.query("DELETE from to_do WHERE id=$1", [id]);
};

const createToDo = (
  title,
  description,
  due_date,
  priority,
  status,
  user_id
) => {
  const sql = `INSERT INTO to_do (title, description, due_date, priority, status,user_id) VALUES($1, $2, $3, $4, $5,$6) RETURNING id;`;
  return db.query(sql, [
    title,
    description,
    due_date,
    priority,
    status,
    user_id,
  ]);
};

const updateToDo = (title, description, due_date, priority, status, id) => {
  const sql = `UPDATE to_do
                 SET title = $2, description = $3, due_date = $4, priority = $5, status = $6
                 WHERE id = $1
                 RETURNING *;`;
  return db
    .query(sql, [title, description, due_date, priority, status, id])
    .then((result) => result.rows[0]);
};

module.exports = {
  getAllToDos,
  getToDoById,
  deleteToDoById,
  createToDo,
  updateToDo,
  getAllToDosByUserId,
};
