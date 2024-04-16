const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var Qr_DetailSchema = new mongoose.Schema({
   
    qr_id:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'Qr'
    },
    details:{
        type:String,

    },
    status:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true
});

//Export the model
module.exports = mongoose.model('Qr_Detail', Qr_DetailSchema);