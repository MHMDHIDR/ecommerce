import { Response } from 'express'

export type authUserRequestProps = Response & {
  user: {
    id: string
  }
}

export type JwtObject = { userId: string }

export type CustomPaginateResponse = Response & {
  paginatedResults?: Record<string, any>
}
