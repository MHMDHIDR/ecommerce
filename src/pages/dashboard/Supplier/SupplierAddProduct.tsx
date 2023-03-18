import { Suspense, useState } from 'react'
import useDocumentTitle from '../../../hooks/useDocumentTitle'
import { LoadingPage } from '../../../components/Loading'
import FileUpload from '../../../components/FileUpload'
import { isSmallScreen } from '../../../constants'
import BackButton from '../../../components/Icons/BackButton'
import Layout from '../../../components/Layout'
import { Link } from 'react-router-dom'
import goTo from '../../../utils/functions/goTo'

const SupplierAddProduct = () => {
  const TITLE = 'إضافة منتج جديد'
  useDocumentTitle(TITLE)

  const [itemDesc, setItemDesc] = useState('')

  return (
    <Suspense fallback={<LoadingPage />}>
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
                      ImgDisplayName: 'profile',
                      ImgDisplayPath: 'https://tecdn.b-cdn.net/img/new/avatars/2.jpg'
                    }
                  ],
                  imgName: 'profile',
                  label: 'أضف صورة'
                }}
              />
            </label>
            <label htmlFor='username' className='form__group'>
              <span className='form__label'>اسم المنتج</span>
              <input
                type='text'
                id='username'
                className='form__input'
                required
                onChange={e => console.log(e.target.value.trim())}
              />
            </label>
            <label htmlFor='price' className='form__group'>
              <span className='form__label'>السعر</span>
              <input
                type='number'
                id='price'
                className='form__input'
                required
                onChange={e => console.log(e.target.value.trim())}
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
                required
                onChange={e => setItemDesc(e.target.value.trim())}
              ></textarea>
            </label>

            <div className='flex items-center gap-x-20'>
              <button
                type='submit'
                className='min-w-[7rem] bg-green-600 hover:bg-green-700 text-white py-1.5 px-6 rounded-md'
              >
                إضافة
              </button>
              <Link
                to={goTo('menu')}
                className='text-gray-800 underline-hover text-bold dark:text-white'
              >
                القائمة
              </Link>
            </div>
          </form>
        </section>
      </Layout>
    </Suspense>
  )
}

export default SupplierAddProduct
