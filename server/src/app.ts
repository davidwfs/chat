import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import http from 'http'
import morgan from 'morgan'

import message from './routes/message'
import { initSocket } from './services/socket'
import log from './services/winston'

const app = express()
const server = new http.Server(app)
const port = process.env.port || 5000

initSocket(server)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('combined', {
  stream: { write: msg => log.info(msg) },
}))

app.use('/message', message)

server.listen(port, () => log.info(`Server run in port ${port}.`))
