const payment=require('../models/payment.model')
const order=require('../models/order.model')
const mongoose=require('mongoose')
const dotenv = require('dotenv');
const querystring = require('qs');
const crypto =  require("crypto");
const moment =  require("moment");
const { format } = require("date-fns");

dotenv.config();

class payment_service{
    static getPayment =async (id)=>{
        try{
            instance()
            let data=await payment.find({order_id:new mongoose.Types.ObjectId(id)})
            return data ? {
                status:'Success',
                statusCode:201,
                data:data
            }:{
                status:'Not found',
                statusCode:404
            }

        }catch(error){
            return {
                status:'Internal server',
                statusCode:500
            }

        }
    }

    static sortObject= (obj) => {
        var sorted = {};
        var str = [];
        var key;
      
        for (key in obj) {
          if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
          }
        }
      
        str.sort();
      
        for (var i = 0; i < str.length; i++) {
          var encodedKey = str[i];
          sorted[encodedKey] = encodeURIComponent(obj[encodedKey]).replace(/%20/g, "+");
        }
      
        return sorted;
      }

    static createPayment =async (req,orderIdRaw,userId)=>{
        try{
            let orderInDB= await order.findById(orderIdRaw)
            if(!orderInDB){
                return {
                    status:'Not exist order!',
                    statusCode:404
                }
            }
            const paymentCreated = await payment.create({
                order_id: orderInDB._id,
                user_id: userId,
                total_price: orderInDB.total_price,
            });
            const orderDescription = `${paymentCreated._id}`;
            const ipAddr =
                req.headers["x-forwarded-for"] ||
                req.connection?.remoteAddress ||
                req.socket?.remoteAddress;
            //ENV merchant
            const tmnCode = process.env.vnp_TmnCode;
            const secretKey = process.env.vnp_HashSecret;
            let vnpUrl = process.env.vnp_Url;
            const returnUrl = process.env.vnp_ReturnUrl;
            const date = new Date();
            const timeOut = 15;
            
            const expireDate = moment(date)
                .add(timeOut, "minutes")
                .format("YYYYMMDDHHmmss");
            const createDate = moment(date).format("YYYYMMDDHHmmss");
            const orderId = format(date, "HHmmss");
            const bankCode = "VNBANK";
            const orderInfo = orderDescription;
            let locale = "vn";
            if (locale === null || locale === "") {
            locale = "vn";
            }

            const currCode = "VND";
            const vnpParams = {};
            vnpParams["vnp_Version"] = "2.1.0";
            vnpParams["vnp_Command"] = "pay";
            vnpParams["vnp_TmnCode"] = tmnCode;
            vnpParams["vnp_Locale"] = locale;
            vnpParams["vnp_CurrCode"] = currCode;
            vnpParams["vnp_TxnRef"] = orderId;
            vnpParams["vnp_OrderInfo"] = orderInfo;
            vnpParams["vnp_OrderType"] = 150000;
            vnpParams["vnp_Amount"] = orderInDB.total_price * 100;
            vnpParams["vnp_ReturnUrl"] = returnUrl;
            vnpParams["vnp_IpAddr"] = ipAddr;
            vnpParams["vnp_CreateDate"] = createDate;
            vnpParams["vnp_ExpireDate"] = expireDate;
            vnpParams["vnp_BankCode"] = bankCode;
            
            console.log('vnpParams: ', vnpParams)
            const sortedVnpParams = payment_service.sortObject(vnpParams);
            console.log('sortedVnpParams: ',sortedVnpParams)

            const signData = querystring.stringify(sortedVnpParams, { encode: false });
            const hmac = crypto.createHmac("sha512", secretKey);
            const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
            sortedVnpParams["vnp_SecureHash"] = signed;
            console.log('sortedVnpParams: ',querystring.stringify(sortedVnpParams, { encode: false }))
            vnpUrl += "?" + querystring.stringify(sortedVnpParams, { encode: false });

            console.log('vnp: ', vnpUrl);
            const newPayment= await payment.findOneAndUpdate(
                { _id: paymentCreated._id },
                { $set: { url_payment: vnpUrl } },
                { new: true }
              );
            // let newPayment=await payment.create({
            //     order_id:new mongoose.Types.ObjectId(id)
            // })
            return {
                status:'Success',
                statusCode:201,
                data:newPayment,
            }


        }catch(error){
            console.log(error)
            return {
                status:'Internal server',
                statusCode:500
            }
        }
    }


}

module.exports=payment_service