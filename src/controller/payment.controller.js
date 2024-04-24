const paymentService=require('../service/payment.service')
const convertIfContainsSearch = require('../utils/convertRegex');

const pick = require('../utils/pick');

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
    static getAllPayment=async (req, res) => {
        try{
        const filter = pick({...req.query,host_id: req.userId}, ['name','host_id',"status"]);
        console.log('abc: ', filter)
        const options = pick(req.query, ['sortBy', 'limit', 'page']);
        console.log('option',options)
        const filterReg =  convertIfContainsSearch(filter)
        console.log('abc2: ', filterReg)
        const result = await paymentService.queryPayment(filterReg, options);
        return res.status(201).json(result)
    }catch(error){
            console.log(error)
            return res.status(500).json({
                status:'Internal server',
                statusCode:500,
                EM:error
            })
        }
    }

    static getPaymentByCustomer =async(req,res)=>{
        try{
            let id= req.params.id 
            let result =await paymentService.getPaymentByUserId(id)
            res.send(result)

        }catch(error){
            return res.status(500).json({
                status:'Internal server',
                statusCode:500,
                EM:error
            })
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