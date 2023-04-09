import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import db from '../../helpers/db.js'

export const updateOrder = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  let { eventState, rejectReason, productId } = req.body

  const updateOrderItemsQuery = `UPDATE orderItems
    SET orderItemStatus = IFNULL(?, orderItemStatus),
        rejectReason = IFNULL(?, rejectReason),
        updateDate = CURRENT_TIMESTAMP
    WHERE orderId = ? AND productId = ?`

  const updateOrderQuery = `UPDATE orders
    SET updateDate = CURRENT_TIMESTAMP
    WHERE id = ?`

  db.query(
    updateOrderItemsQuery,
    [eventState, rejectReason, id, productId],
    (error: any, _data: any) => {
      if (error) {
        return res
          .status(500)
          .json({ orderUpdated: 0, message: `عفواً حدث خطأ!: ${error}` })
      }
      db.query(updateOrderQuery, [id], (error: any, _data: any) => {
        if (error) {
          return res
            .status(500)
            .json({ orderUpdated: 0, message: `عفواً حدث خطأ!: ${error}` })
        }
        res.status(201).json({ orderUpdated: 1, message: 'تم تحديث المنتج بنجاح' })
      })
    }
  )
})
