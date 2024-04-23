const mongoose = require('mongoose'); // Erase if already required
const paginate  = require('../plugin/paginate.plugin');

// Declare the Schema of the Mongo model
var QrSchema = new mongoose.Schema({
name:{
    type:String,
    unique:true,
    index:true,
    required:true
},
price:{
    type:Number
},
status:{
    type:Number,
    default:1
},
amount:{
    type:Number
},
expire_date:{
    type:String
},
image_url:{
    type:String
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

QrSchema.plugin(paginate);

//Export the model
module.exports = mongoose.model('Qr', QrSchema);