const express = require("express");
require("dotenv").config();
const { uploadFile, getAllFileById, deleteFile } = require("../models/file");
const router = express.Router();
//npm install aws-sdk multer

const multer = require("multer");
const { s3Upload } = require("../middleware/s3");

//memory sotrage the file
const storage = multer.memoryStorage({
  destination: (req, file, cb) => {
    cb(null, "storage");
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    cb(null, `${originalname}`);
  },
});

//filter out the type of document
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
  }
};
const upload = multer({ storage, fileFilter });

router.post("/upload", upload.single("pdf"), async (req, res) => {
  console.log(req.file);
  const result = await s3Upload(req.file);
  res.json({ status: "success", result });
  const url = result.Location;
  const { name, user_id } = req.body;
  return uploadFile(name, url, user_id)
    .then((dbRes) => res.json({ success: true, user: dbRes.rows[0] }))
    .catch((err) => {
      err.status = 400;
    });
});

//get all the file by id
router.get("/upload/:id", (req, res) => {
  const id = req.params.id;
  return getAllFileById(id)
    .then((dbRes) => res.json({ success: true, user: dbRes.rows }))
    .catch((err) => {
      err.status = 400;
    });
});

//delet the file by id
router.delete("/upload/:id", (req, res) => {
  const id = req.params.id;
  return deleteFile(id)
    .then((dbRes) => res.json({ success: true }))
    .catch((err) => {
      err.status = 400;
    });
});

//handle the error
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({ message: "File type is wrong." });
    }
  }
});

module.exports = router;
