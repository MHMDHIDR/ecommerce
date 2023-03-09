import { Suspense, useState } from 'react'
import { Link } from 'react-router-dom'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { LoadingPage } from '../components/Loading'
import Layout from '../components/Layout'
import { MAX_QUANTITY } from '../constants'
import { AddBtn, MinusBtn } from '../components/Icons/Controls'

const Cart = () => {
  useDocumentTitle('السلة')
  const [count, setCount] = useState(1)

  const products = [...Array(5).keys()]

  return (
    <Suspense fallback={<LoadingPage />}>
      <Layout>
        <section className='container px-5 mx-auto rtl mb-20'>
          <h1 className='font-bold'>سلة الطلبات</h1>
          <div className='flex flex-col gap-y-3'>
            {products.map((_product: any, idx: number) => (
              <Link
                to={`#`} //to product link using id or name [/product/:name]
                key={idx}
                className='flex items-center gap-x-3 overflow-hidden rounded-lg bg-white px-2 border-b'
              >
                <img
                  className='h-16 w-16 rounded-lg object-cover'
                  src='https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
                  alt='product image'
                />
                <div className='py-2'>
                  <h5 className='text-md font-semibold text-gray-800'>حذاء سوبر 5000</h5>
                  <p className='text-sm text-gray-600'>حذاء رياضي ذو جودة عالية</p>
                  <span className='text-md font-bold text-gray-800'>249 ج.س</span>
                </div>

                {/* Count buttons */}
                <div className='flex justify-center w-24 bg-gray-100 py-2 px-5 rounded-full'>
                  <AddBtn
                    onClick={() => setCount(prev => (prev > 1 ? prev - 1 : prev))}
                  />
                  <input
                    className='text-center w-8 bg-gray-100'
                    type='number'
                    value={count}
                    min={1}
                    max={MAX_QUANTITY}
                    onChange={e => setCount(parseInt(e.target.value))}
                  />
                  <MinusBtn
                    onClick={() =>
                      setCount(prev => (prev < MAX_QUANTITY ? prev + 1 : prev))
                    }
                  />
                </div>
              </Link>
            ))}
          </div>
          {/* Total Price */}
          <div className='p-3 border border-gray-400 rounded-xl my-10 space-y-2'>
            <div className='flex justify-between border-b pb-2'>
              <span>سعر الطلبات</span>
              <span>400 ج.س</span>
            </div>
            <div className='flex justify-between border-b pb-2'>
              <span>التوصيل</span>
              <span>50 ج.س</span>
            </div>
            <div className='flex justify-between'>
              <span>مجموع السلة</span>
              <span className='flex gap-x-2 items-center'>
                <sub className='text-gray-500'>(3 مواد)</sub>
                <span className='text-lg font-bold'>450 ج.س</span>
              </span>
            </div>
          </div>
          <Link
            to='#'
            className='flex items-center justify-center rounded-md bg-blue-600 px-5 py-2.5 text-center text-sm text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300'
          >
            أكمل عملية الشراء
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='mr-2 h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth='2'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
              />
            </svg>
          </Link>
        </section>
      </Layout>
    </Suspense>
  )
}

export default Cart
