import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import db from '../../helpers/db.js'

export const getProducts = asyncHandler(async (_req: Request, res: Response) => {
  const query = 'SELECT * FROM products'
  db.query(query, (err: any, data: any) => {
    return err ? res.json(err) : res.json(data)
  })
})
