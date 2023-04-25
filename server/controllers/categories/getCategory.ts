import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import db from '../../helpers/db.js'

export const getCategory = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const query = `SELECT * FROM categories WHERE id = ?`

  db.query(query, [id], (error: any, data: any) => {
    return error
      ? res.status(500).json({ message: `عفواً حدث خطأ!: ${error}` })
      : res.json(data)
  })
})
