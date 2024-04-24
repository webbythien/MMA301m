const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var notificationSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    user_id:{
        require:true,
        type:mongoose.Schema.Types.ObjectId,
        index:true,
        ref:'User'
    },
    content:{
        type:String,
        require:true
    },
    status:{
        type:Boolean
    }
},{
    timestamps:true
});

//Export the model
module.exports = mongoose.model('Notification', notificationSchema);