const express= require('express')
const userRouter=express.Router()
const userController=require('../controller/user.controller')
const authMiddleware = require("../middleware/authen");
const validate = require('../middleware/validate');
const staffValidation = require('../validations/staff.validation');

userRouter.get('/staff/host',authMiddleware.hasRole('staff'),validate(staffValidation.getHost),userController.getAllHost)

userRouter.get('/user/:id',userController.getUserById)
userRouter.get('/user',userController.getAllUser)
userRouter.patch('/user/:id',userController.updateUser)

module.exports=userRouter