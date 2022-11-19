const mongoose = require("mongoose")
const {Schema} = require('mongoose')

const vehiculoSchemma = new Schema({
    placa : {
        type: String,
        trim : true,
        require : 'La placa es obligatoria'
    },
    tipoVehiculo : {
        type : String,
        require : 'Seleccione un tipo de vehiculo'
    }
},{ timestamps: true})

const Vehiculo = mongoose.model('Vehiculo', vehiculoSchemma)

module.exports = Vehiculo