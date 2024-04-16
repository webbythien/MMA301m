const instance=require('../config/instance')
const orDetail=require('../models/orderDetail.model')
const order=require('../models/order.model')
const mongoose=require('mongoose')
class orderDetail_service{
    static getOrderDetail =async (id)=>{
        try{
            let checkExist =await order.findById({
                _id:new mongoose.Types.ObjectId(id)
            })
            if(!checkExist) return {
                status:'Order not exist!',
                statusCode:404

            }
            let data=await orDetail.findOne({
                order_id:new mongoose.Types.ObjectId(id)


            })
            return data ?{
                status:'success',
                statusCode:201,
                data:data
            }:{
                status:"not found details",
                statusCode:404
            }


        }catch(error){
            return {
                status:'Error',
                statusCode:500
            }

        }
    }
    static createOrDetail=async (data,id)=>{
        try{
           
            instance()
            let checkExist =await order.findById({
                _id:new mongoose.Types.ObjectId(id)
            })
            if(!checkExist) return {
                status:'Order not exist!',
                statusCode:404

            }
            const newDetail=await orDetail.create({
                order_id:new mongoose.Types.ObjectId(id),
                name_receive:data.name_receive,
                note:data.note||null,
                email_receive:data.email_receive,


            })
            return {
                status:'Success',
                statusCode:201,
                data:newDetail
            }

        }catch(error){
            return {
                status:'Error',
                statusCode:500
            }
        }
    }

}

module.exports=orderDetail_service