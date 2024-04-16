const express =require('express')

const testRouter =express.Router()

testRouter.get('/test',(req,res)=>{
   
   return  res.send('test')
})
module.exports=testRouter