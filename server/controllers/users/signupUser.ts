import { Request, Response } from 'express'
import { randomUUID } from 'crypto'
import asyncHandler from 'express-async-handler'
import bcryptjs from 'bcryptjs'
import db from '../../helpers/db.js'
import { signJwt } from '../../helpers/jwt.js'
import { checkUserExists } from '../../helpers/checkUserExists.js'

export const signupUser = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { genSalt, hash } = bcryptjs
    const { username, tel, password } = req.body

    if (username === '' || tel === '' || password === '') {
      return res.status(400).json({ userAdded: 0, message: 'يجب تعبئة جميع البيانات!' })
    }

    // Check if user exists
    const identifier = username || tel

    const userExists = await checkUserExists(identifier)
    if (userExists) {
      return res
        .status(409)
        .json({ userAdded: 0, message: 'عفواً، هذا المستخدم مسجل مسبقاً' })
    }

    // Hash password
    const salt = await genSalt(10)
    const hashedPassword = await hash(password, salt)

    const values = [randomUUID(), username, tel, hashedPassword]

    //create user
    db.query(
      `INSERT INTO users (
        id,
        username,
        phone,
        password,
        registerDate
      ) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)`,
      values,
      (error, results: any) => {
        if (error) {
          return res.status(500).json({
            userAdded: 0,
            message: `لم يتم تسجيل المستخدم!: ${error}`
          })
        } else {
          db.query(
            'SELECT * FROM users WHERE id = ?',
            [results.insertId],
            (error, results: any) => {
              if (error) {
                return res.status(500).json({
                  userAdded: 0,
                  message: `خطأ في جلب بيانات المستخدم!: ${error}`
                })
              } else {
                const user = results[0]
                const token = signJwt({ userId: user.id })
                return res.status(201).json({
                  userAdded: 1,
                  message: 'تم التسجيل بنجاح 👍🏼 يمكنك تسجيل الدخول الآن',
                  token
                })
              }
            }
          )
        }
      }
    )
  }
)
