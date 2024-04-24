const roleModel = require('../models/role.model');
const userService= require('../service/user.service');
const convertIfContainsSearch = require('../utils/convertRegex');
const { emitterInit } = require('../utils/emitter');
const pick = require('../utils/pick');
class UserController {
    static testCallSocket=async(req,res)=>{
        try{
            const emitter = await emitterInit();
            emitter.to('50').emit("payment",{merchant_id:'50', check:'sjsjs'})
            return res.status(200).json({
                msg:"success",
            })
        }catch(error){
            console.log(error)
            return res.status(500).json({
                status:'Internal server',
                statusCode:500,
                EM:error
            })
        }
    }
    static getAllHost= async(req,res)=>{
        try{
            const hostRole = await roleModel.findOne({name:'host'})
            const filter = pick({...req.query,role_id: hostRole._id}, ['fullName','email','active','gender','role_id',"status"]);
            const options = pick(req.query, ['sortBy', 'limit', 'page']);
            const filterReg =  convertIfContainsSearch(filter)

            const result= await userService.getHostData(filterReg,options )
            return res.status(result.statusCode).json(result)

        }catch(error){
            console.log(error)
            return res.status(500).json({
                status:'Internal server',
                statusCode:500,
                EM:error
            })

        }
    }
    static getUserById= async(req,res)=>{
        try{
            const id=req.params.id

            const result= await userService.getUserData(id)
            return res.status(result.statusCode).json(result)

        }catch(error){
            
            return res.status(500).json({
                status:'Internal server',
                statusCode:500,
                EM:error
            })

        }
    }
    static getAllUser=async(req,res)=>{
        try{
            const result=await userService.getAllUser()
            return res.status(result.statusCode).json(result)

        }catch(error){

            return res.status(500).json({
                status:'Internal server',
                statusCode:500,
                EM:error
            })
        }
    }
    static updateUser= async (req,res)=>{
        try{ 
             if(Object.keys(req.body).length===0){
                return res.status(400).json({
                    status:'Bad request',
                    statusCode:400
                })
             }
            let id=req.params.id
            // let changePass=req.query.changePass
            let data=req.body
            
            if(data.password&& data.newPassword){
                let result=await userService.changePassword(data,id)
                return res.status(result.statusCode).json(result)
            }
            let result=await userService.updateUser(data,id)
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
module.exports=UserController