import { Response } from 'express'
import asyncHandler from 'express-async-handler'
import db from '../../helpers/db.js'
import { AuthenticatedRequest } from '../../types.js'

export const getUser = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const id = req.user ? req.user : req.params

  const query = `SELECT id, username, avatarUrl, phone, status, type, registerDate FROM users${
    id ? ` WHERE id = ?` : ''
  }
  UNION 
  SELECT id, username, avatarUrl, phone, status, type, registerDate FROM admins${
    id ? ` WHERE id = ?` : ''
  }
  UNION 
  SELECT id, username, avatarUrl, phone, status, type, registerDate FROM suppliers${
    id ? ` WHERE id = ?` : ''
  }`

  db.query(query, [id, id, id], (err: any, user: any) => {
    return err
      ? res.status(500).json({ err })
      : req.user
      ? res.json({
          id: user[0].id,
          username: user[0].username,
          avatarUrl: user[0].avatarUrl,
          phone: user[0].phone,
          status: user[0].status,
          type: user[0].type,
          registerDate: user[0].registerDate
        })
      : res.json(user)
  })
})
