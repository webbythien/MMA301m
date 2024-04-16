const express =require('express')
const roleController=require('../controller/role.controller')
const roleRouter =express.Router()

roleRouter.post('/roles',roleController.createRole)
roleRouter.get('/roles',roleController.getAllRole)
roleRouter.get('/roles/:id',roleController.getAllRoleById)
roleRouter.patch('/roles/:id',roleController.updateAllRoleById)


module.exports=roleRouter