const mongoose = require("mongoose")
const {Schema} = require('mongoose')

const ticketSchemma = new Schema({
    placa : {
        type: String,
        trim : true,
        require : 'La placa es obligatoria'
    },
    tipoVehiculo : {
        type : String,
        require : 'Seleccione un tipo de vehiculo'
    },
    horaEntrada : {
        type : Date,
        require : 'Solo es permitido el formato fecha y hora'
    },
    horaSalida : {
        type : Date
    },
    totalaPagar : {
        type : Number
    },
    pagado : {
        type : Boolean
    },
    minutos : {
        type : Number
    }
},{ timestamps: true})

const Ticket = mongoose.model('Ticket', ticketSchemma)

module.exports = Ticket