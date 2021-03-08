const express = require('express');
const router = express.Router()
const ticketsService = require('../services/tickets');
const authService = require('../services/auth');


router.post('/api/createTickets', authService.authenticateToken, async (req, res)=>{
    try {
        ticketsService.createTickets(req);
        res.send('ticket has been created')
    } catch (error) {
        res.status(500).send(error)
    }

});

router.get('/api/all_tickets', async (req, res)=>{
    try {
        var tickets= await ticketsService.getAllTickets();
        res.send(tickets)
    } catch (error) {
        res.status(500).send(error)
    }
});

router.post('/api/buy_ticket', authService.authenticateToken, async (req, res)=>{
    try {
        var status= await ticketsService.buy_ticket(req);
        res.send(status)
    } catch (error) {
        res.status(500).send(error)
    }
});

router.post('/api/refund_ticket', authService.authenticateToken, async (req, res)=>{
    try {
        var status= await ticketsService.refundTicket(req);
        res.send(status)
    } catch (error) {
        res.status(500).send(error)
    }
});


module.exports = router