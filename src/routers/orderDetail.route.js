const express=require('express')
const orderDetailController=require('../controller/orderDetail.controller')

const detailRouter=express.Router()
detailRouter.post('/orders/:id/details',orderDetailController.createOrDetail)
detailRouter.get('/orders/:id/details',orderDetailController.getOrder)


module.exports=detailRouter