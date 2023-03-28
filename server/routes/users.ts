import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import {
  getUsers,
  registerUser,
  loginUser,
  forgotPass,
  resetPass,
  updateUser,
  deleteUser
} from '../controllers/users/index.js'

const router = express.Router()

router.get('/:id?', authMiddleware, getUsers)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/forgotpass', forgotPass)
router.post('/resetpass', resetPass)
router.patch('/:id', authMiddleware, updateUser)
router.delete('/:id', authMiddleware, deleteUser)

export default router
