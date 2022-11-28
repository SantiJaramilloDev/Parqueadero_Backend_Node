const express = require('express')
const UsuarioController = require('../controllers/usuario.controller.js')

const router = express.Router()

router.route('/usuarios')
  .get(UsuarioController.findUsers)
  .post(UsuarioController.saveUsers)
  .patch(UsuarioController.updateUser)
  .put(UsuarioController.deleteUser)

  router.route('/usuario/:usuarioId')
  .get(UsuarioController.findUserById)

module.exports = router