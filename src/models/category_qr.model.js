const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var Category_qrSchema = new mongoose.Schema({
    category_id:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        index:true,
        ref:'Category'
    },
    qr_id:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        index:true,
        ref:'Qr'

    },
    status:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true
});

//Export the model
module.exports = mongoose.model('Category_qr', Category_qrSchema);