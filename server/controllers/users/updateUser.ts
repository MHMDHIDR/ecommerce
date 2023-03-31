import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import db from '../../helpers/db.js'
import { fromTable } from '../../helpers/fromTable.js'

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const { type, status } = req.body

  const query = `UPDATE ${fromTable(type)} SET status = ? WHERE id = ?`

  db.query(query, [status, id], (error: any, _data: any) => {
    return error
      ? res.status(500).json({
          userUpdated: 0,
          message: `عفواً حدث خطأ!: ${error}`
        })
      : res.status(201).json({
          userUpdated: 1,
          message: 'تم تحديث حالة الحساب بنجاح'
        })
  })
})
