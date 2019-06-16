export default {

  get(req, res) {
    const { io } = req;
    io.emit('hi');
    res.status(200).send(['v1', 'v2', 'v3']);
  },

};
