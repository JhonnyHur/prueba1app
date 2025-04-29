const { Kafka } = require('kafkajs');

// Configuración de Kafka
const kafka = new Kafka({
    clientId: 'vehiculos-ms',       // Nombre del cliente
    brokers: ['localhost:9092'],    // Asegúrate de que Kafka esté en este puerto
});

// Crear un productor de Kafka
const producer = kafka.producer();

// Conectar el productor
async function connectKafka() {
    await producer.connect();
    console.log('Kafka Producer conectado');
}

// Función para enviar mensajes
async function sendEvent(topic, message) {
    await producer.send({
        topic: topic,
        messages: [{ value: JSON.stringify(message) }],
    });
}

module.exports = { connectKafka, sendEvent };
