const express=require('express')
const discountRouter=express.Router()
const discountController=require('../controller/qr_discount.controller')

discountRouter.post('/qrs/:id/discounts',discountController.createDiscount)
discountRouter.get('/qrs/:id/discounts',discountController.getDiscount)
discountRouter.patch('/qrs/:id/discounts',discountController.updateStatus)


module.exports=discountRouter