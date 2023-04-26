import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { getStorage, ref, deleteObject } from '@firebase/storage'
import db from '../../helpers/db.js'

export const deleteCategory = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params

  const query = 'SELECT id, imgUrl FROM products WHERE categoryId = ?'

  db.query(query, [id], async (error: any, data: any) => {
    if (error) {
      return res
        .status(500)
        .json({ categoryDeleted: 0, message: `عفواً حدث خطأ!: ${error}` })
    }

    const storage = getStorage()
    const firebaseDeleteProductsImagesPromises = data.map(async (product: any) => {
      // Delete the product image from Firebase Storage
      const oldImageRef = ref(storage, String(product.imgUrl))
      await deleteObject(oldImageRef)
    })

    // Wait for all the product deletions to finish before deleting the category
    await Promise.all(firebaseDeleteProductsImagesPromises)

    // Delete the category from the database
    const categoryQuery = 'DELETE FROM categories WHERE id = ?'

    // Delete the old image if it exists
    if (req.query) {
      let { imgUrl } = req.query
      const storage = getStorage()
      const oldImageRef = ref(storage, String(imgUrl))
      await deleteObject(oldImageRef)
    }

    db.query(categoryQuery, [id], (error: any) => {
      if (error) {
        return res
          .status(500)
          .json({ categoryDeleted: 0, message: `عفواً حدث خطأ!: ${error}` })
      }

      res.status(201).json({ categoryDeleted: 1, message: 'تم حذف التصنيف بنجاح' })
    })
  })
})
