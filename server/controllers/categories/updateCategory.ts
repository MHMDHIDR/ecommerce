import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from '@firebase/storage'
import db from '../../helpers/db.js'
import { firebaseApp } from '../../helpers/firebase.js'

export const updateCategory = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  let {
    categoryNameEn,
    categoryNameAr,
    categoryStatus,
    description,
    currentCategoryImg
  } = req.body

  const values = [
    categoryNameEn,
    categoryNameAr,
    categoryStatus,
    description,
    currentCategoryImg
  ]

  if (req.files) {
    firebaseApp
    let { productImg } = req.files
    const storage = getStorage()
    const productImgName = Array.isArray(productImg)
      ? productImg[0].name
      : productImg.name
    const productImgData = Array.isArray(productImg)
      ? productImg[0].data
      : productImg.data

    // Delete the old image if it exists
    if (currentCategoryImg) {
      const oldImageRef = ref(storage, currentCategoryImg)
      // Check if the file exists before deleting it
      try {
        await getDownloadURL(oldImageRef)
        await deleteObject(oldImageRef)
      } catch (error) {
        // If the file doesn't exist, just skip deleting it
      }
    }

    const imageRef = ref(storage, `products/${id}/${id}_${productImgName}`)
    await uploadBytes(imageRef, productImgData)
    const downloadURL = await getDownloadURL(imageRef)
    values[1] = downloadURL
  }

  const query =
    'UPDATE products SET `categoryNameEn`= ?, `categoryNameAr`= ?, `imgUrl`= ?, `currentPrice`= ?, `oldPrice`= ?, `quantity`= ?, `category`= ?, `description`= ?, `productStatus`= ?, `UpdateDate`= CURRENT_TIMESTAMP WHERE id = ?'

  db.query(query, [...values, id], (error: any, _data: any) => {
    return error
      ? res.status(500).json({
          categoryUpdated: 0,
          message: `عفواً حدث خطأ!: ${error}`
        })
      : res.status(201).json({
          categoryUpdated: 1,
          message: 'تم تحديث المنتج بنجاح'
        })
  })
})
