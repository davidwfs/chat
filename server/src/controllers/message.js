import Message from '../models/message';

export default {

  async get(req, res) {
    const messages = await Message.find();

    res.status(200).send(messages);
  },

  async post(req, res) {
    const { io } = req;
    const { content, author } = req.body;
    const date = new Date().getTime();
    const message = new Message({ author, content, date });

    try {
      const registredMessage = await message.save();
      io.emit('postMessage', registredMessage);
      res.send(registredMessage);
    } catch (error) {
      res.status(500).send();
    }
  },

};
