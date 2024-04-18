const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var Qr_codeSchema = new mongoose.Schema({
    qr_id:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'Qr'
    },
    used:{
        type:Number,
        default:0
    },
    img:{
        type:String,
    },
    amount:{
        type:Number,
    },
    status:{
        type:Number,
        default:1
    },
    code:{
        type:String,
    }
},
{
    timestamps:true
});

//Export the model
module.exports = mongoose.model('Qr_code', Qr_codeSchema);