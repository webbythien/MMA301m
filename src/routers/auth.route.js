const express=require('express')

const authController=require('../controller/auth.controller')
const validate = require('../middleware/validate');
const authValidation = require('../validations/auth.validation');

const authRoute=express.Router()

authRoute.post('/signup',validate(authValidation.register), authController.registerUser)
authRoute.post('/login', validate(authValidation.login), authController.login);

module.exports=authRoute