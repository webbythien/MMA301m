const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema({
    qr_code:{
        type: [mongoose.Schema.Types.ObjectId],
        required:true,  
        ref:'Qr_code',
    },
    qr_id:{
        type:[mongoose.Schema.Types.ObjectId],
        required:true,
        ref:'Qr',
    },
    total_price:{
        type:Number,
    },
    price:{
        type:Number,
    },
    amount:{
        type:Number
    },
    discount:{
        type:String
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
    },
    status:{
        type:Number,
        default:1
    },
    type:{
        type:Number,
        default:null
    }
  
},
{
    timestamps:true
});

//Export the model
module.exports = mongoose.model('Order', orderSchema);