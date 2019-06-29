import mongoose from '../services/mongoose';

const { Schema } = mongoose;
const Message = mongoose.model('Message', new Schema({
  author: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, required: true },
}));

export default Message;
