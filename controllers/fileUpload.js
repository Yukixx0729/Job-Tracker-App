const express = require("express")
require("dotenv").config()
const { uploadFile, getAllFileById, deleteFile } = require("../models/file")
const router = express.Router()

const multer = require("multer")
const { s3Upload, fileFilter, storage } = require("../middleware/s3")
const upload = multer({ storage, fileFilter })

router.post("/upload", upload.single("pdf"), async (req, res, next) => {
  const result = await s3Upload(req.file)
  req.file.buffer = null
  const { Location: url } = result
  const id = req.session.user.id
  const { name } = req.body
  return uploadFile(name, url, id)
    .then(() => res.json({ success: true, url }))
    .catch((err) => {
      next(err)
    })
})

router.get("/upload", (req, res, next) => {
  const id = req.session.user.id
  return getAllFileById(id)
    .then((dbRes) => res.json({ success: true, user: dbRes.rows }))
    .catch((err) => {
      next(err)
    })
})

router.delete("/delete/:id", (req, res, next) => {
  const id = Number(req.params.id)
  const userId = req.session.user.id
  return deleteFile(id, userId)
    .then((dbRes) => {
      if (!dbRes.rowCount) throw Error("Not found")
      return res.json({ success: true })
    })
    .catch((err) => {
      next(err)
    })
})

module.exports = router
