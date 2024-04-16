const orderDetailService=require('../service/orderDetail.service')
class orderDetailController{
    static createOrDetail=async (req,res)=>{
        try{
           
            let id=req.params.id
            let data=req.body
            if(Object.keys(req.body).length===0||!req.body.name_receive||!req.body.email_receiver){
                return res.status(400).json({
                    status:'bad request',
                    statusCode:400
                })
            }
            let result=await orderDetailService.createOrDetail(data,id)
            return res.status(result.statusCode).json(result)


        }catch(error){
            return {
                status:'Internal server',
                statusCode:500,
                EM:error
            }
        }
    }
    static getOrder=async (req,res)=>{
        try{
            let id=req.params.id
            let result=await orderDetailService.getOrderDetail(id)
            return res.status(result.statusCode).json(result)




        }catch(error){
            return {
                status:'Internal server',
                statusCode:500,
                EM:error
            }

        }
    }

}

module.exports=orderDetailController