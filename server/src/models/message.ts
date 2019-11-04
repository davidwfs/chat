import mongoose from '../services/mongoose'

interface IMessage extends mongoose.Document {
  author: string
  content: string
  date: string
}

const { Schema } = mongoose
export const Message = mongoose.model<IMessage>('Message', new Schema({
  author: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, required: true },
}))
