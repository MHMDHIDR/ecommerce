import { randomUUID } from 'crypto'
import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import db from '../../helpers/db.js'

export const addOrder = asyncHandler(async (req: Request, res: Response) => {
  let { productsItems, orderedBy } = req.body

  const id = randomUUID()
  const items = JSON.parse(productsItems)

  for (const item of items) {
    db.query(
      `INSERT INTO orderItems (
        orderId,
        productId,
        itemName,
        imgUrl,
        quantity,
        price,
        category,
        supplierId,
        supplierName
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        item.id,
        item.itemName,
        item.imgUrl,
        item.quantity,
        item.currentPrice,
        item.category,
        item.addedById,
        item.addedByName
      ]
    )
  }

  db.query(
    `INSERT INTO orders (id, orderedBy, createDate, updateDate) VALUES (?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
    [id, orderedBy],
    (error, _data) => {
      if (error) {
        res.status(201).json({
          orderdded: 0,
          message: `عفواً، حدث خطأ ما ${error}`
        })
      }
      return res.status(201).json({
        orderdded: 1,
        message: `مبروك تم شراء المنتجات بنجاح! بإمكانك الرجوع للصفحة الرئيسية بالضغط على الزر أدناه`
      })
    }
  )
})
