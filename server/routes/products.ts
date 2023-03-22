import express from 'express'
import {
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  addProduct
} from '../controllers/products'

const router = express.Router()

router.get('/:id', getProduct)
router.get('/', getProducts)
router.patch('/:id', updateProduct)
router.delete('/:id', deleteProduct)
router.post('/', addProduct)

export default router
