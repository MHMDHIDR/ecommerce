import { Suspense, useState } from 'react'
import useDocumentTitle from '../../../hooks/useDocumentTitle'
import { LoadingPage } from '../../../components/Loading'
import FileUpload from '../../../components/FileUpload'
import { isSmallScreen, ORDER } from '../../../constants'
import BackButton from '../../../components/Icons/BackButton'
import Layout from '../../../components/Layout'
import { Link } from 'react-router-dom'
import goTo from '../../../utils/functions/goTo'
import { AcceptBtn, RejectBtn } from '../../../components/OrdersTableActions'

const DashboardOrderDetails = () => {
  const TITLE = 'تفاصيل الطلب'
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

          <div className='flex items-center justify-center gap-x-20'>
            {ORDER.orderStatus === 'pending' ? (
              <>
                <AcceptBtn id={'order._id'} email={'order.userEmail'} />
                <RejectBtn id={'order._id'} email={'order.userEmail'} />
              </>
            ) : ORDER.orderStatus === 'accept' ? (
              <RejectBtn id={'order._id'} email={'order.userEmail'} />
            ) : ORDER.orderStatus === 'reject' ? (
              <AcceptBtn id={'order._id'} email={'order.userEmail'} />
            ) : (
              <Link
                to={goTo('supplier')}
                className='text-gray-800 underline-hover text-bold dark:text-white'
              >
                العودة للطلبات
              </Link>
            )}
          </div>
        </section>
      </Layout>
    </Suspense>
  )
}

export default DashboardOrderDetails
