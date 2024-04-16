const express=require('express')
const qrRouter=express.Router()
const qrController=require('../controller/qr.controller')
qrRouter.post('/qr',qrController.createQr)
qrRouter.patch('/qr/:id',qrController.updateQr)
qrRouter.get('/qr',qrController.getAllQr)
qrRouter.get('/qr/:id',qrController.getQrById)
qrRouter.delete('/qr/:id',qrController.deleteQr)

module.exports=qrRouter