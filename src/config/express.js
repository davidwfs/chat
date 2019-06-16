import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import socket from 'socket.io';

import log from '../services/winston';
import value from '../routes/value';

const app = express();
const server = http.Server(app);
const io = socket(server);

app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined', {
  stream: { write: msg => log.info(msg) },
}));

app.use('/value', value);

export default server;
