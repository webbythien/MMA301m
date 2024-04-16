const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var categorySchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        require:true
    },
    description:{
        type:String,
        default:'This is description'
    },
    status:{
        type:Boolean
    }
},{
    timestamps:true
});

//Export the model
module.exports = mongoose.model('Category', categorySchema);