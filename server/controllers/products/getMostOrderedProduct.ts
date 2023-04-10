import { Request, Response } from 'express'
import db from '../../helpers/db.js'

export const getMostOrderedProduct = async (_req: Request, res: Response) => {
  const topOrdersQuery = `
    SELECT productId, SUM(quantity) AS totalQuantity
    FROM orderItems
    GROUP BY productId
    ORDER BY totalQuantity DESC
    LIMIT 1
  `

  const [[mostOrderedProduct]] = await db.promise().query(topOrdersQuery)
  const { productId, totalQuantity } = mostOrderedProduct

  const productQuery = `
    SELECT *
    FROM products
    WHERE id = ?
  `

  try {
    const [[mostOrderedProductInfo]] = await db.promise().query(productQuery, [productId])
    res.json({
      id: productId,
      totalQuantity,
      ...mostOrderedProductInfo
    })
  } catch (error) {
    res.status(500).json({ message: `عفواً حدث خطأ!: ${error}` })
  }
}
