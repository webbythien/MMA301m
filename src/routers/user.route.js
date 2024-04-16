const express= require('express')
const userRouter=express.Router()
const userController=require('../controller/user.controller')
userRouter.get('/user/:id',userController.getUserById)
userRouter.get('/user',userController.getAllUser)
userRouter.patch('/user/:id',userController.updateUser)

module.exports=userRouter