const mongoose = require('mongoose'); // Erase if already required
const paginate  = require('../plugin/paginate.plugin');


// Declare the Schema of the Mongo model
var paymentSchema = new mongoose.Schema({
    order_id:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Order',
        require:true
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    total_price:{
        type:Number,
        require:true
    },
    url_payment:{
        type:String,
    },
    ref:{
        type:String,
    },
    status:{
        type:Number,
        default:1
    }
 
},{
    timestamps:true
});
paymentSchema.plugin(paginate);


//Export the model
module.exports = mongoose.model('Payment', paymentSchema);