import { Request, NextFunction } from 'express'
import db from '../helpers/db.js'
import { CustomPaginateResponse } from '../types'

export const paginatedResults = (table: string) => {
  return async (req: Request, res: CustomPaginateResponse, next: NextFunction) => {
    const { page, limit } = req.params
    const {
      SearchQuery,
      orderBy,
      addedById,
      orderedById,
      status,
      supplierId,
      orderId,
      category
    } = req.query
    const reqPage = parseInt(page) || 1
    const reqLimit = parseInt(limit) || parseInt(process.env.BIG_LIMIT!)

    const startIndex = (reqPage - 1) * reqLimit
    const endIndex = reqPage * reqLimit

    let query
    const response: Record<string, any> = {}

    try {
      if (supplierId) {
        query = `SELECT * FROM orderItems WHERE supplierId = ? ORDER BY ${
          orderBy ? `${orderBy} DESC` : `updateDate DESC`
        }`
        response.response = await db.promise().query(query, [supplierId])
        response.response = response.response[0]
        const countQuery = `SELECT COUNT(*) as count FROM orderItems WHERE supplierId = ?`
        const countResult = await db.promise().query(countQuery, [supplierId])
        const itemsCount = countResult[0][0].count

        response.itemsCount = itemsCount
        if (endIndex < itemsCount) {
          response.next = {
            page: reqPage + 1,
            limit: reqLimit
          }
        }

        if (startIndex > 0) {
          response.previous = {
            page: reqPage - 1,
            limit: reqLimit
          }
        }
        response.numberOfPages = Math.ceil(response.itemsCount / reqLimit)
      } else if (orderId) {
        query = `SELECT * FROM orderItems WHERE orderId = ? ORDER BY ${
          orderBy ? `${orderBy} DESC` : `updateDate DESC`
        }`
        response.response = await db.promise().query(query, [orderId])
        response.response = response.response[0]
        const countQuery = `SELECT COUNT(*) as count FROM orderItems WHERE orderId = ?`
        const countResult = await db.promise().query(countQuery, [orderId])
        const itemsCount = countResult[0][0].count

        response.itemsCount = itemsCount
        if (endIndex < itemsCount) {
          response.next = {
            page: reqPage + 1,
            limit: reqLimit
          }
        }

        if (startIndex > 0) {
          response.previous = {
            page: reqPage - 1,
            limit: reqLimit
          }
        }
        response.numberOfPages = Math.ceil(response.itemsCount / reqLimit)
      } else if (!page) {
        if (addedById) {
          query = `SELECT * FROM ${table} WHERE addedById = ? ORDER BY ${
            orderBy ? `${orderBy} DESC` : `updateDate DESC`
          }`

          response.response = await db.promise().query(query, [addedById])
          response.response = response.response[0]
          const countQuery = `SELECT COUNT(*) as count FROM ${table} WHERE addedById = ?`
          const countResult = await db.promise().query(countQuery, [addedById])
          const itemsCount = countResult[0][0].count

          response.itemsCount = itemsCount
          if (endIndex < itemsCount) {
            response.next = {
              page: reqPage + 1,
              limit: reqLimit
            }
          }

          if (startIndex > 0) {
            response.previous = {
              page: reqPage - 1,
              limit: reqLimit
            }
          }
          response.numberOfPages = Math.ceil(response.itemsCount / reqLimit)
        } else if (category && status) {
          query = `SELECT * FROM ${table} WHERE categoryId = ? AND productStatus = ? ORDER BY ${
            orderBy ? `${orderBy} DESC` : `updateDate DESC`
          }`

          response.response = await db.promise().query(query, [category, status])
          response.response = response.response[0]
          const countQuery = `SELECT COUNT(*) as count FROM ${table} WHERE categoryId = ? AND productStatus = ?`
          const countResult = await db.promise().query(countQuery, [category, status])
          const itemsCount = countResult[0][0].count

          response.itemsCount = itemsCount
          if (endIndex < itemsCount) {
            response.next = {
              page: reqPage + 1,
              limit: reqLimit
            }
          }

          if (startIndex > 0) {
            response.previous = {
              page: reqPage - 1,
              limit: reqLimit
            }
          }
          response.numberOfPages = Math.ceil(response.itemsCount / reqLimit)
        } else if (orderedById) {
          query = `SELECT * FROM orderItems WHERE orderId IN (SELECT id FROM orders WHERE orderedBy = ?) ORDER BY ${
            orderBy ? `${orderBy} DESC` : `updateDate DESC`
          }`

          response.response = await db.promise().query(query, [orderedById])
          response.response = response.response[0]
          console.log(response.response[0])

          const countQuery = `SELECT COUNT(*) as count FROM orderItems WHERE orderId IN (SELECT id FROM orders WHERE orderedBy = ?)`
          const countResult = await db.promise().query(countQuery, [orderedById])
          const itemsCount = countResult[0][0].count

          response.itemsCount = itemsCount
          if (endIndex < itemsCount) {
            response.next = {
              page: reqPage + 1,
              limit: reqLimit
            }
          }

          if (startIndex > 0) {
            response.previous = {
              page: reqPage - 1,
              limit: reqLimit
            }
          }
          response.numberOfPages = Math.ceil(response.itemsCount / reqLimit)
        } else if (addedById && status) {
          query = `SELECT * FROM ${table} WHERE addedById = ? AND productStatus = ? ORDER BY ${
            orderBy ? `${orderBy} DESC` : `updateDate DESC`
          }`

          response.response = await db.promise().query(query, [addedById, status])
          response.response = response.response[0]
          const countQuery = `SELECT COUNT(*) as count FROM ${table} WHERE addedById = ? AND productStatus = ?`
          const countResult = await db.promise().query(countQuery, [addedById, status])
          const itemsCount = countResult[0][0].count

          response.itemsCount = itemsCount
          if (endIndex < itemsCount) {
            response.next = {
              page: reqPage + 1,
              limit: reqLimit
            }
          }

          if (startIndex > 0) {
            response.previous = {
              page: reqPage - 1,
              limit: reqLimit
            }
          }
          response.numberOfPages = Math.ceil(response.itemsCount / reqLimit)
        } else if (SearchQuery && status) {
          //Search Queries
          query = `SELECT * FROM ${table} WHERE itemName LIKE '%${SearchQuery}%' AND productStatus = ? ORDER BY ${
            orderBy ? `${orderBy} DESC` : `updateDate DESC`
          } LIMIT ? OFFSET ?`

          response.response = await db
            .promise()
            .query(query, [status, reqLimit, startIndex])
          response.response = response.response[0]
          const countQuery = `SELECT COUNT(*) as count FROM ${table} WHERE itemName LIKE '%${SearchQuery}%' AND productStatus = ?`
          const countResult = await db
            .promise()
            .query(countQuery, [status, reqLimit, startIndex])
          const itemsCount = countResult[0][0].count

          response.itemsCount = itemsCount
          if (endIndex < itemsCount) {
            response.next = {
              page: reqPage + 1,
              limit: reqLimit
            }
          }

          if (startIndex > 0) {
            response.previous = {
              page: reqPage - 1,
              limit: reqLimit
            }
          }
          response.numberOfPages = Math.ceil(response.itemsCount / reqLimit)
        } else {
          query = `SELECT * FROM ${table} ${addedById ? 'WHERE addedById = ?' : ''} ${
            status ? 'WHERE productStatus = ?' : ''
          } ORDER BY ${orderBy ? `${orderBy} DESC` : `updateDate DESC`}`
          response.response = await db.promise().query(query, [status, addedById])
          response.response = response.response[0]

          const countQuery = `SELECT COUNT(*) as count FROM ${table} ${
            addedById ? 'WHERE addedById = ?' : ''
          } ${status ? 'WHERE productStatus = ?' : ''}`

          const countResult = await db.promise().query(countQuery, [status, addedById])
          const itemsCount = countResult[0][0].count

          response.itemsCount = itemsCount
          if (endIndex < itemsCount) {
            response.next = {
              page: reqPage + 1,
              limit: reqLimit
            }
          }

          if (startIndex > 0) {
            response.previous = {
              page: reqPage - 1,
              limit: reqLimit
            }
          }
          response.numberOfPages = Math.ceil(response.itemsCount / reqLimit)
        }
      } else {
        query = `SELECT * FROM ${table} ${addedById ? 'WHERE addedById = ?' : ''} ${
          status ? 'WHERE productStatus = ?' : ''
        } ORDER BY ${orderBy ? `${orderBy} DESC` : `updateDate DESC`} LIMIT ? OFFSET ?`
        response.response = await db
          .promise()
          .query(query, [addedById, status, reqLimit, startIndex])
        response.response = response.response[0]
        const countQuery = `SELECT COUNT(*) as count FROM ${table} ${
          addedById ? 'WHERE addedById = ?' : ''
        } ${status ? 'WHERE productStatus = ?' : ''}`
        const countResult = await db
          .promise()
          .query(countQuery, [addedById, status, reqLimit, startIndex])
        const itemsCount = countResult[0][0].count

        response.itemsCount = itemsCount
        if (endIndex < itemsCount) {
          response.next = {
            page: reqPage + 1,
            limit: reqLimit
          }
        }

        if (startIndex > 0) {
          response.previous = {
            page: reqPage - 1,
            limit: reqLimit
          }
        }
        response.numberOfPages = Math.ceil(response.itemsCount / reqLimit)
      }

      res.paginatedResults = response
      next()
    } catch (e) {
      const { message } = e as Error
      res.status(500).json({ message })
    }
  }
}
