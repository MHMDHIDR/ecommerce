import { randomUUID } from 'crypto'
import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { getStorage, ref, uploadBytes, getDownloadURL } from '@firebase/storage'
import db from '../../helpers/db.js'
import { firebaseApp } from '../../helpers/firebase.js'

export const addProduct = asyncHandler(async (req: Request, res: Response) => {
  let {
    addedById,
    addedByName,
    itemName,
    currentPrice,
    quantity,
    category,
    description,
    productStatus
  } = req.body

  const id = randomUUID()
  const values = [
    id,
    addedById,
    addedByName,
    itemName,
    '/assets/img/logo.png',
    parseInt(currentPrice),
    parseInt(currentPrice),
    parseInt(quantity),
    category,
    description,
    productStatus
  ]

  const query = `INSERT INTO products (
    id,
    addedById,
    addedByName,
    itemName,
    imgUrl,
    currentPrice,
    oldPrice,
    quantity,
    category,
    description,
    productStatus,
    CreateDate,
    UpdateDate
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`

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
    values[3] = downloadURL
  }

  db.query(query, values, (error: any, _data: any) => {
    if (error) {
      return res.status(500).json({
        itemAdded: 0,
        message: `عفواً حدث خطأ! ${error}`
      })
    }

    return res.status(201).json({
      itemAdded: 1,
      message: 'تم اضافة المنتج بنجاح'
    })
  })
})
