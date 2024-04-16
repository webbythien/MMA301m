const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var paymentSchema = new mongoose.Schema({
    order_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Order',
      
        require:true
    }
 
},{
    timestamps:true
});

//Export the model
module.exports = mongoose.model('Payment', paymentSchema);