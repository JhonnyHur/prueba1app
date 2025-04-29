const express = require('express');
const commandsController = require('./controllers/commandsController');
const morgan = require('morgan');
const { connectKafka } = require('./config/kafka'); // Importa la configuración de Kafka
const app = express();

// Conectar a Kafka
connectKafka().then(() => {
    console.log('Kafka está listo.');
}).catch((error) => {
    console.error('Error al conectar con Kafka:', error);
});

app.use(morgan('dev'));
app.use(express.json());

// Usar el controlador de comandos
app.use(commandsController);

// Iniciar el servidor
app.listen(4005, () => {
    console.log('Microservicio "Vehiculos - Comandos" ejecutándose en el puerto 4005');
});
