require('dotenv').config()

const express = require('express')
const { sendMessage } = require('./rabbitmq/send-message')

const queue = process.env.QUEUE

const app = express()

app.get('/producer/:n', function (req, res) {
    const { n } = req.params

    for (let i = 1; i <= n; i++) {
        const msg = JSON.stringify({ date: new Date().toISOString(), message: `Mensagem ${i}` })
        sendMessage(queue, msg)
    }

    res.send(`gerou ${n} mensagens`)
})


app.listen(3000)