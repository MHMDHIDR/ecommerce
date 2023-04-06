import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import db from '../../helpers/db.js'

export const updateOrder = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  let { productItems, orderStatus } = req.body

  const query = `UPDATE orders
    SET productsItems = IFNULL(?, productsItems),
      orderStatus = IFNULL(?, orderStatus),
      updateDate = CURRENT_TIMESTAMP
    WHERE id = ?`

  db.query(query, [productItems, orderStatus, id], (error: any, _data: any) => {
    return error
      ? res.status(500).json({ orderUpdated: 0, message: `عفواً حدث خطأ!: ${error}` })
      : res.status(201).json({ orderUpdated: 1, message: 'تم تحديث المنتج بنجاح' })
  })
})
