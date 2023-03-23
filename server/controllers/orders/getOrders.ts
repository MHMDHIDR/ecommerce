import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import db from '../../helpers/db.js'

export const getOrders = asyncHandler(async (_req: Request, res: Response) => {
  const query = 'SELECT * FROM orders'
  db.query(query, (err: any, data: any) => {
    return err ? res.json(err) : res.json(data)
  })
})
