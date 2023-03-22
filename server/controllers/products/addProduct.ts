import { randomUUID } from 'crypto'
import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import db from '../../helpers/db.js'

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
