const accessService=require('../service/access.service')
class AccessController {
    static register=async (req,res)=>{
        try{ 
            console.log(req.body,'body')
            if (!req.body.fullName || !req.body.email || !req.body.password ) {
                return res.status(400).json({
                    status: 'Bad request',
                    statusCode: 400
                });
            }
            
            let result =await accessService.register(req.body)
            return res.status(result.statusCode).json(result)
            

        }catch(error){
            return res.status(500).json({
                status:'Internal server',
                statusCode:500,
                EM:error
            })

        }

    }
    static login =async (req,res)=>{
        try{
            if(!req.body.email||!req.body.password){
                return res.status(400).json({
                    status: 'Bad request',
                    statusCode: 400
                });

            }
            let result =await accessService.logIn(req.body)
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
module.exports=AccessController