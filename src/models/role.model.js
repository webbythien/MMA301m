const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var roleSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
     
    },
    status:{
        type:Number,
     default:1
       
    }
});

//Export the model
module.exports = mongoose.model('Role', roleSchema);