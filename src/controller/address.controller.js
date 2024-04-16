const addressService =require('../service/address.service')
class AddressController{
    static createAddress =async(req,res)=>{
     try{
        if(req.body.name===null || req.body.name===undefined){
            return res.status(400).json({
                status:'Bad request',
                statusCode:400
            })
        }
       const data= req.body
       console.log(data,'data')
    //    const result= await addressService.createAddress(data)
    //    return res.status(result.statusCode).json(result)


     }catch(error){
        return res.status(500).json({
            status:'Internal Server',
            statusCode:500

        })

     }

    }
      
}
module.exports=AddressController