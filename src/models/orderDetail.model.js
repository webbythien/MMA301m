const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var orderDetailSchema = new mongoose.Schema({
   order_id:{
    type:mongoose.Schema.Types.ObjectId,
    unique:true,
    ref:'Order'
   },
   name_receive:{
    type:String
   },
   note:{
    type:String
   },
   email_receive:{
    type:String
   },
   status:{
    type:Boolean,
    default:true
   }
});

//Export the model
module.exports = mongoose.model('OrderDetail', orderDetailSchema);