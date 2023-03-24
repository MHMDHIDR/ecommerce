import { randomUUID } from 'crypto'
import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { getStorage, ref, uploadBytes, getDownloadURL } from '@firebase/storage'
import db from '../../helpers/db.js'
import { firebaseApp } from '../../helpers/firebase.js'

export const addProduct = asyncHandler(async (req: Request, res: Response) => {
  let { itemName, currentPrice, quantity, category, description, productStatus } =
    req.body

  const id = randomUUID()
  const values = [
    id,
    itemName,
    '/assets/img/logo.png',
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

    const imageRef = ref(storage, `products/${id}/${id}_${productImgName}`)
    await uploadBytes(imageRef, productImgData)
    const downloadURL = await getDownloadURL(imageRef)
    values[2] = downloadURL
  }

  const query = `INSERT INTO products (
    id,
    itemName,
    imgUrl,
    currentPrice,
    oldPrice,
    quantity,
    category,
    description,
    productStatus,
    productCreateDate,
    productUpdateDate
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`

  db.query(query, values, (error: any, _data: any) => {
    return error
      ? res.status(500).json({
          itemAdded: 0,
          message: `عفواً حدث خطأ! ${error}`
        })
      : res.status(201).json({
          itemAdded: 1,
          message: 'تم اضافة المنتج بنجاح'
        })
  })
})
