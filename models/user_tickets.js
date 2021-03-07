const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user_ticketsSchema= new Schema({
    user_id: {
        type: String,
        required: true
    },
    ride_id: {
        type: String,
        required: true
    },
    departure_time: {
        type: Date,
        required: true
    },
}, {timestamps: true});

const User_tickets = mongoose.model('user_tickets', user_ticketsSchema);

module.exports = User_tickets;