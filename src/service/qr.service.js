const instance=require('../config/instance')
const qr=require('../models/qr.model')
const qr_code=require('../models/qr_code.model')
const qr_detail=require('../models/qr_detail.model')
const qr_discount=require('../models/qr_discount.model')
const order=require('../models/order.model')
const cateQr=require('../models/category_qr.model')
const mongoose=require('mongoose')
class QrService{
    static createQr=async(data)=>{
        try{
            instance()
            const newQr=await qr.create({
                name:data.name,
                price:data.price,
                expire_date:new Date(),
                amount:data.amount,
                host_id:data.host_id,
                approve_by:data.approve_by
            })
            return {
                status:'Success',
                statusCode:201,
                data:newQr
            }

        }catch(error){
            return {
                status:'Error',
                statusCode:500,
                EM:error
            }

        }

    }

    static getQrById=async (id)=>{
        try{
            instance()
            const  getQr= await qr.findById({_id:new mongoose.Types.ObjectId(id)})

            return {
                status:'Success',
                statusCode:201,
                data:getQr
            }
            

        }catch(error){
            return {
                status:'Error',
                statusCode:500
            }

        }
    }
    
    static getAllQr=async()=>{
        try{
            instance()
            const allQr=await qr.find()
            return {
                status:'Success',
                statusCode:201,
                data:allQr
            }

        }catch(error){
            return {
                status:'Error',
                statusCode:500
            }
        }
    }
    static deleteQr=async(id)=>{
        try{
            instance()
       
        const check= await qr.findByIdAndDelete({_id:new mongoose.Types.ObjectId(id)})
        if(!check){
            return {
                status:'Item not found to delete',
                statusCode:404
            }
        }
            await qr_code.deleteMany({qr_id:new mongoose.Types.ObjectId(id)})
            await qr_detail.deleteMany({qr_id:new mongoose.Types.ObjectId(id)})
            await qr_discount.deleteMany({qr_id:new mongoose.Types.ObjectId(id)})
            await order.deleteMany({qr_id:new mongoose.Types.ObjectId(id)})
            await cateQr.deleteMany({qr_id:new mongoose.Types.ObjectId(id)})
            return {
                status:'Success',
                statusCode:204
            }

        }catch(error){
            console.log(error)
            return {
                status:'Error',
                statusCode:500
            }

        }
    }
    static updateQr =async(data,id)=>{
        try{
            instance()
            const updateQr=await qr.findByIdAndUpdate({
                _id:new mongoose.Types.ObjectId(id)
            },{
                name:data.name,
                price:data.price,
                status:data.status,
                amount:data.amount,
                host_id:data.host_id,
                approve_by:data.approve_by
            },{
                new:true
            })
            return updateQr ? {
                status:'Success',
                statusCode:201,
                data:updateQr
            }:{
                status:'Not found qr ',
                statusCode:404

            }

        }catch(error){
            console.log(error)
            return {
                status:'Error',
                statusCode:500
            }

        }
    }


}
module.exports=QrService