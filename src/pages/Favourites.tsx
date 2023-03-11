import { Suspense } from 'react'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { LoadingPage } from '../components/Loading'
import Layout from '../components/Layout'
import { Link } from 'react-router-dom'
import { CartIconLined } from '../components/Icons/CartIcon'
import Search from '../components/Search'
import { useCart } from '../contexts/CartContext'
import abstractText from '../utils/functions/abstractText'
import { Item } from '../types'
import Controls from './Cart/Controls'

const Favourites = () => {
  useDocumentTitle('قائمة المفضلة')

  const { items, addItem, inCart } = useCart()

  const PRODUCT = (id: string) => {
    return {
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
  }

  return (
    <Suspense fallback={<LoadingPage />}>
      <Layout>
        <section className='container px-5 mx-auto rtl mb-20'>
          <Search small={true} className='my-7' />

          <h1 className='font-bold'>قائمة المفضلة</h1>
          <div className='flex flex-col gap-y-3'>
            {[...Array(Math.round(10)).keys()].map((_, idx) => {
              const id = String(idx + 1)
              const alreadyAdded = inCart(id)

              return (
                <div
                  key={id}
                  className='flex items-center gap-x-3 overflow-hidden rounded-lg bg-white px-2 shadow-md'
                >
                  <img
                    className='h-16 w-16 rounded-lg object-cover'
                    src={PRODUCT(id).imgUrl}
                    alt={PRODUCT(id).name}
                  />

                  <div className='py-2 w-full'>
                    <Link to={`/product/${id}`}>
                      <h5 className='text-md font-semibold text-gray-800'>
                        {PRODUCT(id).name}
                      </h5>
                      <p className='text-sm text-gray-600'>
                        {abstractText(PRODUCT(id).description, 30)}
                      </p>
                    </Link>
                    <div className='flex justify-between mt-1'>
                      <span className='text-md font-bold text-gray-800'>
                        {PRODUCT(id).currentPrice} ج.س
                      </span>
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
                          onClick={() => addItem(PRODUCT(id))}
                          className='flex text-xs items-center rounded-full bg-blue-600 py-1 px-3 text-white hover:bg-gray-700 focus:outline-none'
                        >
                          <CartIconLined className='ml-2' />
                          أضف الى السلة
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </Layout>
    </Suspense>
  )
}

export default Favourites
