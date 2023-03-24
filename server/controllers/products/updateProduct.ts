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
    category,
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
    category,
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
      await deleteObject(oldImageRef)
    }

    const imageRef = ref(storage, `products/${id}/${id}_${productImgName}`)
    await uploadBytes(imageRef, productImgData)
    const downloadURL = await getDownloadURL(imageRef)
    values[1] = downloadURL
  }

  const query =
    'UPDATE products SET `itemName`= ?, `imgUrl`= ?, `currentPrice`= ?, `oldPrice`= ?, `quantity`= ?, `category`= ?, `description`= ?, `productStatus`= ?, `productUpdateDate`= CURRENT_TIMESTAMP WHERE id = ?'

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
