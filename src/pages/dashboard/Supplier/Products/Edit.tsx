import { Suspense, useEffect, useState } from 'react'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import { LoadingPage } from '@/components/Loading'
import FileUpload from '@/components/FileUpload'
import { isSmallScreen } from '@/constants'
import BackButton from '@/components/Icons/BackButton'
import Layout from '@/components/Layout'
import { useParams } from 'react-router-dom'
import useAxios from '@/hooks/useAxios'

const EditProduct = () => {
  const TITLE = 'تعديل المنتج'
  useDocumentTitle(TITLE)

  const { id } = useParams()
  const { response, loading } = useAxios({ url: `/products/${id}` })
  const [produt, setProduct] = useState<any>()
  const [itemDesc, setItemDesc] = useState('')

  useEffect(() => {
    response && setProduct(response[0])
    return () => setProduct([''])
  }, [response])

  return loading ? (
    <LoadingPage />
  ) : (
    <Layout>
      <section className='container overflow-x-hidden px-5 rtl mx-auto max-w-6xl h-full'>
        {isSmallScreen && (
          <BackButton to='/' className='w-8 h-8 absolute z-50 top-6 left-6' />
        )}
        <h2 className='text-xl text-center my-16'>{TITLE}</h2>
        <form className='relative flex flex-col items-center'>
          <label htmlFor='uploadImg' className='flex items-center gap-y-2 flex-col'>
            <FileUpload
              data={{
                defaultImg: [
                  {
                    ImgDisplayName: produt?.itemName,
                    ImgDisplayPath: produt?.imgUrl
                  }
                ],
                imgName: produt?.itemName,
                label: 'تغيير صورة'
              }}
            />
          </label>
          <label htmlFor='username' className='form__group'>
            <span className='form__label'>اسم المنتج</span>
            <input
              type='text'
              id='username'
              className='form__input'
              onChange={e => console.log(e.target.value.trim())}
              defaultValue={produt?.itemName}
              required
            />
          </label>
          <label htmlFor='price' className='form__group'>
            <span className='form__label'>السعر</span>
            <input
              type='number'
              id='price'
              className='form__input'
              onChange={e => console.log(e.target.value.trim())}
              defaultValue={produt?.currentPrice}
              required
            />
          </label>
          <label htmlFor='category' className='form__group'>
            <span className='form__label active'>التصنيف</span>
            <select id='category' className='form__input'>
              <option value=''>اختر التصنيف</option>
              {/* {categoryList?.map((category, idx) => ( */}
              <option value={'category[0]'}>{'category[1]'}</option>
              {/* ))} */}
            </select>
          </label>

          <label htmlFor='description' className='form__group'>
            <span className='form__label'>وصف المنتج</span>
            <textarea
              name='description'
              id='description'
              minLength={10}
              maxLength={300}
              className='form__input'
              onChange={e => setItemDesc(e.target.value.trim())}
              defaultValue={produt?.description}
              required
            ></textarea>
          </label>

          <div className='flex items-center gap-x-20'>
            <button
              type='submit'
              className='min-w-[7rem] bg-green-600 hover:bg-green-700 text-white py-1.5 px-6 rounded-md'
            >
              تحديث
            </button>
            <button
              type='submit'
              className='min-w-[7rem] bg-red-600 hover:bg-red-700 text-white py-1.5 px-6 rounded-md'
            >
              حذف
            </button>
          </div>
        </form>
      </section>
    </Layout>
  )
}

export default EditProduct
