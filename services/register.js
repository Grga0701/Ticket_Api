const User = require('../models/user');
const bcrypt =  require('bcrypt');


async function register(req) {
    if(req.body.password == "" || req.body.user_name == ""){
        var msg ="You didnt enter username or password";
        return msg;
    }
    
    const salt = await bcrypt.genSalt();
    const hashdPassword = await bcrypt.hash(req.body.password, salt)
    const user = new User({
        user_name: req.body.user_name,
        password: hashdPassword,
        email: req.body.email,
        status: req.body.status,
        credit_card: req.body.credit_card
    })
    user.save()
        .then((result)=>{
            return result;
        })
        .catch((err)=>{
            console.log(err)
        })
    msg ="You have been registerd";
    return msg;

};

module.exports = { register }
