import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { paginatedResults } from '../middleware/paginatedResults.js'
import {
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  addProduct
} from '../controllers/products/index.js'

const router = express.Router()

router.get('/:id', getProduct)
router.get('/:page?/:limit?', paginatedResults('products'), getProducts)
router.patch('/:id', authMiddleware, updateProduct)
router.delete('/:id', authMiddleware, deleteProduct)
router.post('/', authMiddleware, addProduct)

export default router
