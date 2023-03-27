import { Request, Response } from 'express'
import { randomUUID } from 'crypto'
import asyncHandler from 'express-async-handler'
import bcryptjs from 'bcryptjs'
import db from '../../helpers/db.js'
// import generateToken from '../../helpers/generateToken.js'

export const registerUser = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { genSalt, hash } = bcryptjs
    const { username, tel, password } = req.body

    if (username === '' || tel === '' || password === '') {
      return res.status(400).json({ userAdded: 0, message: 'يجب تعبئة جميع البيانات!' })
    }

    // Check if user exists
    const identifier = username || tel
    const identifierType = username ? 'username' : 'tel'

    const userExists = await checkUserExists(identifier, identifierType)
    if (userExists) {
      return res
        .status(409)
        .json({ userAdded: 0, message: 'عفواً، هذا المستخدم مسجل مسبقاً' })
    }

    // Hash password
    const salt = await genSalt(10)
    const hashedPassword = await hash(password, salt)

    //create user
    db.query(
      'INSERT INTO users SET ?',
      {
        id: randomUUID(),
        username,
        phone: tel,
        password: hashedPassword,
        registerDate: 'CURRENT_TIMESTAMP'
      },
      (error, _results) => {
        if (error) {
          return res
            .status(500)
            .json({ userAdded: 0, message: `لم يتم تسجيل المستخدم!: ${error}` })
        } else {
          return res.status(201).json({
            userAdded: 1,
            message: 'تم التسجيل بنجاح 👍🏼 يمكنك تسجيل الدخول الآن'
          })
        }
      }
    )
  }
)

async function checkUserExists(identifier: string, identifierType: string) {
  return new Promise<boolean>((resolve, reject) => {
    const sql = `SELECT * FROM users WHERE ${identifierType} = ?`
    db.query(sql, [identifier], (error, results: any[]) => {
      if (error) reject(error)
      else resolve(results.length > 0)
    })
  })
}
