export default {

  socket(req, res) {
    res.type('text/javascript');
    res.sendFile(`${req.rootFolder}/node_modules/socket.io-client/dist/socket.io.js`);
  },

};
