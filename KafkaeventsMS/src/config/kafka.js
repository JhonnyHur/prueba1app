const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'vehicle-events-consumer',
    brokers: ['localhost:9092'],  // Cambia esto según tu configuración de Kafka
});

const consumer = kafka.consumer({ groupId: 'vehicle-group' });

// Conectar al consumidor y suscribirse al topic
const connectKafka = async () => {
    await consumer.connect();
    console.log('Conectado a Kafka');

    await consumer.subscribe({ topic: 'vehicle-events', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const event = JSON.parse(message.value.toString());
            console.log('Evento recibido:', event);
            // Aquí puedes llamar a la función que guarda los eventos en MongoDB o cualquier otro procesamiento necesario
        },
    });
};

module.exports = connectKafka;
