const { type } = require('express/lib/response')
const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const customerModel=new Schema({
    name:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    phoneNo:{
        type:String,
        required:true
    },
    adhar:{
        type:String,
        required:true
    },
    village:{
        type:String,
        required:true
    },
    post:{
        type:String,
        required:true
    },
    police:{
        type:String,
        required:true
    },
    district:{
        type:String,
        required:true
    },
    celebration:{
        type:String,
        required:true
    },
    groundHall:{
        type:String,
        required:true
    },
    firstFloor:{
        type:String,
        required:true
    },
    checkIn:{
       
        type:Date,
    default:Date.now,
    get: function(date) {
        // Format date as dd-mm-yy
        return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
      },
        required:true
    },
    checkOut:{
        type:Date,
        default:Date.now,
        get: function(date) {
            // Format date as dd-mm-yy
            return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
          }
    },
    total:{
        type:Number,
        required:true
    },
    advance:{
        type:Number,
        required:true
    },
    due:{
        type:Number,
        required:true
    },
    stall:{
        type:String,
        required:true
    },
    electricity:{
        type:String,
        required:true
    },
    coffee:{
        type:String,
        required:true
    },
    generator:{
        type:String,
        required:true
    },

})

module.exports = (connection) => {
    return connection.model('Customer', customerModel);
};
