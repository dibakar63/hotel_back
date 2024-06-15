const mongoose=require('mongoose');
const Schema=mongoose.Schema
const foodRegister=new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    rate:{
        type:Number,
        required:true
    },
    sgst:{
        type:Number,
        required:true
    },
    cgst:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    foodCategory:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    foodImage:{
        type:String,
        required:true
    }
})


module.exports = (connection) => {
    return connection.model('Food', foodRegister);
};