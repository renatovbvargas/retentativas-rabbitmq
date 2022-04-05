require('dotenv').config()

const { consumeMessage } = require('./rabbitmq/consume-message')
const { sendMessage } = require('./rabbitmq/send-message')

const queue = process.env.QUEUE
const queueOK = process.env.QUEUE_OK
const queueDLX = process.env.QUEUE_DLX
const queueERROR = process.env.QUEUE_ERROR

const expiration = process.env.MESSAGE_TTL
const maxAttempts = process.env.MAX_ATTEMPTS

const statusList = ['ok', 'erro', 'erro', 'erro']

consumeMessage(queue, (msg, properties) => {

    const status = statusList[Math.floor(Math.random() * statusList.length)]
    const msgObj = JSON.parse(msg)
    let attempt = properties?.headers?.attempt || 1

    if (status === 'ok') {
        const log = { date: new Date().toISOString(), attempt, status: 'ok' }
        msgObj.log = msgObj.log ? [...msgObj.log, log] : [log]
        sendMessage(queueOK, JSON.stringify(msgObj), { headers: { attempt } })
        return
    }

    if (attempt >= maxAttempts) {
        const log = { date: new Date().toISOString(), attempt, status: 'erro - última tentativa' }
        msgObj.log = msgObj.log ? [...msgObj.log, log] : [log]
        sendMessage(queueERROR, JSON.stringify(msgObj), { headers: { attempt } })
        return 
    }

    const log = { date: new Date().toISOString(), attempt, status: 'erro' }
    msgObj.log = msgObj.log ? [...msgObj.log, log] : [log]
    sendMessage(queueDLX, JSON.stringify(msgObj), { expiration, headers: { attempt: ++attempt } })
})