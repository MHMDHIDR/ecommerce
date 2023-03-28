import jwt from 'jsonwebtoken'
import { JwtObject } from '../types'

const { sign, verify } = jwt
const { JWT_SECRET } = process.env

export const getJwtSecret = (): string => (!JWT_SECRET ? process.exit(1) : JWT_SECRET)

export const signJwt = (obj: JwtObject): string =>
  sign(obj, getJwtSecret(), {
    expiresIn: '15d'
  })

// Throws one of VerifyErrors on bad tokens
export const verifyJwt = (token: string): JwtObject =>
  verify(token, getJwtSecret()) as JwtObject
