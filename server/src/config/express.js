import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import socket from 'socket.io';

import log from '../services/winston';
import message from '../routes/message';
import lib from '../routes/lib';


const app = express();
const server = http.Server(app);
const io = socket(server);
const isProduction = process.env.NODE_ENV === 'production';
const rootFolder = __dirname.replace(`/${isProduction ? 'dist' : 'src'}/config`, '');

app.use((req, res, next) => {
  req.io = io;
  req.rootFolder = rootFolder;
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined', {
  stream: { write: msg => log.info(msg) },
}));

app.use(express.static(`${rootFolder}/${isProduction ? 'dist' : 'src'}/public`));
app.use('/message', message);
app.use('/lib', lib);

export default server;