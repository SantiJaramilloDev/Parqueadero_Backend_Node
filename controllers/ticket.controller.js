const Ticket = require('../models/ticket.model.js')
const moment = require('moment')

class TicketController {

  static async findTickets(req, res) {
    try {
      const tickets = await Ticket.find()
      res.status(200).json(tickets)
    } catch (error) {
      return res.status(400).json(error)
    }

  }

  static async saveTicket(req, res) {
    const { placa, tipoVehiculo } = req.body
    try {
      const findTicket = await Ticket.findOne({ placa: placa, pagado: false })
      if (findTicket) return res.status(200).json(findTicket)
      const horaEntrada = new Date()
      const newTicket = new Ticket({ placa, tipoVehiculo, horaEntrada, pagado: false })
      await newTicket.save().catch(error => {
        return res.status(400).json(error.message)
      })
      return newTicket
    } catch (error) {
      return res.status(400).json(error)
    }

  }

  static async findTicketById(req, res) {
    const { ticketId } = req.params
    try {
      const findTicket = await Ticket.findOne({ _id: ticketId })
      return res.status(200).json(findTicket)
    } catch (error) {
      return res.status(400).json(error)
    }

  }

  static async updateTicket(req, res) {
    const { placa, tipoVehiculo, ticketId } = req.body
    try {
      const updateTicket = await Ticket.findByIdAndUpdate({ _id: ticketId }, { placa, tipoVehiculo }, { new: true })
      return res.status(200).json(updateTicket)
    } catch (error) {
      return res.status(400).json(error)
    }

  }

  static async deleteTicket(req, res) {
    const { carId } = req.body
    try {
      const deleteTicket = await Ticket.deleteOne({ id: carId })
      return res.status(200).json(deleteTicket)
    } catch (error) {
      return res.status(400).json(error)
    }

  }

  static async payTicket(req, res){
    const { ticketId } = req.body
    try {
    const ticketEncontrado = await Ticket.findOne( {ticketId} )
    if (ticketEncontrado) {
      const horaEntrada = moment(ticketEncontrado.horaEntrada)
      const horaSalida = moment()
      const diferencia = horaSalida.diff(horaEntrada,'m')
      const tarifa = ticketEncontrado.tipoVehiculo === 'CARRO' ? 75 : 50 
      const total = tarifa * diferencia 
      const ticketPagado = await Ticket.findByIdAndUpdate({_id : ticketId}, {pagado: true, horaSalida, minutos: diferencia, totalaPagar: total}, {new : true})
      return res.status(200).json(ticketPagado)
      }
    } catch (error) {
      return res.status(400).json(error)
    }
  } 
}

module.exports = TicketController