import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import db from '../../helpers/db.js'

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
