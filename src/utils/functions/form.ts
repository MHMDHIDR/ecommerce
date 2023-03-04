import { fileRequestProps } from '@types'

export default async function formHandler(req: fileRequestProps) {
  return await new Promise((resolve, reject) => {
    const form = formidable()

    form.parse(req, (err: any, fields: any, files: any) => {
      if (err) reject({ err })
      resolve({ err, fields, files })
    })
  })
}
