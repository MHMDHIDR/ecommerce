import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import {
  getUsers,
  signupUser,
  loginUser,
  signupSupplier,
  loginSupplier,
  signupAdmin,
  loginAdmin,
  forgotPass,
  resetPass,
  updateUser,
  deleteUser
} from '../controllers/users/index.js'

const router = express.Router()

router.get('/:id?', authMiddleware, getUsers)
router.post('/signup', signupUser)
router.post('/login', loginUser)
router.post('/signup-supplier', signupSupplier)
router.post('/login-supplier', loginSupplier)
router.post('/signup-admin', signupAdmin)
router.post('/login-admin', loginAdmin)
router.post('/forgotpass', forgotPass)
router.post('/resetpass', resetPass)
router.patch('/:id', authMiddleware, updateUser)
router.delete('/:id', authMiddleware, deleteUser)

export default router
