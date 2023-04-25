import { Request } from 'express'
import asyncHandler from 'express-async-handler'
import { CustomPaginateResponse } from '../../types'

export const getCategories = asyncHandler(
  async (_req: Request, res: CustomPaginateResponse) => {
    res.json(res.paginatedResults)
  }
)
