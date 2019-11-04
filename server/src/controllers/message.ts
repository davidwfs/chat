import { RequestHandler } from 'express'
import { Message } from '../models/message'
import { io } from '../services/socket'

export const get: RequestHandler = async (_, res) => {
  const messages = await Message.find()

  res.status(200).send(messages)
}

export const post: RequestHandler = async (req, res) => {
  const { content, author } = req.body
  const date = new Date().getTime()
  const message = new Message({ author, content, date })

  try {
    const registredMessage = await message.save()
    io.emit('postMessage', registredMessage)
    res.send(registredMessage)
  } catch (error) {
    res.status(500).send()
  }
}
