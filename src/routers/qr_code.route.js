const express =require('express')
const qrController=require('../controller/qr_code.controller')
const qr_codeRouter=express.Router()
qr_codeRouter.get('/qrs/:id/codes',qrController.getQrCode)
qr_codeRouter.post('/qrs/:id/codes',qrController.createQrCode)
qr_codeRouter.patch('/qrs/:id/codes',qrController.updateQr_code)
qr_codeRouter.get('/qrs/codes/:code/details',qrController.getDetailByQrCode)



module.exports=qr_codeRouter