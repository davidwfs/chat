import express from 'express';
import value from '../controllers/lib';

const router = express.Router();

router.get('/socket.js', value.socket);

export default router;
