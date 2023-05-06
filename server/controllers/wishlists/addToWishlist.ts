import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import db from '../../helpers/db.js'

export const addToWishlist = asyncHandler(async (req: Request, res: Response) => {
  const { id: productId } = req.params
  let { userId } = req.body

  const query = `INSERT INTO wishlists (
    userId,
    productId,
    createDate
  ) VALUES (?, ?, CURRENT_TIMESTAMP)`

  db.query(query, [userId, productId], (error: any, _data: any) => {
    if (error) {
      return res.status(500).json({ itemAdded: 0, message: `عفواً حدث خطأ! ${error}` })
    }

    return res
      .status(201)
      .json({ itemAdded: 1, message: 'تم اضافة المنتج للمفضلة بنجاح' })
  })
})
