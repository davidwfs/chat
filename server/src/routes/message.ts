import express from 'express'
import { get, post } from '../controllers/message'

const router = express.Router()

router.get('/', get)
router.post('/', post)

export default router
