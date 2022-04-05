require('dotenv').config()

var amqp = require('amqplib/callback_api');
const amqpUrl = process.env.AMQP_URL

module.exports.consumeMessage = (queue, callback) => {
    amqp.connect(amqpUrl, function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }

            channel.assertQueue(queue, {
                durable: true
            });

            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

            channel.prefetch(1);
            
            channel.consume(queue, function (msg) {
                callback(msg.content.toString(), msg.properties);
            }, {
                noAck: true
            })
        });
    });
}