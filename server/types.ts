import { Request, Response } from 'express'

export type authUserRequestProps = Response & {
  user: {
    id: string
  }
}

export type JwtObject = {
  userId: string
  userType?: string
}

export type CustomPaginateResponse = Response & {
  paginatedResults?: Record<string, any>
}

export type AuthenticatedRequest = Request & {
  user?: {
    id: string
  }
}
