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
    static updateRole=async(data,id)=>{
        try{
          
           let updateRole=await role.findByIdAndUpdate({
            _id:new mongoose.Types.ObjectId(id)

           },{
            status:data.status,
            name:data.name
           },{
            new:true
           })
         
            return {
                status:"Success",
                statusCode:201,
                data:updateRole
            }



        }catch(error){
            console.log(error)

            return {
                status:'Error',
                statusCode:500,
                EM:error
            }

        }
    }


}

module.exports=RoleService