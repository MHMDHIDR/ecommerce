import { Suspense, useContext, useState } from 'react'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { LoadingPage } from '../components/Loading'
import Layout from '../components/Layout'
import { MAX_QUANTITY } from '../constants'
import { AddBtn, MinusBtn } from '../components/Icons/ControlBtn'
import Pen from '../components/Icons/Pen'
import { FileUploadProps } from '../types'
import FileUploadContext from '../contexts/FileUploadContext'

const EditProfile = () => {
  useDocumentTitle('إعدادات الحساب')

  // const { file, fileURLs, onFileRemove, onFileAdd } =
  //   useContext<FileUploadProps>(FileUploadContext)

  return (
    <Suspense fallback={<LoadingPage />}>
      <Layout>
        <section className='container px-5 mx-auto rtl flex justify-center items-center'>
          <div className='relative flex flex-col items-center'>
            <label htmlFor='uploadImg' className='flex items-center gap-y-2 flex-col'>
              <input
                type='file'
                name='uploadImg'
                id='uploadImg'
                className='hidden'
                accept='image/*'
                // onChange={onFileAdd}
                required
              />
              <img
                src='https://tecdn.b-cdn.net/img/new/avatars/2.jpg'
                height='70px'
                width='70px'
                className='rounded-lg max-w-min max-h-min'
                alt='User Profile'
                loading='lazy'
              />
              {/* {fileURLs.map((fileURL: string, index: number) => (
                <div
                  key={index}
                  className={`flex items-center flex-col gap-y-3 max-h-44 h-44 place-content-center`}
                >
                  <img
                    loading='lazy'
                    src={fileURL}
                    alt={'data?.foodName'}
                    className={`object-cover p-1 border border-gray-400 max-w-[7rem] w-28 min-h-fit h-28 dark:border-gray-300 rounded-xl`}
                  />
                  <button
                    type='button'
                    className='px-6 py-1 text-white transition-colors bg-red-500 rounded-full hover:bg-red-700'
                    onClick={() => onFileRemove(fileURL, file[index].name)}
                  >
                    حذف
                  </button>
                </div>
              ))} */}
              <Pen className='w-5 h-5 bg-white p-1 rounded-md absolute bottom-6 -right-1 shadow' />
              <span>تغيير الصورة</span>
            </label>
          </div>
        </section>
      </Layout>
    </Suspense>
  )
}

export default EditProfile
