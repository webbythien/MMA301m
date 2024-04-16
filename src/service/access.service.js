require('dotenv').config()
const user=require('../models/user.model')
const brcypt=require('bcryptjs')
const instance=require('../config/instance')
const jwt=require('jsonwebtoken')

class AccessService{
    static register =async (data)=>{
        try{
            instance()
            const existEmail=await user.findOne({email:data.email})
            if(existEmail) return  {
                status:'Existing Email',
                statusCode:409
            }
            const hashPassword=await brcypt.hash(data.password,5)
            const newUser=await user.create({
                fullName:data.fullName,
                email:data.email,
                password:hashPassword,
                gender:data.gender
                


            })
            return {
                status:'Success',
                statusCode:201,
                data:newUser
            }

        }catch(error){
            return {
                status:'Error',
                statusCode:500,
                EM:error
            }

        }
    }
    static logIn =async (data)=>{
        try{
            instance()
            const privateKey=process.env.PRIVATE_KEY
            const checkUser=await user.findOne({email:data.email})
            if(!checkUser) return {status:'Wrong Email  ',statusCode:409}
            const compare=await brcypt.compare(data.password,checkUser.password)
            if(compare===false) return {status:'Wrong password',statusCode:409}
            const payload=checkUser
            const token = await jwt.sign(checkUser.toJSON(),privateKey,{expiresIn:60*60})
            return {
                status:'Success',
                statusCode:201,
                data:{
                    userData:{
                        email:checkUser.email,
                        fullName:checkUser.fullName,
                        role_id:checkUser.role_id,
                        gender:checkUser.gender,
                        status:checkUser.status,
                        priority:checkUser.priority

                    },
                    token:token
                }

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
module.exports=AccessService