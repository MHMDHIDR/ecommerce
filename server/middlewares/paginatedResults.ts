import { Request, NextFunction } from 'express'
import db from '../helpers/db.js'
import { CustomPaginateResponse } from '../types'

export const paginatedResults = (table: string) => {
  return async (req: Request, res: CustomPaginateResponse, next: NextFunction) => {
    const { page, limit } = req.params
    const { category, orderBy, addedById } = req.query
    const reqPage = parseInt(page) || 1
    const reqLimit = parseInt(limit) || 1

    const startIndex = (reqPage - 1) * reqLimit
    const endIndex = reqPage * reqLimit

    const response: Record<string, any> = {}

    try {
      const countQuery = `SELECT COUNT(*) as count FROM ${table}`
      const countResult = await db.promise().query(countQuery)
      const itemsCount = countResult[0][0].count
      response.itemsCount = category
        ? await db
            .promise()
            .query(`SELECT COUNT(*) as count FROM ${table} WHERE category = ?`, [
              category
            ])
        : itemsCount

      response.numberOfPages = Math.ceil(response.itemsCount / reqLimit)

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

      let query = `SELECT * FROM ${table}`

      if (!page) {
        query = `SELECT * FROM ${table} ${
          addedById ? 'WHERE addedById = ?' : ''
        }  ORDER BY ${orderBy ? `${orderBy} DESC` : `UpdateDate DESC`}`
        response.response = await db.promise().query(query, [addedById])
        response.response = response.response[0]
      } else if (category) {
        query = `SELECT * FROM ${table} WHERE category = ? ORDER BY ${
          orderBy ? `${orderBy} DESC` : `UpdateDate DESC`
        } LIMIT ? OFFSET ?`
        response.response = await db
          .promise()
          .query(query, [category, reqLimit, startIndex])
        response.response = response.response[0]
      } else {
        query = `SELECT * FROM ${table} ${
          addedById ? 'WHERE addedById = ?' : ''
        } ORDER BY ${orderBy ? `${orderBy} DESC` : `UpdateDate DESC`} LIMIT ? OFFSET ?`
        response.response = await db
          .promise()
          .query(query, [addedById, reqLimit, startIndex])
        response.response = response.response[0]
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