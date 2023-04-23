const { S3 } = require("aws-sdk");
require("dotenv").config();

exports.s3Upload = async (file) => {
  const s3 = new S3();
  const param = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `storage/${file.originalname}`,
    Body: file.buffer,
  };
  return await s3.upload(param).promise();
};
