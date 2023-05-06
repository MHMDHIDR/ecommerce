import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import db from '../../helpers/db.js'

export const deleteFromWishlist = asyncHandler(async (req: Request, res: Response) => {
  const { id: productId } = req.params
  let { userId } = req.body

  const query = `DELETE FROM wishlists WHERE userId = ? AND productId = ?`

  db.query(query, [userId, productId], (error: any, _data: any) => {
    if (error) {
      return res.status(500).json({ itemDeleted: 0, message: `عفواً حدث خطأ! ${error}` })
    }

    return res
      .status(201)
      .json({ itemDeleted: 1, message: 'تم حذف المنتج من المفضلة بنجاح' })
  })
})
