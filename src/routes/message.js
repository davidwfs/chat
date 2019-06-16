import express from 'express';
import value from '../controllers/message';

const router = express.Router();

router.get('/', value.get);
router.post('/', value.post);

export default router;
