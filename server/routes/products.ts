import express from 'express'
import { getProduct, getProducts, addProduct } from '../controllers/products.js'

const router = express.Router()

router.get('/:id', getProduct)
router.get('/', getProducts)
router.post('/', addProduct)

export default router
