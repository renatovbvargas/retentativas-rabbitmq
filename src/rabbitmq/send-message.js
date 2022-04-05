require('dotenv').config()

const amqp = require('amqplib/callback_api');
const amqpUrl = process.env.AMQP_URL

module.exports.sendMessage = (queue, msg, options) => {
    amqp.connect(amqpUrl, function (error0, connection) {

        if (error0) {
            throw error0;
        }

        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }

            channel.sendToQueue(queue, Buffer.from(msg), options);

        });

        setTimeout(function () {
            connection.close();
        }, 500);
    });
} 
