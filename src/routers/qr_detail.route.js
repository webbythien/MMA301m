const express=require('express')
const qr_detailRouter= express.Router()
const qrdetailController=require('../controller/qr_detail.controller')
qr_detailRouter.post('/qrs/:id/details',qrdetailController.createDetail)
qr_detailRouter.get('/qrs/:id/details',qrdetailController.getDetail)


module.exports=qr_detailRouter