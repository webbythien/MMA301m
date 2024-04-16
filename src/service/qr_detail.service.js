const qr_detail=require('../models/qr_detail.model')
const instance=require('../config/instance')
const mongoose=require('mongoose')

class QrDetail{
    static getDetail =async (id)=>{
        try{
            instance()
            const data=await qr_detail.find({
                qr_id:new mongoose.Types.ObjectId(id)
            })
            return data ?{
                status:'Success',
                statusCode:201,
                data:data

            }
            :{
                status:'Id Not found',
                statusCode:404
            }



        }catch(error){
            return {
                status:'Error',
                statusCode:500
            }
        }
    }
    static createDetail =async (data,id)=>{
        try{
            instance()
            const newDetail=await qr_detail.create({
                qr_id:new mongoose.Types.ObjectId(id),
                details:data.details,
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
module.exports=QrDetail