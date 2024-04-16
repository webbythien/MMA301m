const cate_qr=require('../models/category_qr.model')
const instance=require('../config/instance')
const mongoose=require('mongoose')
class Cate_Qr_controller{
    static createCateQr=async(category_id,qr_id)=>{
        try{
            instance()
            let newCateQr=await cate_qr.create({
                category_id:new mongoose.Types.ObjectId(category_id),
                qr_id:new mongoose.Types.ObjectId(qr_id)
            })
            
            return {
                status:'Success',
                statusCode:201,
                data:newCateQr
            }


        }catch(error){
            return {
                status:'Internal server',
                statusCode:500
            }
        }
    }
    

}

module.exports=Cate_Qr_controller