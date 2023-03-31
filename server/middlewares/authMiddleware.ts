import jwt, { VerifyErrors } from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import { verifyJwt } from '../helpers/jwt.js'
import { Response, NextFunction } from 'express'
import db from '../helpers/db.js'
import { AuthenticatedRequest, JwtObject } from '../types'

export const authMiddleware = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { TokenExpiredError } = jwt
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      res.sendStatus(401)
      return
    }

    let payload: JwtObject
    try {
      payload = verifyJwt(token)
    } catch (e) {
      const verifyErr = e as VerifyErrors
      if (verifyErr instanceof TokenExpiredError) {
        res.status(401).send({ error: 'TOKEN_EXPIRED' })
      } else {
        res.status(401).send({ error: 'BAD_TOKEN' })
      }
      return
    }

    db.query(
      'SELECT id FROM users WHERE id = ? UNION SELECT id FROM admins WHERE id = ? UNION SELECT id FROM suppliers WHERE id = ?',
      [payload.userId, payload.userId, payload.userId],
      (err: any, results: any) => {
        if (err) {
          res.status(401).send({ error: 'USER_NOT_FOUND' })
          return
        }
        if (results.length > 0) {
          const user = results[0]
          req.user = user
          next()
        }
      }
    )
  }
)
