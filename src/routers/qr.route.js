const express=require('express')
const qrRouter=express.Router()
const qrController=require('../controller/qr.controller')
const authMiddleware = require("../middleware/authen");
const validate = require('../middleware/validate');
const qrValidation = require('../validations/qr.validation');



qrRouter.post('/host/qr',authMiddleware.hasRole('host'),validate(qrValidation.CreatQR),qrController.createQr)
qrRouter.put('/staff/qr', authMiddleware.hasRole('staff'),validate(qrValidation.StaffManageQR),qrController.staffManageQr)
qrRouter.put('/staff/ban_qr', authMiddleware.hasRole('staff'),validate(qrValidation.StaffBanQR),qrController.staffBanQRControl)
qrRouter.put('/host/ban_qr', authMiddleware.hasRole('host'),validate(qrValidation.StaffBanQR),qrController.staffBanQRControl)

qrRouter.get('/host/qr',authMiddleware.hasRole('host'),validate(qrValidation.getQRs),qrController.getQr)


qrRouter.patch('/host/qr/:id',authMiddleware.hasRole('host'),validate(qrValidation.hostUpdateQR),qrController.updateQr)

qrRouter.get('/qr/customer',authMiddleware.hasRole('customer'), qrController.getQrByUserId)
// qrRouter.get('/qr',qrController.getAllQr)
qrRouter.get('/qr/:id',qrController.getQrById)
qrRouter.get('/qr',qrController.getAllQr)

qrRouter.delete('/qr/:id',qrController.deleteQr)

module.exports=qrRouter