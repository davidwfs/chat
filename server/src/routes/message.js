import express from 'express';
import message from '../controllers/message';

const router = express.Router();

router.get('/', message.get);
router.post('/', message.post);

export default router;
