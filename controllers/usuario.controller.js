const Usuario = require('../models/usuario.model.js')

class UsuarioController {

    static async findUsers(req, res) {
        try {
          const usuarios = await Usuario.find()
          res.status(200).json(usuarios)
        } catch (error) {
          return res.status(400).json(error)
        }
      }
    
    static async saveUsers(req, res) {
        const { nombre, apellido, documento, correo, clave, confirmarClave } = req.body
        try {
          const findUsuario = await Usuario.findOne({nombre : nombre, apellido : apellido, documento : documento, correo: correo, clave : clave, confirmarClave : confirmarClave})
          if (findUsuario) return res.status(200).json(findUsuario)
          const newUser = new Usuario({ nombre, apellido, documento, correo, clave, confirmarClave})
          await newUser.save().catch(error => {
            return res.status(400).json(error.message)
          })
          return newUser    
        } catch (error) {
            return res.status(400).json(error)
          }
    }

    static async findUserById(req, res) {
        const { usuarioId } = req.params
        try {
          const findUsuario = await Usuario.findOne({ _id: usuarioId })
          return res.status(200).json(findUsuario)
        } catch (error) {
          return res.status(400).json(error)
        }
    }

    static async updateUser(req, res) {
        const { usuarioId, nombre, apellido, documento, correo, clave, confirmarClave  } = req.body
        try {
          const updateUsuario = await Usuario.findByIdAndUpdate({ _id: usuarioId }, { nombre, apellido, documento, correo, clave, confirmarClave }, { new: true })
          return res.status(200).json(updateUsuario)
        } catch (error) {
          return res.status(400).json(error)
        }
    }

    static async deleteUser(req, res) {
        const { usuarioId } = req.body
        try {
          const deleteUsuario = await Usuario.deleteOne({ id: usuarioId })
          return res.status(200).json(deleteUsuario)
        } catch (error) {
          return res.status(400).json(error)
        }
    }
}

module.exports = UsuarioController