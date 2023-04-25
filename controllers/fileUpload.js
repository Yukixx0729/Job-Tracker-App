const express = require("express");
require("dotenv").config();
const { uploadFile, getAllFileById, deleteFile } = require("../models/file");
const router = express.Router();

const multer = require("multer");
const { s3Upload } = require("../middleware/s3");

//memory sotrage the file
const storage = multer.memoryStorage({
  destination: (req, file, cb) => {
    cb(null, "storage");
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    console.log(originalname);
    cb(null, `${originalname}`);
  },
});

//filter out the type of document
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only accepts PDF files."), false);
  }
};
const upload = multer({ storage, fileFilter });

router.post("/upload", upload.single("pdf"), async (req, res, next) => {
  const result = await s3Upload(req.file);
  const { Location: url } = result;
  const { name, user_id } = req.body;
  // console.log(name, user_id);
  return uploadFile(name, url, user_id)
    .then(() => res.json({ success: true, url }))
    .catch((err) => {
      next(err);
    });
});

//get all the file by id
router.get("/upload/:id", (req, res, next) => {
  const id = req.params.id;
  return getAllFileById(id)
    .then((dbRes) => res.json({ success: true, user: dbRes.rows }))
    .catch((err) => {
      next(err);
    });
});

//delet the file by id
router.delete("/delete/:id", (req, res, next) => {
  const id = req.params.id;
  return deleteFile(id)
    .then((dbRes) => {
      if (!dbRes.rowCount) throw Error("No ID found");
      return res.json({ success: true });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
