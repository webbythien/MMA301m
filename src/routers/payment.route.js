const express=require('express')
const paymentController=require('../controller/payment.controller')
const paymentRouter=express.Router()

paymentRouter.post('/orders/:id/payments',paymentController.createPayment)
paymentRouter.get('/orders/:id/payments',paymentController.getPayment)



module.exports=paymentRouter