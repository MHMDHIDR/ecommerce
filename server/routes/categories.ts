import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { paginatedResults } from '../middlewares/paginatedResults.js'
import {
  getCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  addCategory
} from '../controllers/categories/index.js'

const router = express.Router()

router.get('/:id', getCategory)
router.get('/:page?/:limit?', paginatedResults('categories'), getCategories)
router.patch('/:id', authMiddleware, updateCategory)
router.delete('/:id', authMiddleware, deleteCategory)
router.post('/', authMiddleware, addCategory)

export default router
