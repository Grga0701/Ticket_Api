const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema= new Schema({
    user_name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
    credit_card: {
        type: Number, 
        min: 16,
        required: true
    }
}, {timestamps: true});

const User = mongoose.model('user', userSchema);

module.exports = User;