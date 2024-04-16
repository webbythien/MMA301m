const express =require('express')
const accessRouter=express.Router()
const accessController=require('../controller/access.controller')


accessRouter.post('/register',accessController.register)
accessRouter.post('/logIn',accessController.login)


module.exports=accessRouter