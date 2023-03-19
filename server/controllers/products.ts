import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import db from '../utils/db'

export const getProducts = asyncHandler(async (_req: Request, res: Response) => {
  const query = 'SELECT * FROM products'
  db.query(query, (err: any, data: any) => {
    return err ? res.json(err) : res.json(data)
  })
})

export const addProduct = asyncHandler(async (req: Request, res: Response) => {
  const {
    id,
    itemName,
    imgUrl,
    discount,
    currentPrice,
    oldPrice,
    rating,
    quantity,
    description,
    productStatus,
    productUpdateDate
  } = req.body
  const query =
    'INSERT INTO products(`id ,itemName ,imgUrl ,discount ,currentPrice ,oldPrice ,rating ,quantity ,description ,productStatus ,productUpdateDate`) VALUES (?,?,?,?,?,?,?,?,?,?,?)'
  const values = [
    id,
    itemName,
    imgUrl,
    discount,
    currentPrice,
    oldPrice,
    rating,
    quantity,
    description,
    productStatus,
    productUpdateDate
  ]

  db.query(query, [values], (err: any, data: any) => {
    return err ? res.json(err) : res.json(data)
  })
})
