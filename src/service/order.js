const mongoose=require('mongoose')
const order=require('../models/order.model')
const qr =require('../models/qr.model')

class order_service{
    static updateOrder =async(id)=>{
        try{
            let checkOrder=await order.findById({
                _id:new mongoose.Types.ObjectId(id)
            })
            if(!checkOrder){
                return {
                    status:"Order not found",
                    statusCode:404
                }
            }
            checkOrder.status===false ? (await order.updateOne({ _id:new mongoose.Types.ObjectId(id)
            },{
                status:true
            }) ):(await order.updateOne({ _id:new mongoose.Types.ObjectId(id)
            },{
                status:false
            }) )
            checkOrder.status ===true ?? await order.updateOne({ _id:new mongoose.Types.ObjectId(id)
            },{
                status:true
            }) 
            return {
                status:'Success',
                statusCode:200
            }
            

        }catch(error){
            return {
                status:'Error',
                statusCode:500
            }

        }
    }
    static getAllOrder =async(data)=>{
        try{
            const data=await order.find()
            return data &&data.length >0 ?{
                status:'Success',
                statusCode:201,
                data:data
            }:{
                status:'Not found',
                statusCode:404

            }
            

        }catch(error){
            return {
                status:'Error',
                statusCode:500
            }

        }
    }
    static getOrder =async (id)=>{
        try{
            let data= await order.findById({
                _id:new mongoose.Types.ObjectId(id)
            })
            return data ? {
                status:'Success',
                statusCode:201,
                data:data
            }:{
                status:'Not found',
                statusCode:404
            }
        
        }catch(error){
            return {
                status:'Error',
                statusCode:500
            }

        }
    } 
    static createOrder=async(data)=>{
        try{
            const checkQr_id=await qr.findById({
                _id:new mongoose.Types.ObjectId(data.qr_id)


            })
            console.log(checkQr_id)
            if(checkQr_id) return {
                status:'Qr existing!',
                statusCode:409
            }
           
            const newOrder=await order.create({
                qr_id:new mongoose.Types.ObjectId(data.qr_id),
                user_id:new mongoose.Types.ObjectId(data.user_id),
                total_price:data.total_price,
                amount:data.amount,
                discount:data.discount
         
                
            })
            return {
                status:'Success',
                statusCode:201,
                data:newOrder
            }


        }catch(error){
            console.log(error)
            return {
                status:'Error',
                statusCode:500
            }
        }
    }
    

}
module.exports=order_service