const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const roomBillSchema=new Schema({
    
    name:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    
    address:{
        type:String,
        required:true
    },
    phoneNo:{
        type:String,
        required:true
    },
    gstNo:{
        type:String,
    },
    checkIn:{
        type:String,
        required:true
    },
    checkInTime:{
        type:String,
        
    },
    checkOut:{
        type:String,
        required:true
    },
    checkOutTime:{
        type:String,
        
    },
    roomNo:{
        type:String,
        required:true
    },
    floorNo:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    ac:{
        type:String,
        required:true
    },
    rate:{
        type:String,
        required:true
    },
    cgst:{
        type:String,
        
    },
    sgst:{
        type:String,
        
    },
    total:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    
})
module.exports = (connection) => {
    return connection.model('RoomBill', roomBillSchema);
};