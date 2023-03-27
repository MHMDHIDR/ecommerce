import express from 'express'
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

router.get('/:id?', getUsers)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/forgotpass', forgotPass)
router.post('/resetpass', resetPass)
router.patch('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router
