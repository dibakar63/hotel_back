// authModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    customerId: { type: String, required: true, unique: true },
    hotelName: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

module.exports = (connection) => {
    return connection.model('User', UserSchema);
};
