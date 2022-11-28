const express = require('express')
const TicketController = require('../controllers/ticket.controller')

const router = express.Router()

router.route('/tickets')
  .get(TicketController.findTickets)
  .post(TicketController.saveTicket)
  .patch(TicketController.updateTicket)
  .put(TicketController.deleteTicket)

router.route('/ticket')
  .post(TicketController.payTicket)

router.route('/ticket/:ticketId')
  .get(TicketController.findTicketById)
  
module.exports = router