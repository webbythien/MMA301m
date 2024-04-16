const Qr_codeService =require('../service/qr_code.service')

class qrCodeClass{
    static getQrCode=async(req,res)=>{
        try{
            let id=req.params.id
            if(!id){
                return {
                    status:'Bad request',
                    statusCode:400
                }
            }
            let result=await Qr_codeService.getQrCode(id)
            return res.status(result.statusCode).json(result)

        }catch(error){
            return {
                status:'Internal server',
                statusCode:500
            }
        }
    }
    static createQrCode=async (req,res)=>{
        try{
            let id=req.params.id
            let data=req.body
         
            if(!id||Object.keys(req.body).length===0||!req.body.code||!req.body.data){
                return {
                    status:'Bad request',
                    statusCode:400
                }
            }
            const result=await Qr_codeService.createQrCode(data,id)
            console.log(result)
            return res.status(result.statusCode).json(result)



        }catch(error){
            return {
                status:'Internal server',
                statusCode:500
            }
        }
    }
    static updateQr_code=async(req,res)=>{
        try{
            let id=req.params.id
            let result =await Qr_codeService.updateStatusQrCode(id)
            return res.status(result.statusCode).json(result)



        }catch(error){
            return {
                status:'Internal server',
                statusCode:500
            }

        }
    }

}
module.exports=qrCodeClass