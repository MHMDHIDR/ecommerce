import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import db from '../../helpers/db.js'
import { genSalt, hash } from 'bcryptjs'
import generateToken from '../../helpers/generateToken.js'

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { username, tel, password } = req.body

  if (username === '' || tel === '' || password === '') {
    res.sendStatus(400)
    return
  }

  // Check if user exists
  const checkUserExistsQuery = `SELECT * FROM users WHERE username = '${username} OR phone = ${tel}'`

  const userExists = db.query(checkUserExistsQuery, (error: any, _data: any) => {
    return error
      ? res.status(500).json({
          itemAdded: 0,
          message: `عفواً حدث خطأ! ${error}`
        })
      : res.status(201).json({
          itemAdded: 1,
          message: 'تم اضافة المنتج بنجاح'
        })
  })

  if (userExists)
    return res
      .status(409)
      .json({ userAdded: 0, message: 'sorry this user is already registered' })

  // Hash password
  const salt = await genSalt(10)
  const hashedPassword = await hash(password, salt)

  // Create user
  const user = await UserModel.create({
    username,
    tel,
    password: hashedPassword
  })

  //if user is created successfully
  if (user) {
    res.status(201).json({
      _id: user.id,
      username,
      tel: user.tel,
      token: generateToken(user._id),
      userAdded: 1,
      message: 'تم التسجيل بنجاح 👍🏼 يمكنك تسجيل الدخول الآن'
    })
  } else {
    res.status(400).json({
      userAdded: 0,
      message: 'لم يتم تسجيل المستخدم!'
    })
  }
})
