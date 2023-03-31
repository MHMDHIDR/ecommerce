import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import db from '../../helpers/db.js'

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params

  const query = 'DELETE FROM users WHERE id = ?'

  db.query(query, [id], (error: any, _data: any) => {
    return error
      ? res.status(500).json({
          userDeleted: 0,
          message: `عفواً حدث خطأ!: ${error}`
        })
      : res.status(201).json({
          userDeleted: 1,
          message: 'تم حذف المنتج بنجاح'
        })
  })
})
