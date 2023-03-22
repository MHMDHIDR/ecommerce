import { randomUUID } from 'crypto'
import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import db from '../helpers/db.js'

export const getProducts = asyncHandler(async (_req: Request, res: Response) => {
  const query = 'SELECT * FROM products'
  db.query(query, (err: any, data: any) => {
    return err ? res.json(err) : res.json(data)
  })
})

export const getProduct = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const query = `SELECT * FROM products WHERE id = '${id}'`
  db.query(query, (error: any, data: any) => {
    return error
      ? res.status(500).json({ message: `عفواً حدث خطأ!: ${error}` })
      : res.json(data)
  })
})

export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params

  let { itemName, imgUrl, currentPrice, oldPrice, quantity, description, productStatus } =
    req.body

  ;(imgUrl =
    'https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D'),
    (currentPrice = parseInt(currentPrice)),
    (oldPrice = parseInt(currentPrice)),
    (quantity = parseInt(quantity))

  let discount = 0,
    rating = 0,
    productCreateDate = Date().toString(),
    productUpdateDate = Date().toString()

  const values = [
    itemName,
    imgUrl,
    discount,
    currentPrice,
    oldPrice,
    rating,
    quantity,
    description,
    productStatus,
    productCreateDate,
    productUpdateDate
  ]

  const query =
    'UPDATE products SET `itemName`= ?, `imgUrl`= ?, `discount`= ?, `currentPrice`= ?, `oldPrice`= ?, `rating`= ?, `quantity`= ?, `description`= ?, `productStatus`= ?, `productCreateDate`= ?, `productUpdateDate`= ? WHERE id = ?'

  db.query(query, [...values, id], (error: any, _data: any) => {
    return error
      ? res.status(500).json({
          itemUpdated: 0,
          message: `عفواً حدث خطأ!: ${error}`
        })
      : res.status(201).json({
          itemUpdated: 1,
          message: 'تم تحديث المنتج بنجاح'
        })
  })
})
export const addProduct = asyncHandler(async (req: Request, res: Response) => {
  let {
    id,
    itemName,
    imgUrl,
    currentPrice,
    oldPrice,
    quantity,
    description,
    productStatus
  } = req.body

  ;(id = randomUUID()),
    (imgUrl =
      'https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D'),
    (currentPrice = parseInt(currentPrice)),
    (oldPrice = parseInt(currentPrice)),
    (quantity = parseInt(quantity))

  let discount = 0,
    rating = 0,
    productCreateDate = Date().toString(),
    productUpdateDate = Date().toString()

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
    productCreateDate,
    productUpdateDate
  ]

  const query =
    'INSERT INTO products (id, `itemName`, `imgUrl`, `discount`, `currentPrice`, `oldPrice`, `rating`, `quantity`, `description`, `productStatus`, `productCreateDate`, `productUpdateDate`) VALUES (?)'

  db.query(query, [values], (error: any, _data: any) => {
    return error
      ? res.status(500).json({
          itemAdded: 0,
          message: `عفواً حدث خطأ! ${error}`
        })
      : res.status(201).json({
          itemAdded: 1,
          message: 'تم اضافة المنتج بنجاح'
        })
  })
})
