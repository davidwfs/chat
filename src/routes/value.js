import express from 'express';
import value from '../controllers/value';

const router = express.Router();

router.get('/', value.get);

export default router;
