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
      username,
      tel,
      password,
      firstname,
      lastname,
      houseNumber,
      streetName,
      neighborhoodName,
      cityName
    } = req.body

    if (
      username === '' ||
      tel === '' ||
      password === '' ||
      firstname === '' ||
      lastname === '' ||
      houseNumber === '' ||
      houseNumber === '0' ||
      streetName === '' ||
      neighborhoodName === '' ||
      cityName === ''
    ) {
      return res
        .status(400)
        .json({ supplierAdded: 0, message: 'يجب تعبئة جميع البيانات!' })
    }

    // Check if user exists
    const identifier = username || tel
    const identifierType = username ? 'username' : 'tel'

    const userExists = await checkUserExists(identifier, identifierType)
    if (userExists) {
      return res
        .status(409)
        .json({ supplierAdded: 0, message: 'عفواً، هذا المستخدم مسجل مسبقاً' })
    }

    // Hash password
    const salt = await genSalt(10)
    const hashedPassword = await hash(password, salt)

    //create user
    db.query(
      'INSERT INTO suppliers SET ?',
      {
        id: randomUUID(),
        firstname,
        lastname,
        houseNumber,
        streetName,
        neighborhoodName,
        cityName,
        username,
        phone: tel,
        password: hashedPassword,
        registerDate: 'CURRENT_TIMESTAMP'
      },
      (error, results: any) => {
        if (error) {
          return res.status(500).json({
            supplierAdded: 0,
            message: `لم يتم تسجيل التاجر!: ${error}`
          })
        } else {
          db.query(
            'SELECT * FROM suppliers WHERE id = ?',
            [results.insertId],
            (error, results: any) => {
              if (error) {
                return res.status(500).json({
                  supplierAdded: 0,
                  message: `خطأ في جلب بيانات التاجر!: ${error}`
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
