import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import db from '../../helpers/db.js'

export const getProduct = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const query = `
    SELECT p.*, c.categoryNameEn
    FROM products p
    JOIN categories c ON p.categoryId = c.id
    WHERE p.id = ?
  `

  db.query(query, [id], (error: any, data: any) => {
    return error
      ? res.status(500).json({ message: `عفواً حدث خطأ!: ${error}` })
      : res.json(data)
  })
})
