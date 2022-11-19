const express = require('express')
const VehiculoController = require('../controllers/vehiculo.controller')

const router = express.Router()

router.route('/vehiculos')
  .get(VehiculoController.findCars)

router.route('/vehiculo')
  .post(VehiculoController.saveCar)
  .patch(VehiculoController.updateCar)
  .put(VehiculoController.deleteCar)

router.route('/vehiculo/:carId')
  .get(VehiculoController.findCarById)
module.exports = router