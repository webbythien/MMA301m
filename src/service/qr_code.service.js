const mongoose=require('mongoose')
const qr_code=require('../models/qr_code.model')
const instance=require('../config/instance')
const qr=require('../models/qr.model')
class Qr_codeService{
    static  getQrCode=async(id)=>{
        try{
            instance()
            const qrCode=await qr_code.find({
                qr_id:new mongoose.Types.ObjectId(id)
            }).populate('qr_id')
            return qrCode ? {
                status:'Success',
                statusCode:201,
                data:qrCode
            }:{
                status:'Not found',
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
    static deleteQr=async(id)=>{
        try{
            instance()
            

        }catch(error){
            console.log(error)
            return {
                status:'Error',
                statusCode:500
            }

        }
    }
    static updateStatusQrCode=async (id)=>{
        try{
            let checkExistQr=await qr.findById({
                _id:new mongoose.Types.ObjectId(id)
            })
            let checkExistQrcode=await qr_code.findOne({
                qr_id:new mongoose.Types.ObjectId(id)

            })
            if(!checkExistQr||!checkExistQrcode){
                return {
                    status:'Qr not existing or code !',
                    statusCode:409
                }
            }
            let changeStatus=checkExistQrcode.status ===false ?
            (await qr_code.findOneAndUpdate({ qr_id:new mongoose.Types.ObjectId(id)},{status:true},{new:true})):(await qr_code.findOneAndUpdate({ qr_id:new mongoose.Types.ObjectId(id)},{status:false},{new:true}))
            return {
                status:'Success',
                statusCode:201,
                data:changeStatus
            }
            

        }catch(error){
            console.log(error)
            return {
                status:'Error',
                statusCode:500
            }

        }
    }
    static createQrCode=async(data,id)=>{
        try{
            let checkExistQr=await qr.findById({
                _id:new mongoose.Types.ObjectId(id)
            })
            let checkExistQrcode=await qr_code.findOne({
                qr_id:new mongoose.Types.ObjectId(id)

            })
            if(!checkExistQr||checkExistQrcode){
                return {
                    status:'Qr not existing or code existing!',
                    statusCode:409
                }
            }
             
           
            const newQrCode=await qr_code.create({
                code:data.code,
                qr_id:new mongoose.Types.ObjectId(id),
                data:data.data
            })
            return {
                status:'Success',
                statusCode:201,
                data:newQrCode
                
            }

        }catch(error){
            return {
                status:'Error',
                statusCode:500
            }

        }
    }


}
module.exports=Qr_codeService