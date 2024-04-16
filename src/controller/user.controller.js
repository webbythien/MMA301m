const userService= require('../service/user.service')
class UserController {
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
            let changePass=req.query.changePass
            let data=req.body
            
            if(changePass&&changePass.trim()==='true'){
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