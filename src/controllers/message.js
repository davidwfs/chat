const messages = ['v1', 'v2', 'v3'];

export default {

  get(req, res) {
    res.status(200).send(messages);
  },

  post(req, res) {
    const { io } = req;
    const { message } = req.body;

    messages.push(message);
    io.emit('postMessage', message);
    res.send(message);
  },

};
