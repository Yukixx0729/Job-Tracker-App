const { S3 } = require("aws-sdk")
require("dotenv").config()
const multer = require("multer")
//memory sotrage the file
exports.storage = multer.memoryStorage({
  destination: (req, file, cb) => {
    cb(null, "storage")
  },
  filename: (req, file, cb) => {
    const { originalname } = file
    console.log(originalname)
    cb(null, `${originalname}`)
  },
})
//filter out the type of document
exports.fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true)
  } else {
    cb(new Error("Only accepts PDF files."), false)
  }
}
//upload to s3
exports.s3Upload = async (file) => {
  const s3 = new S3()
  const param = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `storage/${file.originalname}`,
    Body: file.buffer,
  }
  return await s3.upload(param).promise()
}
