const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const cashReciptSchema=new Schema({
    roomNo:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true,
    },
    phoneNo:{type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },

    cash:{
        type:Number,
        required:true
    }
},{timestamps:true})
module.exports=(connection)=>{
    return connection.model('CashRecieved',cashReciptSchema)
}