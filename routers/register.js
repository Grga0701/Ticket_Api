const express = require('express');
const router = express.Router()
const registerService = require('../services/register');


router.post('/api/register', async (req, res)=>{
    try {
        registerService.register(req);
        res.send('user has been saved')
    } catch (error) {
        res.status(500).send(error)
    }

});


module.exports = router