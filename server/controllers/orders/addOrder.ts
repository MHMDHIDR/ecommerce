import { randomUUID } from 'crypto'
import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import db from '../../helpers/db.js'

export const addOrder = asyncHandler(async (req: Request, res: Response) => {
  let { productsItems, orderedBy } = req.body

  let CreateDate = Date().toString(),
    UpdateDate = Date().toString()

  const id = randomUUID()
  const values = [id, productsItems, orderedBy, CreateDate, UpdateDate]

  const query = `INSERT INTO orders (id, productsItems, orderedBy, orderStatus, orderDate, updateDate)
      VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`

  db.query(query, values, (error: any, _data: any) => {
    return error
      ? res.status(500).json({
          orderdded: 0,
          message: `عفواً حدث خطأ! ${error}`
        })
      : res.status(201).json({
          orderdded: 1,
          message: `مبروك تم شراء المنتجات بنجاح! بإمكانك الرجوع للصفحة الرئيسية بالضغط على الزر أدناه`
        })
  })
})
