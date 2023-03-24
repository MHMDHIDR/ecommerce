import { randomUUID } from 'crypto'
import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { getStorage, ref, uploadBytes, getDownloadURL } from '@firebase/storage'
import db from '../../helpers/db.js'
import { firebaseApp } from '../../helpers/firebase.js'

export const addProduct = asyncHandler(async (req: Request, res: Response) => {
  let { itemName, currentPrice, quantity, description, productStatus } = req.body
  let { productImg } = req.files!

  firebaseApp
  const storage = getStorage()
  const productImgName = Array.isArray(productImg) ? productImg[0].name : productImg.name
  const productImgData = Array.isArray(productImg) ? productImg[0].data : productImg.data

  const productId = randomUUID()
  const values = [
    productId,
    itemName,
    'https://source.unsplash.com/random?product',
    parseInt(currentPrice),
    parseInt(currentPrice),
    parseInt(quantity),
    description,
    productStatus
  ]

  if (productImg) {
    const imageRef = ref(storage, `products/${productId}/${productId}_${productImgName}`)
    await uploadBytes(imageRef, productImgData)
    const downloadURL = await getDownloadURL(imageRef)
    values[2] = downloadURL
  }

  const query = `INSERT INTO products (
    productId,
    itemName,
    imgUrl,
    currentPrice,
    oldPrice,
    quantity,
    description,
    productStatus,
    productCreateDate,
    productUpdateDate
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`

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
