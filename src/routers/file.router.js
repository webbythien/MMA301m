const express=require('express')
const multer = require('multer');
const storage = multer.memoryStorage()



const uploadFileToS3 = require('../config/s3')
const fileRouter=express.Router()
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
  })

fileRouter.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const file = req.file;
        const buffer = file.buffer;
        if (!buffer) {
            return res.status(400).send('No buffer found.');
          }
        const result = await uploadFileToS3(file, buffer);
        console.log(`File uploaded successfully. Location: ${result.Location}`);
        res.send({
            image_url:result.Location
        });
      } catch (err) {
        console.error(err);
        res.status(500).send(err);
      }
  });


module.exports=fileRouter