import { randomUUID } from 'crypto'
import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import db from '../../helpers/db.js'

export const addProduct = asyncHandler(async (req: Request, res: Response) => {
  let { itemName, imgUrl, currentPrice, oldPrice, quantity, description, productStatus } =
    req.body

  const values = {
    productId: randomUUID(),
    itemName,
    imgUrl:
      'https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D',
    currentPrice: parseInt(currentPrice),
    oldPrice: parseInt(currentPrice),
    quantity: parseInt(quantity),
    description,
    productStatus
  }

  const query =
    'INSERT INTO products (`productId`, `itemName`, `imgUrl`, `currentPrice`, `oldPrice`, `quantity`, `description`, `productStatus`) VALUES (?)'

  db.query(
    query,
    {
      values: Object.values(values),
      productCreateDate: 'CURRENT_TIMESTAMP',
      productUpdateDate: 'CURRENT_TIMESTAMP'
    },
    (error: any, _data: any) => {
      return error
        ? res.status(500).json({
            itemAdded: 0,
            message: `عفواً حدث خطأ! ${error}`
          })
        : res.status(201).json({
            itemAdded: 1,
            message: 'تم اضافة المنتج بنجاح'
          })
    }
  )
})
