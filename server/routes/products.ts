import express from 'express'
import {
  getProduct,
  getProducts,
  updateProduct,
  addProduct
} from '../controllers/products.js'

const router = express.Router()

router.get('/:id', getProduct)
router.get('/', getProducts)
router.patch('/:id', updateProduct)
router.post('/', addProduct)

export default router
