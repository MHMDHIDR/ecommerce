import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Product = () => {
  const [count, setCount] = useState(1)

  return (
    <div className='relative w-full overflow-hidden rtl flex flex-col justify-between h-screen'>
      <div className='flex'>
        <Link to={`/`} className='absolute z-50 top-6 left-6'>
          <img
            className='mb-10'
            src='/assets/img/icons/arrow.svg'
            width='32'
            height='32'
            alt='Arrow'
          />
        </Link>
        <span className='absolute top-0 right-0 w-28 py-1 translate-y-4 translate-x-8 rotate-45 bg-blue-600 text-center text-sm text-white'>
          تخفيض
        </span>
        <Link to='#' className='block h-[25rem]'>
          <img
            className='h-full w-full object-cover object-right'
            src='https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D'
            alt='product image'
          />
        </Link>
      </div>
      <div className='px-5 py-6 bg-white rounded-tl-3xl rounded-tr-3xl -translate-y-10 flex-1 min-h-screen'>
        <h5 className='flex justify-between text-xl font-semibold tracking-tight text-slate-900'>
          <Link to='#'>حذاء نايك ام-اكس سوبر 5000</Link>
          <div className='flex justify-center w-24 bg-gray-100 py-2 px-5 rounded-full'>
            <svg
              className='fill-current text-gray-600'
              viewBox='0 0 448 512'
              onClick={() => setCount(prev => prev - 1)}
            >
              <path d='M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z' />
            </svg>
            <input
              className='text-center w-8 bg-gray-100'
              type='number'
              value={count}
              onChange={e => setCount(parseInt(e.target.value))}
            />
            <svg
              className='fill-current text-gray-600'
              viewBox='0 0 448 512'
              onClick={() => setCount(prev => prev + 1)}
            >
              <path d='M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z' />
            </svg>
          </div>
        </h5>

        <div className='mt-2.5 mb-5 flex items-center'>
          <span className='ml-2 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold'>
            5.0
          </span>
          <svg
            aria-hidden='true'
            className='h-5 w-5 text-yellow-300'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
          </svg>
          <svg
            aria-hidden='true'
            className='h-5 w-5 text-yellow-300'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
          </svg>
          <svg
            aria-hidden='true'
            className='h-5 w-5 text-yellow-300'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
          </svg>
          <svg
            aria-hidden='true'
            className='h-5 w-5 text-yellow-300'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
          </svg>
          <svg
            aria-hidden='true'
            className='h-5 w-5 text-yellow-300'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
          </svg>
        </div>
        <div className='flex flex-col gap-y-2 pb-6'>
          <h3 className='font-bold text-lg'>الوصف</h3>
          <p className='text-gray-700'>
            حذاء جديد بتصميم عصري وأنيق سيبدو رائع عليك! حذاء جديد بتصميم عصري وأنيق سيبدو
            رائع عليك! حذاء جديد بتصميم عصري وأنيق سيبدو رائع عليك! حذاء جديد بتصميم عصري
            وأنيق سيبدو رائع عليك!
          </p>
        </div>
        <div className='flex items-center justify-between'>
          <p>
            <span className='text-2xl font-bold text-slate-900'>249 ج.س </span>
            <span className='text-sm text-slate-900 line-through'>299 ج.س </span>
          </p>
          <Link
            to='#'
            className='flex items-center rounded-md bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300'
          >
            أضف الى السلة
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
        </div>
      </div>
    </div>
  )
}

export default Product
