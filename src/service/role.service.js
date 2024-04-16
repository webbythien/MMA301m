const role=require('../models/role.model')
const instance=require('../config/instance')
const { default: mongoose } = require('mongoose')
class RoleService {
    static createRole=async (data)=>{
         
        try{
           
            
            const newRole =await role.create({
                name:data.name
            })
            return   {
                status:'Success',
                statusCode:201,
                data:newRole
            }


        }catch(error){
            return {
                status:'Error',
                statusCode:500,
                EM:error
            }
        }
    }
    static getAllRole =async ()=>{
        try{
            let data =await role.find()
            return  data && data.length >0 ? {
                status:'Success',
                statusCode:201,
                data:data
            }:{
                status:'Not found',
                statusCode:404,
          

            }

        }catch(error){
            return {
                status:'Error',
                statusCode:500,
                EM:error
            }

        }
    }
    static getRoleById=async(id)=>{
        try{
            let data=await role.findById({_id:new mongoose.Types.ObjectId(id)})
            return  data  ? {
                status:'Success',
                statusCode:201,
                data:data
            }:{
                status:'Not found',
                statusCode:404,
          

            }



        }catch(error){
            return {
                status:'Error',
                statusCode:500,
                EM:error
            }

        }
    }
    static deleteRoleById=async(id)=>{
        try{

        }catch(error){
            return {
                status:'Error',
                statusCode:500,
                EM:error
            }


        }
    }
    static updateRole=async(id)=>{
        try{
            let checkExist=await role.findById({
                _id:new mongoose.Types.ObjectId(id)
            })
            if(!checkExist){
                return {
                    status:'Role not found',
                    statusCode:404
                }
            }
            let changeStatus = checkExist.status ===false ? (await role.findByIdAndUpdate({_id:new mongoose.Types.ObjectId(id)},{status:true},{new:true}))
            :(await role.findByIdAndUpdate({_id:new mongoose.Types.ObjectId(id)},{status:false},{new:true}))
         
            return {
                status:"Success",
                statusCode:200,
                data:changeStatus
            }



        }catch(error){
            return {
                status:'Error',
                statusCode:500,
                EM:error
            }

        }
    }


}

module.exports=RoleService