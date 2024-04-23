const paymentService=require('../service/payment.service')
class paymentController{
    static createPayment=async(req,res)=>{
        try{
            let id=req.body.order_id
            let result=await paymentService.createPayment(req,id, req.userId)
            return res.status(result.statusCode).json(result)

        }catch(error){
            return {
                status:'Error',
                statusCode:500
            }
        }
    }
    static getPayment=async(req,res)=>{
        try{
            let id=req.params.id
            let result=await paymentService.getPayment(id)
            return res.status(result.statusCode).json(result)





        }catch(error){
            return {
                status:'Error',
                statusCode:500
            }

        }
    }
 
}

module.exports=paymentController