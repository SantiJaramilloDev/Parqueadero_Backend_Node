const mongoose = require("mongoose")
const {Schema} = require('mongoose')

const usuarioSchemma = new Schema({
    nombre : {
        type : String,
        require : 'Ingrese solo texto'
    },
    apellido : {
        type : String,
        require : 'Ingrese solo texto'
    },
    documento : {
        type : String,
        trim : true,
        require : 'Ingrese solo numeros'
    },
    correo : {
        type : String,
        trim : true,
        require : 'Ingrese un correo valido'
    },
    clave : {
        type : String,
        trim : true,
        require : 'Ingrese 8 caracteres entre numeros y letras'
    },
    confirmarClave : {
        type : String,
        trim : true,
        require : 'Ingrese 8 caracteres entre numeros y letras'
    },
},{ timestamps: true})

const Usuario = mongoose.model('Usuario', usuarioSchemma)

module.exports = Usuario