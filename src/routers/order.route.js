const express=require('express')
const orderRouter=express.Router()
const orderController=require('../controller/order.controller')
const authMiddleware = require("../middleware/authen");
const validate = require('../middleware/validate');
const qrValidation = require('../validations/qr.validation');


orderRouter.post('/orders',authMiddleware.hasRole('customer'),validate(qrValidation.BuyQR),orderController.createOrder)
orderRouter.get('/orders/:id',orderController.getOrder)
orderRouter.get('/orders',orderController.getAllOrder)
orderRouter.patch('/orders/:id',orderController.updateOrder)

orderRouter.get('/user/:id/orders',orderController.getOrderByCustomer)






module.exports=orderRouter