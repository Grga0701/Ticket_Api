const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema= new Schema({
    transport_company: {
        type: String,
        required: true
    },
    starting_point: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    departure_time: {
        type: Date,
        required: true
    },
    arrival_time: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    number_of_tickets: {
        type: Number,
        required: true
    }
}, {timestamps: true});

const Ticket = mongoose.model('ticket', ticketSchema);

module.exports = Ticket;