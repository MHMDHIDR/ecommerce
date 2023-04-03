import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { paginatedResults } from '../middlewares/paginatedResults.js'
import {
  getOrder,
  getOrders,
  updateOrder,
  deleteOrder,
  addOrder
} from '../controllers/orders/index.js'

const router = express.Router()

router.get('/:id', getOrder)
router.get('/:page?/:limit?', authMiddleware, paginatedResults('orders'), getOrders)
router.patch('/:id', authMiddleware, updateOrder)
router.delete('/:id', authMiddleware, deleteOrder)
router.post('/', authMiddleware, addOrder)

export default router
