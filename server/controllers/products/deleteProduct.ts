import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import db from '../../helpers/db.js'

export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const query = 'DELETE FROM products WHERE id = ?'

  db.query(query, [id], (error: any, _data: any) => {
    return error
      ? res.status(500).json({
          itemDeleted: 0,
          message: `عفواً حدث خطأ!: ${error}`
        })
      : res.status(201).json({
          itemDeleted: 1,
          message: 'تم حذف المنتج بنجاح'
        })
  })
})
