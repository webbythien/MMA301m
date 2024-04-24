const qr_Service=require('../service/qr.service');
const convertIfContainsSearch = require('../utils/convertRegex');
const pick = require('../utils/pick');
class QrController{

    static getQr=async (req, res) => {
        try{
        const filter = pick({...req.query,host_id: req.userId}, ['name','host_id',"status"]);
        console.log('abc: ', filter)
        const options = pick(req.query, ['sortBy', 'limit', 'page']);
        const filterReg =  convertIfContainsSearch(filter)
        console.log('abc2: ', filterReg)
        const result = await qr_Service.queryQr(filterReg, options);
        res.send(result);
        }catch(error){
            console.log(error)
            return res.status(500).json({
                status:'Internal server',
                statusCode:500,
                EM:error
            })
        }
    }

    static staffManageQr=async (req, res) => {
        try{
        const result = await qr_Service.manageStaffQr(req,res);
        return result
        }catch(error){
            console.log(error)
            return res.status(500).json({
                status:'Internal server',
                statusCode:500,
                EM:error
            })
        }
    }

    static staffBanQRControl=async (req, res) => {
        try{
        const result = await qr_Service.StaffBanQR(req,res);
        return result
        }catch(error){
            console.log(error)
            return res.status(500).json({
                status:'Internal server',
                statusCode:500,
                EM:error
            })
        }
    }

    static createQr=async(req,res)=>{
        try{
            let data=req.body

            let result=await qr_Service.createQr(data, req.userId)
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
    static getAllQr =async(req,res)=>{
        try{
            let result= await qr_Service.getAllQr()
            return res.status(result.statusCode).json(result)


        }catch(error){
            return res.status(500).json({
                status:'Internal server',
                statusCode:500,
                EM:error
            })

        }
    }

    static getQrByUserId=async (req,res)=>{
        try{ 
            let id=req.userId
            let result =await qr_Service.getQrByUser(id)
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