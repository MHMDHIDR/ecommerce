import { Link, useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import BackButton from '../components/Icons/BackButton'
import { CartIconLined } from '../components/Icons/CartIcon'
import { PRODUCT } from '../constants'
import { useCart } from '../contexts/CartContext'
import { Item } from '../types'
import Controls from './Cart/Controls'

const Product = () => {
  const { id } = useParams()
  const { items, addItem, inCart } = useCart()
  const alreadyAdded = inCart(id!)

  return (
    <>
      <div className='relative w-full overflow-hidden rtl flex flex-col justify-between h-screen'>
        <div className='flex'>
          <BackButton to='/' className='w-8 h-8 absolute z-50 top-6 left-6' />

          {PRODUCT(id!).discount && (
            <span className='absolute top-0 right-0 w-28 py-1 translate-y-4 translate-x-8 rotate-45 bg-blue-600 text-center text-sm text-white'>
              تخفيض
            </span>
          )}

          <Link to='#' className='block h-[25rem]'>
            <img
              className='h-full w-full object-cover object-right'
              src={PRODUCT(id!).imgUrl}
              alt={PRODUCT(id!).name}
            />
          </Link>
        </div>

        <div className='px-5 py-6 bg-white dark:bg-gray-800 rounded-tl-[2rem] rounded-tr-[2rem] -translate-y-10 flex-1 min-h-screen'>
          <h5 className='flex justify-between text-xl font-semibold tracking-tight'>
            <Link to={`/product/${id}`}>{PRODUCT(id!).name}</Link>
          </h5>

          <div className='mt-2.5 mb-5 flex items-center'>
            <span className='ml-2 rounded bg-yellow-200 dark:text-black px-2.5 py-0.5 text-xs font-semibold'>
              {PRODUCT(id!).rating.toFixed(1)}
            </span>
            {[...Array(Math.round(PRODUCT(id!).rating)).keys()].map(
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
            <p className='text-gray-700 dark:text-gray-50'>{PRODUCT(id!).description}</p>
          </div>

          <div className='flex items-center justify-between'>
            <p>
              <span className='text-2xl font-bold text-gray-800 dark:text-gray-50'>
                {PRODUCT(id!).currentPrice} ج.س
              </span>
              {PRODUCT(id!).discount && (
                <span className='text-sm text-gray-800 dark:text-gray-50 line-through pr-1'>
                  {PRODUCT(id!).oldPrice} ج.س
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
                onClick={() => addItem(PRODUCT(id!))}
                className='flex items-center rounded-md bg-blue-600 px-5 py-2.5 text-center text-sm text-white hover:bg-gray-700 focus:outline-none'
              >
                <CartIconLined className='ml-2' />
                أضف الى السلة
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
