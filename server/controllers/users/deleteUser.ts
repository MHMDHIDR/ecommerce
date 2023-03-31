import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import db from '../../helpers/db.js'
import { fromTable } from '../../helpers/fromTable.js'

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const { type } = req.body

  const query = `DELETE FROM ${fromTable(type)} WHERE id = ?`

  db.query(query, [id], (error: any, _data: any) => {
    return error
      ? res.status(500).json({
          userDeleted: 0,
          message: `عفواً حدث خطأ!: ${error}`
        })
      : res.status(201).json({
          userDeleted: 1,
          message: 'تم حذف المستخدم بنجاح'
        })
  })
})
