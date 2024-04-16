const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var QrSchema = new mongoose.Schema({
name:{
    type:String,
    unique:true,
    index:true,
    required:true
},
price:{
    type:String
},
status:{
    type:Boolean,
    default:true
},
expire_date:{
    type:String
},
price:{
    type:String,

},
approve_by:{
    require:true,
    type:mongoose.Schema.Types.ObjectId,
    index:true,
    ref:'User'

},
host_id:{
    require:true,
    type:mongoose.Schema.Types.ObjectId,
    index:true,
    ref:'User'
    
}
});

//Export the model
module.exports = mongoose.model('Qr', QrSchema);