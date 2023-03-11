import { Link, useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import BackButton from '../components/Icons/BackButton'
import { useCart } from '../contexts/CartContext'
import { Item } from '../types'
import Controls from './Cart/Controls'

const Product = () => {
  const { id } = useParams()

  const { items, addItem, inCart } = useCart()
  const alreadyAdded = inCart(id!)

  const product = {
    id: id!,
    name: 'حذاء نايك ام-اكس سوبر 5000',
    imgUrl:
      'https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D',
    discount: true,
    currentPrice: 249,
    oldPrice: 299,
    rating: 5.0,
    quantity: 1,
    description: `حذاء جديد بتصميم عصري وأنيق سيبدو رائع عليك! حذاء جديد بتصميم عصري وأنيق سيبدو
            رائع عليك! حذاء جديد بتصميم عصري وأنيق سيبدو رائع عليك! حذاء جديد بتصميم عصري
            وأنيق سيبدو رائع عليك!`
  }

  return (
    <>
      <div className='relative w-full overflow-hidden rtl flex flex-col justify-between h-screen'>
        <div className='flex'>
          <Link to={`/`} className='absolute z-50 top-6 left-6'>
            <BackButton className='w-8 h-8' />
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
              {product.rating.toFixed(1)}
            </span>
            {[...Array(Math.round(product.rating)).keys()].map(
              (_star: any, idx: number) => (
                <svg
                  key={idx}
                  aria-hidden='true'
                  className='h-5 w-5 text-yellow-300'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
                </svg>
              )
            )}
          </div>

          <div className='flex flex-col gap-y-2 pb-6'>
            <h3 className='font-bold text-lg'>الوصف</h3>
            <p className='text-gray-700'>{product.description}</p>
          </div>

          <div className='flex items-center justify-between'>
            <p>
              <span className='text-2xl font-bold text-slate-900'>
                {product.currentPrice} ج.س
              </span>
              {product.discount && (
                <span className='text-sm text-slate-900 line-through pr-1'>
                  {product.oldPrice} ج.س
                </span>
              )}
            </p>

            {alreadyAdded ? (
              <>
                {items
                  .filter((item: Item) => item.id === id)
                  .map((item: Item) => (
                    <Controls key={item.id} item={item} />
                  ))}
              </>
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
      <Footer />
    </>
  )
}

export default Product
