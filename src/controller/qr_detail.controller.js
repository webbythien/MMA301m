const qrDetailService=require('../service/qr_detail.service')
class qr_detailController{
    static createDetail=async (req,res)=>{
        try{
            let id=req.params.id
            let data=req.body
            if(!id||Object.keys(req.body).length===0||!req.body.details){
                return res.status(400).json({
                    status:'Bad request',
                    statusCode:400
                })
            }
            const result=await qrDetailService.createDetail(data,id)
            return res.status(result.statusCode).json(result)

        }catch(error){
            return res.status(500).json('error')
        }
    }
    static getDetail =async(req,res)=>{
        try{
            let id=req.params.id
            if(!id){
                return res.status(400).json({
                    status:'Bad request',
                    statusCode:400
                })

            }
            let result=await qrDetailService.getDetail(id)
            return res.status(result.statusCode).json(result)


        }catch(error){
            return res.status(500).json('error')
        }
    }
}
module.exports=qr_detailController