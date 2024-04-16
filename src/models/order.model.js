const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema({
    qr_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Qr',
        index:true,
        unique:true
    },
    total_price:{
        type:String,
        
    },
    amount:{
        type:String
    },
    discount:{
        type:String
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
        index:true,

    },
    status:{
        type:Boolean,
        default:true
    },
    type:{
        type:Number,
        default:null
    }
  
});

//Export the model
module.exports = mongoose.model('Order', orderSchema);