const qr_Service=require('../service/qr.service')
class QrController{
    static createQr=async(req,res)=>{
        try{
            let data=req.body
            if(Object.keys(req.body).length===0||!req.body.name||!req.body.price||!req.body.amount||!req.body.host_id||!req.body.approve_by){
                return  res.status(400).json({
                    status:'Bad request!Body is required',
                    statusCode:400
                })

            }
            let result=await qr_Service.createQr(data)
            return res.status(result.statusCode).json(result)
            


        }catch(error){
            return res.status(500).json({
                status:'Internal server',
                statusCode:500,
                EM:error
            })


        }
    }
    static deleteQr=async(req,res)=>{
        try{
            let id=req.params.id
            let result=await qr_Service.deleteQr(id)
            return res.status(result.statusCode).json(result)
            
            

        }catch(error){
            return res.status(500).json({
                status:'Internal server',
                statusCode:500,
                EM:error
            })

        }
    }
    static updateQr=async(req,res)=>{
        try{
            let id=req.params.id
            let data=req.body
            if(Object.keys(req.body).length===0||!req.body.name||!req.body.price||!req.body.amount||!req.body.host_id||!req.body.approve_by){
                return  res.status(400).json({
                    status:'Bad request!Body is required',
                    statusCode:400
                })

            }
            let result=await qr_Service.updateQr(data,id)
            return res.status(result.statusCode).json(result)
            

        }catch(error){
            
            return res.status(500).json({
                status:'Internal server',
                statusCode:500,
                EM:error
            })

        }
    }
    static getAllQr =async(req,res)=>{
        try{
            let result =await qr_Service.getAllQr()
            return res.status(result.statusCode).json(result)

        }catch(error){
            return res.status(500).json({
                status:'Internal server',
                statusCode:500,
                EM:error
            })

        }
    }
    static getQrById=async (req,res)=>{
        try{ 
            let id=req.params.id
            let result =await qr_Service.getQrById(id)
            return res.status(result.statusCode).json(result)

        }catch(error){
            return res.status(500).json({
                status:'Internal server',
                statusCode:500,
                EM:error
            })

        }


    }
}
module.exports=QrController