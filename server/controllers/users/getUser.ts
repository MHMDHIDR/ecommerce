import { Response } from 'express'
import asyncHandler from 'express-async-handler'
import db from '../../helpers/db.js'
import { AuthenticatedRequest } from '../../types.js'

export const getUser = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.user ? req.user : req.params

  const query = `SELECT id, firstname, lastname, gender, username, avatarUrl, phone, status, type, registerDate FROM users${
    id ? ` WHERE id = ?` : ''
  }
  UNION 
  SELECT id, firstname, lastname, gender, username, avatarUrl, phone, status, type, registerDate FROM admins${
    id ? ` WHERE id = ?` : ''
  }
  UNION 
  SELECT id, firstname, lastname, gender, username, avatarUrl, phone, status, type, registerDate FROM suppliers${
    id ? ` WHERE id = ?` : ''
  }`

  db.query(query, [id, id, id], (err: any, user: any) => {
    return err ? res.status(500).json({ err }) : res.json(user)
  })
})
