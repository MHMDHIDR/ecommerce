import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import db from '../../helpers/db.js'

export const updateOrder = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  let { productItems } = req.body

  const query = `UPDATE orders SET productsItems = ?, updateDate = CURRENT_TIMESTAMP WHERE id = ?`

  db.query(query, [productItems, id], (error: any, _data: any) => {
    return error
      ? res.status(500).json({ orderUpdated: 0, message: `عفواً حدث خطأ!: ${error}` })
      : res.status(201).json({ orderUpdated: 1, message: 'تم تحديث المنتج بنجاح' })
  })
})
