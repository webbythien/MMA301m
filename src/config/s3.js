const aws = require('aws-sdk');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

// Load environment variables from .env file
dotenv.config();

// Configure AWS S3 credentials
aws.config.update({
  secretAccessKey: process.env.SECRET_KEY_S3,
  accessKeyId: process.env.ACCESS_KEY_S3,
  region: process.env.REGION_S3,
});

const BUCKET_NAME = process.env.S3_NAME_BUCKET;
const s3 = new aws.S3();

// Define allowed file extensions
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif'];

// File filter function
const isAllowedFile = (fileName) => {
  const extension = path.extname(fileName).toLowerCase();
  return ALLOWED_EXTENSIONS.includes(extension);
};

// Upload file to S3
const uploadFileToS3 = (file, buffer) => {
  if (!isAllowedFile(file.originalname)) {
    throw new Error('Only image files are allowed.');
  }

  const fileExtension = path.extname(file.originalname).toLowerCase();
  const fileKey = `${uuidv4()}${fileExtension}`;

  const params = {
    Bucket: BUCKET_NAME,
    Key: fileKey,
    Body: buffer,
    ContentType: file.mimetype,
  };

  if (!buffer) {
    console.error('No buffer found');
    throw new Error('No buffer found');
  }

  return s3.upload(params).promise();
};

module.exports = uploadFileToS3;