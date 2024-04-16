// const express =require('express')
const testRouter =require('./test.route')
const roleRouter =require('./role.route')
const accessRouter=require('./accessRouter')
const userRouter=require('./user.route')
const qrRouter=require('./qr.route')
const qrCode=require('./qr_code.route')
const qrDetail=require('./qr_detail.route')
const qrDiscount=require('./qr_discount.route')
const category=require('./category.Router')
const cateQr=require('./cate_qr.router')
const order=require('./order.route')
const payment=require('./payment.route')
const orderDetail=require('./orderDetail.route')

const webApi =(app)=>{
 
   app.use('/api/v1',testRouter)
   app.use('/api/v1',roleRouter)
   app.use('/api/v1',accessRouter)
   app.use('/api/v1',userRouter)
   app.use('/api/v1',qrRouter)
   app.use('/api/v1',qrCode)
   app.use('/api/v1',qrDetail)
   app.use('/api/v1',qrDiscount)
   app.use('/api/v1',category)
   app.use('/api/v1',cateQr)
   app.use('/api/v1',order)
   app.use('/api/v1',payment)
   app.use('/api/v1',orderDetail)





}
module.exports=webApi