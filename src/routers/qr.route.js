const express=require('express')
const qrRouter=express.Router()
const qrController=require('../controller/qr.controller')
const authMiddleware = require("../middleware/authen");
const validate = require('../middleware/validate');
const qrValidation = require('../validations/qr.validation');


qrRouter.post('/qr',authMiddleware.hasRole('host'),validate(qrValidation.CreatQR),qrController.createQr)
qrRouter.patch('/qr/:id',qrController.updateQr)
qrRouter.get('/qr',qrController.getAllQr)
qrRouter.get('/qr/:id',qrController.getQrById)
qrRouter.delete('/qr/:id',qrController.deleteQr)

module.exports=qrRouter