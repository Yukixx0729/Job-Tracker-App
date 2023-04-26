const db = require("./db.js");

const uploadFile = (name, url, user_id) => {
  return db
    .query("INSERT INTO file (name, url, user_id) VALUES ($1, $2, $3)", [
      name,
      url,
      user_id,
    ])
    .then((result) => result);
};

const getAllFileById = (user_id) => {
  return db
    .query("SELECT * FROM file WHERE user_id=$1", [user_id])
    .then((result) => result);
};

const deleteFile = (id, userId) => {
  return db
    .query("DELETE FROM file WHERE id = $1 and user_id = $2", [id, userId])
    .then((result) => result);
};
module.exports = {
  uploadFile,
  getAllFileById,
  deleteFile,
};
