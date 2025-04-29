const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    idVehiculo: String,
    marca: String,
    anio: Number,
    modelo: String,
    // Agrega los otros campos que necesites
    estado: String,
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

const saveVehicleEvent = async (event) => {
    const vehicle = new Vehicle(event);
    await vehicle.save();
    console.log('Vehículo guardado en MongoDB');
};

module.exports = { saveVehicleEvent };
