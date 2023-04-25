import { randomUUID } from 'crypto'
import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { getStorage, ref, uploadBytes, getDownloadURL } from '@firebase/storage'
import db from '../../helpers/db.js'
import { firebaseApp } from '../../helpers/firebase.js'

export const addCategory = asyncHandler(async (req: Request, res: Response) => {
  let {
    addedById,
    addedByName,
    categoryNameEn,
    categoryNameAr,
    description,
    categoryStatus
  } = req.body

  const id = randomUUID()
  const values = [
    id,
    addedById,
    addedByName,
    categoryNameEn,
    categoryNameAr,
    '/assets/img/logo.png',
    description,
    categoryStatus
  ]

  const query = `INSERT INTO categories (
    id,
    addedById,
    addedByName,
    categoryNameEn,
    categoryNameAr,
    imgUrl,
    description,
    categoryStatus,
    CreateDate,
    UpdateDate
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`

  if (req.files) {
    firebaseApp
    let { categoryImg } = req.files
    const storage = getStorage()
    const categoryImgName = Array.isArray(categoryImg)
      ? categoryImg[0].name
      : categoryImg.name
    const productImgData = Array.isArray(categoryImg)
      ? categoryImg[0].data
      : categoryImg.data

    const imageRef = ref(storage, `categories/${id}/${id}_${categoryImgName}`)
    await uploadBytes(imageRef, productImgData)
    const downloadURL = await getDownloadURL(imageRef)
    values[5] = downloadURL
  }

  db.query(query, values, (error: any, _data: any) => {
    if (error) {
      return res.status(500).json({
        categoryAdded: 0,
        message: `عفواً حدث خطأ! ${error}`
      })
    }

    return res.status(201).json({
      categoryAdded: 1,
      message: 'تم اضافة التصنيف بنجاح'
    })
  })
})
