const qr_discount=require('../models/qr_discount.model')
const instance=require('../config/instance')
const mongoose=require('mongoose')
class QrDiscountService{
    static createQr_discount=async(data,id)=>{
        try{
            const qr=require('../models/qr.model')
            let checkExist=await qr.findById({_id:new mongoose.Types.ObjectId(id)})
            if(!checkExist){
                return {
                    status:'Not exist qr!',
                    statusCode:404
                }
            }
            let newData=await qr_discount.create({
                discount:data.discount,
                qr_id:new mongoose.Types.ObjectId(id),
                min_price:data.min_price

            })
            return {
                status:'success',
                statusCode:201,
                data:newData
            }

        }catch(error){
            console.log(error)
            return {
                status:'Internal server',
                statusCode:500
            }
        }
    }
    static updateStatus =async(id)=>{
        try{
            const qr=require('../models/qr.model')
            let checkExist=await qr.findById({_id:new mongoose.Types.ObjectId(id)})
            let data=await qr_discount.findOne({
                qr_id:new mongoose.Types.ObjectId(id),

            })
            if(!checkExist|| !data){
                return {
                    status:'Qr or discount not exist',
                    statusCode:404
                }
            }
            console.log(data)
            let updateData= data.status===false ?(
                await qr_discount.updateMany({
                    qr_id:new mongoose.Types.ObjectId(id)
                },{status:true},{new:true})
            ):(
                await qr_discount.updateMany({
                    qr_id:new mongoose.Types.ObjectId(id)
                },{status:false},{new:true}) )
            return {
                status:'Success',
                statusCode:201,
                data:updateData
            }


        }catch(error){
            return {
                status:'Internal server',
                statusCode:500
            }

        }
    }
    static getDiscount=async(id)=>{
        try{
            let data=await qr_discount.find({
                qr_id:new mongoose.Types.ObjectId(id),

            })
            return data ?{
                status:'success',
                statusCode:201,
                data:data

            }:{
                status:'Not found',
                statusCode:404,

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
module.exports=QrDiscountService