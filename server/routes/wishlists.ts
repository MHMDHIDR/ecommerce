import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { paginatedResults } from '../middlewares/paginatedResults.js'
import {
  addToWishlist,
  deleteFromWishlist,
  getWishlists
} from '../controllers/wishlists/index.js'

const router = express.Router()

router.post('/:id', authMiddleware, addToWishlist)
router.delete('/:id', authMiddleware, deleteFromWishlist)
router.get('/:page?/:limit?', authMiddleware, paginatedResults('wishlists'), getWishlists)

export default router
