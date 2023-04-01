import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import db from '../../helpers/db.js'
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from '@firebase/storage'
import { firebaseApp } from '../../helpers/firebase.js'
import { fromTable } from '../../helpers/fromTable.js'

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const { type, status, userFullName, gender, tel, currentProfileImg } = req.body
  const firstname = userFullName.split(' ')[0]
  const lastname = userFullName.split(' ')[1]

  const values = [
    firstname ?? '',
    lastname ?? '',
    gender,
    currentProfileImg,
    tel,
    status === 'reject' ? 'block' : status === 'accept' ? 'active' : null
  ]

  if (req.files) {
    firebaseApp
    let { profileImg } = req.files
    const storage = getStorage()
    const profileImgName = Array.isArray(profileImg)
      ? profileImg[0].name
      : profileImg.name
    const profileImgData = Array.isArray(profileImg)
      ? profileImg[0].data
      : profileImg.data

    // Delete the old image if it exists
    if (currentProfileImg) {
      const oldImageRef = ref(storage, currentProfileImg)
      // Check if the file exists before deleting it
      try {
        await getDownloadURL(oldImageRef)
        await deleteObject(oldImageRef)
      } catch (error) {
        // If the file doesn't exist, just skip deleting it
      }
    }

    const imageRef = ref(storage, `profiles/${id}/${id}_${profileImgName}`)
    await uploadBytes(imageRef, profileImgData)
    const downloadURL = await getDownloadURL(imageRef)
    values[3] = downloadURL
  }

  const query = `UPDATE ${fromTable(
    type
  )} SET firstname = ?, lastname = ?, gender = ?, avatarUrl= ?, phone = ?, status = IFNULL(?, status) WHERE id = ?`

  db.query(query, [...values, id], (error: any, _data: any) => {
    return error
      ? res.status(500).json({
          userUpdated: 0,
          message: `عفواً حدث خطأ!: ${error}`
        })
      : res.status(201).json({
          userUpdated: 1,
          message: 'تم تحديث بيانات الحساب بنجاح'
        })
  })
})
