import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AddBtn, MinusBtn } from '../components/Icons/Controls'
import { MAX_QUANTITY } from '../constants'
import { useCart } from '../contexts/CartContext'

const Product = () => {
  const [count, setCount] = useState(1)

  const { addItem, inCart, setCartMetadata } = useCart()
  const { id } = useParams()
  const alreadyAdded = inCart(id!)

  const product = {
    id: id!,
    name: 'حذاء نايك ام-اكس سوبر 5000',
    price: 14500,
    imgUrl:
      'https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D',
    discount: true,
    rating: 5.0,
    description: `حذاء جديد بتصميم عصري وأنيق سيبدو رائع عليك! حذاء جديد بتصميم عصري وأنيق سيبدو
            رائع عليك! حذاء جديد بتصميم عصري وأنيق سيبدو رائع عليك! حذاء جديد بتصميم عصري
            وأنيق سيبدو رائع عليك!`
  }

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

        {product.discount && (
          <span className='absolute top-0 right-0 w-28 py-1 translate-y-4 translate-x-8 rotate-45 bg-blue-600 text-center text-sm text-white'>
            تخفيض
          </span>
        )}

        <Link to='#' className='block h-[25rem]'>
          <img
            className='h-full w-full object-cover object-right'
            src={product.imgUrl}
            alt={product.name}
          />
        </Link>
      </div>

      <div className='px-5 py-6 bg-white rounded-tl-[2rem] rounded-tr-[2rem] -translate-y-10 flex-1 min-h-screen'>
        <h5 className='flex justify-between text-xl font-semibold tracking-tight text-slate-900'>
          <Link to={`/product/${id}`}>{product.name}</Link>
        </h5>

        <div className='mt-2.5 mb-5 flex items-center'>
          <span className='ml-2 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold'>
            {product.rating}
          </span>
          {[...Array(product.rating).keys()].map((_star: any, idx: number) => (
            <svg
              aria-hidden='true'
              className='h-5 w-5 text-yellow-300'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
              key={idx}
            >
              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
            </svg>
          ))}
        </div>

        <div className='flex flex-col gap-y-2 pb-6'>
          <h3 className='font-bold text-lg'>الوصف</h3>
          <p className='text-gray-700'>{product.description}</p>
        </div>

        <div className='flex items-center justify-between'>
          <p>
            <span className='text-2xl font-bold text-slate-900'>249 ج.س </span>
            {product.discount && (
              <span className='text-sm text-slate-900 line-through'>299 ج.س </span>
            )}
          </p>

          {alreadyAdded ? (
            <div className='flex justify-center w-24 bg-gray-100 py-2 px-5 rounded-full'>
              <AddBtn onClick={() => setCount(prev => (prev < 10 ? prev + 1 : prev))} />
              <input
                className='text-center w-8 bg-gray-100'
                type='number'
                value={count}
                min={1}
                max={MAX_QUANTITY}
                onChange={e => setCount(parseInt(e.target.value))}
              />
              <MinusBtn onClick={() => setCount(prev => (prev > 1 ? prev - 1 : prev))} />
            </div>
          ) : (
            <button
              type='button'
              onClick={() => addItem(product)}
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
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Product
