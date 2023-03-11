import { Key, useContext } from 'react'
import { FileUploadContext } from '../contexts/FileUploadContext'
import { FileUploadProps, ImgsProps } from '../types'
import Pen from './Icons/Pen'

const FileUpload = ({ data }: any) => {
  const { file, fileURLs, onFileRemove, onFileAdd } =
    useContext<FileUploadProps>(FileUploadContext)

  return (
    <>
      <div
        className={`flex flex-wrap justify-center gap-5 py-3 overflow-y-auto w-[30rem]`}
      >
        {fileURLs.length > 0
          ? fileURLs.map((fileURL: string, index: number) => (
              <div
                key={index}
                className={`flex items-center flex-col gap-y-3 max-h-44 h-44 place-content-center relative`}
              >
                <img
                  loading='lazy'
                  src={fileURL}
                  alt={data?.imgName}
                  className={`object-cover p-1 border border-gray-400 max-w-[7rem] w-20 min-h-fit h-20 dark:border-gray-300 rounded-xl`}
                />
                <label htmlFor='profileImg' className='relative cursor-pointer'>
                  <Pen className='w-5 h-5 bg-green-200 p-1 rounded-md absolute bottom-8 -right-1.5 shadow' />
                  <span>تغيير الصورة</span>
                </label>
                <button
                  type='button'
                  className='px-2 py-0.5 absolute top-5 -right-3 inline-block text-sm text-white transition-colors bg-red-500 rounded-full hover:bg-red-700'
                  onClick={() => onFileRemove(fileURL, file[index].name)}
                >
                  &times;
                </button>
              </div>
            ))
          : data.defaultImg.length > 0
          ? data.defaultImg.map(
              ({ ImgDisplayName, ImgDisplayPath }: ImgsProps, index: Key) => (
                <label
                  key={index}
                  htmlFor='profileImg'
                  className='flex items-center flex-col gap-y-3 max-h-44 h-44 place-content-center cursor-pointer relative'
                >
                  <img
                    src={ImgDisplayPath}
                    alt={ImgDisplayName}
                    className='object-cover p-1 border border-gray-400 w-20 min-h-fit h-20 dark:border-gray-300 rounded-xl'
                  />
                  <Pen className='w-5 h-5 bg-green-200 p-1 rounded-md absolute bottom-16 -right-1 shadow' />
                  تغيير الصورة
                </label>
              )
            )
          : null}
      </div>

      <input
        type='file'
        name='profileImg'
        id='profileImg'
        className='hidden'
        accept='image/*'
        onChange={onFileAdd}
        required
      />
    </>
  )
}

export default FileUpload
