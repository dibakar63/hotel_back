const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HotelSchema = new Schema({
    hotelName: { type: String, required: true },
    location: { type: String, required: true },
    rooms: [{
        roomNumber: { type: Number, required: true },
        type: { type: String, required: true },
        price: { type: Number, required: true },
        availability: { type: Boolean, default: true }
    }],
    // Add other common fields for hotel data
});

module.exports = (connection) => {
    return connection.model('Hotel', HotelSchema);
};
