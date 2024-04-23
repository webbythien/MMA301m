const paymentService=require('../service/payment.service')
class paymentController{
    static createPayment=async(req,res)=>{
        try{
            let ids=req.body.order_ids
            let result=await paymentService.createPayment(req, ids, req.userId)
            return res.status(result.statusCode).json(result)

        }catch(error){
            return {
                status:'Error',
                statusCode:500
            }
        }
    }


    static vnp_ipn=async(req,res)=>{
        try{
           await paymentService.vpnIPN(req)
           const url = 'https://www.google.com'; // URL bạn muốn chuyển hướng tới
           res.redirect(url);
        }catch(error){
            console.log(error)
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