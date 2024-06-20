const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const foodBillSchema=new Schema({
    foodItem:[{
        item:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        quantity:{
            type:Number,
            required:true
        },
        total:{
            type:Number,
            required:true
        },
        
}],
foodCategory:{
    type:String,
    
},
foodRate:{
    type:String,
    required:true
},
sgst:{
    type:String,
    required:true
},
cgst:{
    type:String,
    required:true
},roomBilling:{
    type:Number,
    
},totalBilling:{
    type:Number,
    required:true
},createdAt:{
    type:Date,
    default:Date.now,
    get: function(date) {
        // Format date as dd-mm-yy
        return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
      }
}

})
module.exports = (connection) => {
    return connection.model('FoodBill', foodBillSchema);
};