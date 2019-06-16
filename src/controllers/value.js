const values = ['v1', 'v2', 'v3'];

export default {

  get(req, res) {
    const { io } = req;

    io.emit('hi');
    res.status(200).send(values);
  },

  post(req, res) {
    const { io } = req;
    const { value } = req.body;

    values.push(value);
    io.emit('postValue', value);
    res.send(value);
  },

};
