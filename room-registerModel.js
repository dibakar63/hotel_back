const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const roomRegisterSchema=new Schema({
    roomNo:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    category:{
        type:String,
        require:true
    },
    ac:{
        type:String,
        require:true
    },
    rate:{
        type:Number,
        require:true
    },
    sgst:{
        type:Number,
        require:true
    },
    cgst:{
        type:Number,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    floorNo:{
        type:String,
        required:true
    },
    floorCategory:{
        type:String,
        required:true,
    },
    floorImage:{
        type:String,
        required:true
    },
    availability: { type: Boolean,default:true  }

})
module.exports = (connection) => {
    return connection.model('Room', roomRegisterSchema);
};