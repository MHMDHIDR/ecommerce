import { Request, NextFunction } from 'express'
import db from '../helpers/db.js'
import { CustomPaginateResponse } from '../types'

export const paginatedResults = (table: string) => {
  return async (req: Request, res: CustomPaginateResponse, next: NextFunction) => {
    const { page, limit } = req.params
    const { category, orderBy, addedById, status, supplierId } = req.query
    const reqPage = parseInt(page) || 1
    const reqLimit = parseInt(limit) || 1

    const startIndex = (reqPage - 1) * reqLimit
    const endIndex = reqPage * reqLimit

    const response: Record<string, any> = {}

    try {
      let query = `SELECT * FROM ${table}`

      if (supplierId) {
        query = `SELECT o.*, oi.* FROM orders o JOIN orderItems oi ON o.id = oi.orderId WHERE oi.supplierId = ? ORDER BY ${
          orderBy ? `${orderBy} DESC` : `o.updateDate DESC`
        } LIMIT ? OFFSET ?`

        response.response = await db
          .promise()
          .query(query, [supplierId, reqLimit, startIndex])
        response.response = response.response[0]
        const countQuery = `SELECT COUNT(*) as count FROM orders o JOIN orderItems oi ON o.id = oi.orderId WHERE oi.supplierId = ?`
        const countResult = await db
          .promise()
          .query(countQuery, [supplierId, reqLimit, startIndex])
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
        if (addedById && status) {
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
      } else if (category) {
        query = `SELECT * FROM ${table} WHERE category = ? AND productStatus = ? ORDER BY ${
          orderBy ? `${orderBy} DESC` : `updateDate DESC`
        } LIMIT ? OFFSET ?`
        response.response = await db
          .promise()
          .query(query, [category, status, reqLimit, startIndex])
        response.response = response.response[0]
        const countQuery = `SELECT COUNT(*) as count FROM ${table} WHERE category = ? AND productStatus = ?`
        const countResult = await db
          .promise()
          .query(countQuery, [category, status, reqLimit, startIndex])
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

      response.category = category
      res.paginatedResults = response
      next()
    } catch (e) {
      const { message } = e as Error
      res.status(500).json({ message })
    }
  }
}
