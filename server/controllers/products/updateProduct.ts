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

export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  let {
    itemName,
    currentPrice,
    quantity,
    categoryId,
    productStatus,
    description,
    currentProductImg
  } = req.body

  const values = [
    itemName,
    currentProductImg,
    parseInt(currentPrice),
    parseInt(currentPrice),
    parseInt(quantity),
    categoryId,
    description,
    productStatus
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
    if (currentProductImg) {
      const oldImageRef = ref(storage, currentProductImg)
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
    'UPDATE products SET `itemName`= ?, `imgUrl`= ?, `currentPrice`= ?, `oldPrice`= ?, `quantity`= ?, `categoryId`= ?, `description`= ?, `productStatus`= ?, `UpdateDate`= CURRENT_TIMESTAMP WHERE id = ?'

  db.query(query, [...values, id], (error: any, _data: any) => {
    return error
      ? res.status(500).json({
          itemUpdated: 0,
          message: `عفواً حدث خطأ!: ${error}`
        })
      : res.status(201).json({
          itemUpdated: 1,
          message: 'تم تحديث المنتج بنجاح'
        })
  })
})
