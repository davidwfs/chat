import mongoose from '../services/mongoose';

const { Schema } = mongoose;
const Message = mongoose.model('Message', new Schema({
  content: { type: String, required: true },
}));

export default Message;
