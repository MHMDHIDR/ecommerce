import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { getStorage, ref, deleteObject } from '@firebase/storage'
import db from '../../helpers/db.js'

export const deleteCategory = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params

  const query = 'DELETE FROM products WHERE id = ?'

  // Delete the old image if it exists
  if (req.query) {
    let { imgUrl } = req.query
    const storage = getStorage()
    const oldImageRef = ref(storage, String(imgUrl))
    await deleteObject(oldImageRef)
  }

  db.query(query, [id], (error: any, _data: any) => {
    return error
      ? res.status(500).json({
          itemDeleted: 0,
          message: `عفواً حدث خطأ!: ${error}`
        })
      : res.status(201).json({
          itemDeleted: 1,
          message: 'تم حذف المنتج بنجاح'
        })
  })
})
