import { Request, Response } from 'express'
import { randomUUID } from 'crypto'
import asyncHandler from 'express-async-handler'
import bcryptjs from 'bcryptjs'
import db from '../../helpers/db.js'
import { signJwt } from '../../helpers/jwt.js'
import { checkUserExists } from '../../helpers/checkUserExists.js'

export const signupSupplier = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { genSalt, hash } = bcryptjs
    const {
      firstname,
      lastname,
      houseNumber,
      streetName,
      neighborhoodName,
      cityName,
      username,
      password,
      tel
    } = req.body

    if (
      firstname === '' ||
      lastname === '' ||
      houseNumber === '' ||
      streetName === '' ||
      neighborhoodName === '' ||
      cityName === '' ||
      username === '' ||
      password === '' ||
      tel === ''
    ) {
      return res
        .status(400)
        .json({ supplierAdded: 0, message: 'يجب تعبئة جميع البيانات!' })
    }

    // Check if user exists
    const identifier = username || tel

    const userExists = await checkUserExists(identifier)
    if (userExists) {
      return res.status(409).json({
        supplierAdded: 0,
        message: 'عفواً، هذا المستخدم مسجل مسبقاً، عليك تغيير اسم المستخدم ورقم الهاتف'
      })
    }

    // Hash password
    const salt = await genSalt(10)
    const hashedPassword = await hash(password, salt)

    //create user
    db.query(
      'INSERT INTO suppliers (id, firstname, lastname, houseNumber, streetName, neighborhoodName, cityName, username, password, phone, registerDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)',
      [
        randomUUID(),
        firstname,
        lastname,
        houseNumber,
        streetName,
        neighborhoodName,
        cityName,
        username,
        hashedPassword,
        tel
      ],
      (error, _results: any) => {
        if (error) {
          return res.status(500).json({
            supplierAdded: 0,
            message: `لم يتم تسجيل التاجر!: ${error}`
          })
        } else {
          db.query(
            'SELECT id, firstname, lastname, houseNumber, streetName, neighborhoodName, cityName, username, phone FROM suppliers WHERE phone = ?',
            [tel],
            (error, results: any) => {
              if (error) {
                return res.status(500).json({
                  supplierAdded: 0,
                  message: `خطأ في جلب بيانات التاجر!: ${error}`
                })
              } else if (results.length === 0) {
                return res.status(500).json({
                  supplierAdded: 0,
                  message: 'خطأ في جلب بيانات التاجر!'
                })
              } else {
                const supplier = results[0]
                const token = signJwt({ userId: supplier.id })
                return res.status(201).json({
                  supplierAdded: 1,
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
