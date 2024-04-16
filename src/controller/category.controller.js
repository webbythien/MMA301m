const cateService=require('../service/category.service')
class cateController{
    static createCate=async(req,res)=>{
        try{
            let data=req.body
            if(Object.keys.length===0||!req.body.name||!req.body.description){
                return res.status(400).json({
                    status:'Bad request',
                    statusCode:400
                })
            }
            let result=await cateService.createCategory(data)
            return res.status(result.statusCode).json(result)

        }catch(error){
            return res.status(500).json({
                status:'Internal server',
                statusCode:500
            })
        }
    }
    static getAllCate=async(req,res)=>{
        try{ 
            let result=await cateService.getCategory()
            return res.status(result.statusCode).json(result)

        }catch(error){
            return res.status(500).json({
                status:'Internal server',
                statusCode:500
            })

        }
    }
    static getCateById=async(req,res)=>{
        try{ 
            let id=req.params.id
            let result=await cateService.getCategoryById(id)
            return res.status(result.statusCode).json(result)

        }catch(error){
            return res.status(500).json({
                status:'Internal server',
                statusCode:500
            })

        }
    }
    static updateCate =async(req,res)=>{
        try{
            let id=req.params.id
            let data=req.body
            console.log(Object.keys(req.body).length,data)
            if(Object.keys(req.body).length===0||!req.body.name||!req.body.description){
                return res.status(400).json({
                    status:'Bad request',
                    statusCode:400
                })
            }
            let result =await cateService.updateCate(data,id)
            return res.status(result.statusCode).json(result)


            
        }catch(error){
            return res.status(500).json({
                status:'Internal server',
                statusCode:500
            })

        }
    }
  

}
module.exports=cateController