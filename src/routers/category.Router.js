const express=require('express')
const cateController=require('../controller/category.controller')

const cateRouter=express.Router()
cateRouter.get('/categories',cateController.getAllCate)
cateRouter.get('/categories/:id',cateController.getCateById)
cateRouter.patch('/categories/:id',cateController.updateCate)


cateRouter.post('/categories',cateController.createCate)
module.exports=cateRouter