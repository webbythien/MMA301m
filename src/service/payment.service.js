const payment=require('../models/payment.model')
const order=require('../models/order.model')
const mongoose=require('mongoose')
const instance=require('../config/instance')

class payment_service{
    static getPayment =async (id)=>{
        try{
            instance()
            let data=await payment.find({order_id:new mongoose.Types.ObjectId(id)})
            return data ? {
                status:'Success',
                statusCode:201,
                data:data
            }:{
                status:'Not found',
                statusCode:404
            }

        }catch(error){
            return {
                status:'Internal server',
                statusCode:500
            }

        }
    }
    static createPayment =async (id)=>{
        try{
            instance()
            let check_user= await order.findById({_id:new mongoose.Types.ObjectId(id)})
            if(!check_user){
                return {
                    status:'Not exist order!',
                    statusCode:404
                }
            }
            let newPayment=await payment.create({
                order_id:new mongoose.Types.ObjectId(id)
            })
            return {
                status:'Success',
                statusCode:201,
                data:newPayment
            }


        }catch(error){
            console.log(error)
            return {
                status:'Internal server',
                statusCode:500
            }
        }
    }


}

module.exports=payment_service