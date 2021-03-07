const Ticket = require('../models/tickets');
const User_tickets = require('../models/user_tickets');
const User = require('../models/user');


async function createTickets(req) {
    const ticket = new Ticket({
        transport_company: req.body.transport_company,
        starting_point: req.body.starting_point,
        destination: req.body.destination,
        departure_time: req.body.departure_time,
        arrival_time: req.body.arrival_time,
        price: req.body.price,
        number_of_tickets: req.body.number_of_tickets
    })
    ticket.save()
        .then((result)=>{
            return result;
        })
        .catch((err)=>{
            console.log(err)
        })

};

 async function getAllTickets(){
    try{
        const tickets = await Ticket.find()
        return tickets
    }
    catch(err){
       console.log( err)
    }
    
}

async function buy_ticket(req){
    try{
        const ride_id= req.body.ride_id
        const user_id = req.body.user_id
        const credit_curd_number = req.body.credit_curd_number
        const tickets = await Ticket.findOne({_id: ride_id})
        if (tickets.departure_time > Date.now() ){
            return "the bus has departed"
        }
        if (tickets.number_of_tickets == 0){
            return "there are no more available tickets for this ride"
        }
        var remaining_tickets = tickets.number_of_tickets -1;
        await Ticket.findOneAndUpdate({_id: ride_id}, {number_of_tickets: remaining_tickets}, (err, data)=>{
            if(err){
                return err
            }
        });
        const user_ticket = new User_tickets({
            user_id: user_id,
            ride_id: ride_id,
            departure_time: tickets.departure_time,
        })
        var purchase_resault = await user_ticket.save()
        .then((result)=>{
            const msg ="your ticket has been purchased";
            return msg
        })
        .catch((err)=>{
            return err
        })
        return purchase_resault
    }
    catch(err){
       console.log( err)
    }
}

async function refundTicket(req){
    try{
        const ticket_id= req.body.ticket_id
        const user_id = req.body.user_id
        const ticket = await User_tickets.findOne({_id: ticket_id})
        if (ticket == null){
            const msg ="ticket does not exist";
            return msg
        }
        const ride = await Ticket.findOne({_id: ticket.ride_id})
        ticket.departure_time.setHours(ticket.departure_time.getHours() - 1);
        if (ticket.departure_time > Date.now() ){
            return "It is too late to refund your ticket"
        }
        const ticket_delete = await User_tickets.deleteOne({_id: ticket_id}, (err, doc)=> {
            if(err){
                return err;
            }
        });
        var remaining_tickets = ride.number_of_tickets +1;
        await Ticket.findOneAndUpdate({_id: ticket.ride_id}, {number_of_tickets: remaining_tickets}, (err, data)=>{
            if(err){
                console.log(err)
                return err
            }
        });

        if(ticket_delete != null){
            const msg ="ticket has been refunded";
            return msg
        }
    }
    catch(err){
       console.log( err)
    }
}

module.exports = {
    createTickets, 
    getAllTickets,
    buy_ticket,
    refundTicket
}

