const discountService=require('../service/qr_discount.service')
class qr_discountController{
    static  createDiscount=async(req,res)=>{
        try{
            let data=req.body
            let id=req.params.id
            if(!id||Object.keys(req.body).length===0||!req.body.discount||!req.body.min_price){
                return res.status(400).json({
                    status:'Bad request!',
                    statusCode:400
                })
            }
            let result=await discountService.createQr_discount(data,id)
            return res.status(result.statusCode).json(result)

        }catch(error){
     
            return res.status(500).json({
                status:'Internal server',
                statusCode:500
            })
        }
    }
    static getDiscount =async (req,res)=>{
        try{
            let id=req.params.id
            let result=await discountService.getDiscount(id)
            return res.status(result.statusCode).json(result)


        }catch(error){
            return res.status(500).json({
                status:'Internal server',
                statusCode:500
            })

        }}
    static updateStatus =async (req,res)=>{
        try{
            let id=req.params.id
            let result=await discountService.updateStatus(id)
            return res.status(result.statusCode).json(result)


        }catch(error){
            return res.status(500).json({
                status:'Internal server',
                statusCode:500
            })

        }
        

    }

}
module.exports=qr_discountController