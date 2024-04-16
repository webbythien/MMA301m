const express=require('express')
const orderRouter=express.Router()
const orderController=require('../controller/order.controller')
orderRouter.post('/orders',orderController.createOrder)
orderRouter.get('/orders/:id',orderController.getOrder)
orderRouter.get('/orders',orderController.getAllOrder)
orderRouter.patch('/orders/:id',orderController.updateOrder)





module.exports=orderRouter