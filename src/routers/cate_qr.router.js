const express=require('express')

const cateQrcontroller=require('../controller/cate_qr.controller')
const cateQr=express.Router()
cateQr.post('/categories/:category_id/qr/:qr_id',cateQrcontroller.createCateQr)

module.exports=cateQr