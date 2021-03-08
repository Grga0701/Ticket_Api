const express = require('express');
const loginService = require('../services/login');
const router = express.Router()
require('dotenv').config()


router.post('/api/login',  async (req, res)=>{
    try {
        await loginService.login(req, res);
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
});

router.post('/api/token', async (req, res)=>{
    try {
        await loginService.refreshToken(req, res);
    } catch (error) {
        res.sendStatus(500);
    }
});

router.post('/api/logout', async (req, res)=>{
    try {
        await loginService.logout(req, res);
    } catch (error) {
        res.sendStatus(500);
    }
});

module.exports = router
