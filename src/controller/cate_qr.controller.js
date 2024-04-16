const cateQr=require('../service/cate_qr.service')
class cate_qr_controller{
     static createCateQr=async(req,res)=>{
        try{
            let category_id=req.params.category_id
            let qr_id =req.params.qr_id
            const result=await cateQr.createCateQr(category_id,qr_id)
            return res.status(result.statusCode).json(result)
            

        }catch(error){
            return {
                status:'err',
                statusCode:500,
                EM:error
            }
        }
     }
}
module.exports=cate_qr_controller