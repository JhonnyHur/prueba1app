const express = require('express');
const mongoose = require('mongoose');
const connectKafka = require('./config/kafka');
const { processVehicleEvent } = require('./controllers/kafkaController');

const app = express();

// Conexión con MongoDB
mongoose.connect('mongodb://localhost:27017/vehiculos-db', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error de conexión a MongoDB:', err));

// Conectar a Kafka (se asegura de que Kafka esté conectado antes de iniciar el servidor)
const startServer = async () => {
    await connectKafka();  // Espera que Kafka se conecte
    app.listen(4010, () => {
        console.log('Microservicio KafkaEventsMS ejecutándose en el puerto 4010');
    });
};

// Si quieres exponer una ruta para comprobar el estado del microservicio (opcional)
app.get('/health', (req, res) => {
    res.status(200).send('Kafka Event Service is running');
});

startServer();
