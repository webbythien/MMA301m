const instance=require('../config/instance')
const cate=require('../models/category.model')
const mongoose=require('mongoose')
class CategoryService{
    static getCategory =async ()=>{
        try{
            instance()
            let allCate=await cate.find()
            return {
                status:'success',
                statusCode:201,
                data:allCate
            }

        }catch(error){
            return {
                status:'Error occour in server',
                statusCode:500
            }

        }
    }
    static getCategoryById =async (id)=>{
        try{
            instance()
            let allCate=await cate.findOne({
                _id:new mongoose.Types.ObjectId(id)  })
            return {
                status:'success',
                statusCode:201,
                data:allCate
            }

        }catch(error){
            return {
                status:'Error occour in server',
                statusCode:500
            }

        }
    }
    static updateCate= async(data,id)=>{
        try{
            instance()
            let check =await cate.findOne({
                name:data.name
            })
            if(check) return {
                status:'Existing category',
                statusCode:409
            }
            let updateCate=await cate.findByIdAndUpdate({
                _id:new mongoose.Types.ObjectId(id)
            },{
                name:data.name,
                status:data.status
            },{
                new:true
            })
            return  updateCate ?{
                status:'Success',
                statusCode:201,
                data:updateCate
            }:{
                status:'Not found cate',
                statusCode:404,
            }
            

        }catch(error){
            return {
                status:'Error occour in server',
                statusCode:500
            }

        }
    }
    static createCategory=async(data)=>{
        try{
            instance()
            let check =await cate.findOne({
                name:data.name
            })
            if(check) return {
                status:'Existing category',
                statusCode:409
            }
            let newData=await cate.create({
                name:data.name,
                description:data.description
            })
            return {
                status:'success',
                statusCode:201,
                data:newData
            }

        }catch(error){
            return {
                status:'Error occour in server',
                statusCode:500
            }
        }
    }

}
module.exports=CategoryService