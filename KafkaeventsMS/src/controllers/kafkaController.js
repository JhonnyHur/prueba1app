const { saveVehicleEvent } = require('../models/mongoModel');

// Aquí puedes agregar funciones si necesitas exponer alguna ruta de API adicional, por ejemplo, para ver los eventos procesados o cualquier otra operación.

// Si necesitas exponer alguna ruta en este controlador
const processVehicleEvent = async (event) => {
    try {
        // Guardar el evento recibido en MongoDB
        await saveVehicleEvent(event);
        console.log('Evento procesado y guardado en MongoDB');
    } catch (error) {
        console.error('Error procesando evento:', error);
    }
};

// Si quieres exponer alguna ruta para monitorear la integración (opcional)
const healthCheck = (req, res) => {
    res.status(200).send('Kafka Event Service is running');
};

module.exports = { processVehicleEvent, healthCheck };
