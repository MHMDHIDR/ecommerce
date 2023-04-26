import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import bcryptjs from 'bcryptjs'
import db from '../../helpers/db.js'
import { signJwt } from '../../helpers/jwt.js'

export const loginAdmin = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { compare } = bcryptjs
    const { tel, password } = req.body

    if (tel === '' || password === '') {
      return res
        .status(400)
        .json({ adminLoggedIn: 0, message: 'يجب تعبئة جميع البيانات!' })
    }

    db.query(`SELECT * FROM admins WHERE phone = ?`, [tel], async (err, results: any) => {
      if (err) throw err

      if (results.length > 0) {
        const admin = results[0]

        if (admin && admin.status === 'block') {
          return res.status(403).json({
            adminLoggedIn: 0,
            message: 'عفواً، حسابك موقوف! عليك التواصل مع الإدارة إذا أردت تسجيل الدخول'
          })
        } else if (await compare(password, admin.password)) {
          return res.status(200).json({
            adminLoggedIn: 1,
            message: 'تم تسجيل الدخول بنجاح',
            token: signJwt({ userId: admin.id, userType: admin.type })
          })
        } else {
          return res.status(401).json({
            adminLoggedIn: 0,
            message: 'عفواً، اسم المستخدم او كلمة السر خطأ'
          })
        }
      } else {
        return res.status(404).json({
          adminLoggedIn: 0,
          message: 'عفواً، اسم المستخدم او كلمة السر خطأ'
        }) // User not found
      }
    })
  }
)
