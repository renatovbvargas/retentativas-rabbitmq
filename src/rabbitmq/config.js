require('dotenv').config()

var amqp = require('amqplib/callback_api');

const amqpUrl = process.env.AMQP_URL

const exchange = process.env.EXCHANGE

const queue = process.env.QUEUE
const queueOK = process.env.QUEUE_OK
const queueDLX = process.env.QUEUE_DLX
const queueERROR = process.env.QUEUE_ERROR

amqp.connect(amqpUrl, function (error0, connection) {

    if (error0) {
        throw error0;
    }

    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }

        channel.assertExchange(exchange, 'direct', { durable: true });

        channel.assertQueue(queue, { durable: true });
        channel.assertQueue(queueOK, { durable: true });
        channel.assertQueue(queueERROR, { durable: true });

        channel.assertQueue(queueDLX, { durable: true, deadLetterExchange: exchange, deadLetterRoutingKey: queue });

        channel.bindQueue(queue, exchange, queue)

    })

    setTimeout(function () {
        connection.close();
        process.exit(0);
    }, 500)
});
