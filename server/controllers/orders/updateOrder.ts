import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import db from '../../helpers/db.js'

export const updateOrder = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  let { productItems } = req.body

  console.log(productItems)

  // const values = [itemId, status]

  const query =
    'UPDATE orders SET `itemName`= ?, `imgUrl`= ?, `discount`= ?, `currentPrice`= ?, `oldPrice`= ?, `rating`= ?, `quantity`= ?, `description`= ?, `productStatus`= ?, `CreateDate`= ?, `UpdateDate`= ? WHERE id = ?'

  // db.query(query, [...values, id], (error: any, _data: any) => {
  //   return error
  //     ? res.status(500).json({
  //         itemUpdated: 0,
  //         message: `عفواً حدث خطأ!: ${error}`
  //       })
  //     : res.status(201).json({
  //         itemUpdated: 1,
  //         message: 'تم تحديث المنتج بنجاح'
  //       })
  // })
})
