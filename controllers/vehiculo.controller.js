const Vehiculo = require('../models/vehiculo.model.js')

class VehiculoController {

  static async findCars(req, res) {
    try {
      const cars = await Vehiculo.find()
      res.status(200).json(cars)
    } catch (error) {
      return res.status(400).json(error)
    }

  }

  static async saveCar(req, res) {
    const { placa, tipoVehiculo } = req.body
    try {
      const findCar = await Vehiculo.findOne({ placa: placa })
      if (findCar) return res.status(200).json(findCar)
      const newCar = new Vehiculo({ placa, tipoVehiculo })
      await newCar.save().catch(error => {
        return res.status(400).json(error.message)
      })
      return newCar
    } catch (error) {
      return res.status(400).json(error)
    }

  }

  static async findCarById(req, res) {
    const { carId } = req.params
    try {
      const findCar = await Vehiculo.findOne({ _id: carId })
      return res.status(200).json(findCar)
    } catch (error) {
      return res.status(400).json(error)
    }

  }

  static async updateCar(req, res) {
    const { placa, tipoVehiculo, carId } = req.body
    try {
      const updateCar = await Vehiculo.findByIdAndUpdate({ _id: carId }, { placa, tipoVehiculo })
      return res.status(200).json(updateCar)
    } catch (error) {
      return res.status(400).json(error)
    }

  }

  static async deleteCar(req, res) {
    const { carId } = req.body
    try {
      const deleteCar = await Vehiculo.deleteOne({ id: carId })
      return res.status(200).json(deleteCar)
    } catch (error) {
      return res.status(400).json(error)
    }

  }
}

module.exports = VehiculoController