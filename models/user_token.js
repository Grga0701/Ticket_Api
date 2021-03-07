const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user_tokenSchema= new Schema({
    user_name: {
        type: String,
        required: true
    },
    refresh_token: {
        type: String,
        required: true
    }
}, {timestamps: true});

const User_token = mongoose.model('user_token', user_tokenSchema);

module.exports = User_token;