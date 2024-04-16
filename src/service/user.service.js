const  user=require('../models/user.model')
const brcypt=require('bcryptjs')
const instance=require('../config/instance')
const mongoose=require('mongoose')
class UserService {
    static getUserData=async (id)=>{
        try{
            const userData=await user.findById({_id:new mongoose.Types.ObjectId(id)}).select('-password ')
            return  userData ? {
                status:'Success',
                statusCode:201,
                data:userData
            }:{
                status:'Not found',
                statusCode:404
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
    static changePassword =async (data,id)=>{
        try{
            const checkUser= await user.findById({_id:new mongoose.Types.ObjectId(id)})
            const compare= await brcypt.compare(data.password,checkUser.password)
            if(compare===false){
                return {
                    status:'Wrong password',
                    statusCode:401,

                }
            }
            if(data.password===data.newPassword) return {status:'The new password must be different from the old password',statusCode:409}
            const newHashPassword= await brcypt.hash(data.newPassword,5)
            const updateUser= await user.findByIdAndUpdate({_id:new mongoose.Types.ObjectId(id)},{
                password:newHashPassword
            })
            return updateUser ? {
                status:'Success',
                statusCode:202,
                
            }:{
                status:'bad request',
                statusCode:400
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
    static getAllUser=async()=>{
        try{
            instance()
            let allUser= await user.find().select('-password')
            return allUser ?{
                status:'Success',
                statusCode:201,
                data:allUser
            }:{
                status:'Not found',
                statusCode:404
            }

        }catch(error){
            return {
                status:'Error',
                statusCode:500,
                EM:error
            }

        }
    }
    static updateUser=async (data,id)=>{
        try{
            instance()
            const updateUser=await user.findByIdAndUpdate({
                _id:new mongoose.Types.ObjectId(id)
            },{
                fullName:data.fullName,
                email:data.email,
                status:data.status,
                priority:data.priority,
                gender:data.gender
            },{
                new:true
            }).select('-password')
            if(!updateUser){
                return {
                    status:'User not existing!',
                    statusCOde:404,

                }
            }
            return  {
                status:'Success',
                statusCode:201,
                data:updateUser
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
module.exports=UserService