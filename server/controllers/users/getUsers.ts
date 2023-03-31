import { Response } from 'express'
import asyncHandler from 'express-async-handler'
import db from '../../helpers/db.js'

export const getUsers = asyncHandler(async (_req, res: Response) => {
  const query = `SELECT id, username, avatarUrl, phone, status, type, registerDate FROM users
  UNION 
  SELECT id, username, avatarUrl, phone, status, type, registerDate FROM admins
  UNION 
  SELECT id, username, avatarUrl, phone, status, type, registerDate FROM suppliers`

  db.query(query, (err: any, users: any) => {
    return err ? res.status(500).json({ err }) : res.json(users)
  })
})
