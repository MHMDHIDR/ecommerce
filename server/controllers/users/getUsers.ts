import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import db from '../../helpers/db.js'

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params

  const query = `SELECT * FROM users${id ? ` WHERE id = ?` : ''}`

  db.query(query, [id], (err: any, data: any) => {
    return err ? res.status(500).json(err) : res.json(data)
  })
})
