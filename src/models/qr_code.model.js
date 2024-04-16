const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var Qr_codeSchema = new mongoose.Schema({
    qr_id:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'Qr'
    },
    data:{
        type:String,

    },
    status:{
        type:Boolean,
        default:false
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