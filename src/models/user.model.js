const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
   
    password:{
        type:String,
        required:true,
    },
    status:{
        type:Boolean,
        default:true

    },
    gender:{
        type:String,
        default:null
    },
    role_id:{
        type:mongoose.Schema.Types.ObjectId,
        default:0,
        ref:'Role',
        default:new mongoose.Types.ObjectId('661c89332809b46ff4aebf7d')
    },
    priority:{
        type:Number,
        default:0

    },
    active:{
        type:Boolean,
        default:true
    },
    code:{
        type:String,
        default:null
    },
    exprire_code:{
        type:String,
        default:null
    }
},{
    timestamps:true
});

//Export the model
module.exports = mongoose.model('User', userSchema);