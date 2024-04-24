const express=require('express')
const paymentController=require('../controller/payment.controller')
const validate = require('../middleware/validate');
const paymentValidation = require('../validations/payment.validation');
const authMiddleware = require("../middleware/authen");

const paymentRouter=express.Router()

paymentRouter.post('/payments',authMiddleware.hasRole('customer'),validate(paymentValidation.createPayment),paymentController.createPayment)
paymentRouter.get('/vnp_ipn',paymentController.vnp_ipn)
paymentRouter.get('/host/payment',paymentController.getAllPayment)
paymentRouter.get('/orders/:id/payments',paymentController.getPayment)



module.exports=paymentRouter