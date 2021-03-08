const User = require('../models/user');
const User_token = require('../models/User_token');
const bcrypt =  require('bcrypt');
const jwt = require('jsonwebtoken');
const authService = require('../services/auth');
require('dotenv').config()


async function login(req, res) {
    const user = await User.findOne({ user_name: req.body.user_name}, function(err, user){
        if(err){
            console.log(err)
            return res.send("error");
        }
    })
    if (!user){
        return res.send("Incorect username");
    }
    const username = req.body.user_name
    const curentuser = {user_name: username}
    await bcrypt.compare(req.body.password, user.password, function(err, result){
        if(err){
            return res.sendStatus(500);
        }
        if(result== true){
            const accessToken = generateAccessToken(curentuser)
            const refreshToken = jwt.sign(curentuser, process.env.REFRESH_TOKEN_SECRET)
    
            const user_token = new User_token({
                user_name: username,
                refresh_token: refreshToken
            })
            user_token.save()
            .then((result)=>{
                return result;
            })
            .catch((err)=>{
                console.log(err)
            })
    
            return res.json({accessToken: accessToken, refreshToken: refreshToken})
        }else{
            res.send("incorect password");
        }
        

    })  
};

function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKE_SECRET, {expiresIn: '10m'});
}

async function refreshToken(req, res){
    const refreshToken = req.body.token
    if(refreshToken == null) return res.sendStatus(401)
    User_token.findOne({ refresh_token: refreshToken})
    .then((result)=>{
        if(!refreshToken == result.refresh_token)return res.sendStatus(403)
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user)=>{
            if(err) return res.sendStatus(403)
            const accessToken = generateAccessToken({name: user.user_name})
            res.json({accessToken: accessToken})
        }) 
    })
    .catch((err)=>{
        console.log(err)
    })
}

async function logout(req, res){
    const refreshToken = req.body.token
    await User_token.deleteOne({refresh_token: refreshToken}, function (err) {
        if (err) return handleError(err);
        return res.sendStatus(200)
    });
}

module.exports = { 
    login,
    refreshToken,
    logout
 }