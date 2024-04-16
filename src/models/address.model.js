const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var addressSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        index:true,
        require:true
    },
    address:{
        type:String,
        default:null

    },
    status:{
        type:Boolean,
        default:false
    }
},
{
    timestamps:true
});

//Export the model
module.exports = mongoose.model('Address', addressSchema);