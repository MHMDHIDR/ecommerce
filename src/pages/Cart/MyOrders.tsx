import { Suspense } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../contexts/CartContext'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import { LoadingPage } from '../../components/Loading'
import Layout from '../../components/Layout'
import NoItems from '../../components/NoItems'
import { TrashBtn } from '../../components/Icons/ControlBtn'
import Controls from './Controls'
import { Item } from '../../types'

const Cart = () => {
  useDocumentTitle('السلة')

  const { items, isEmpty, emptyCart, cartTotal, totalItems } = useCart()

  return (
    <Suspense fallback={<LoadingPage />}>
      <Layout>
        <section className='container px-5 mx-auto rtl mb-24'>
          {!isEmpty ? (
            <>
              <div className='flex flex-col gap-y-3'>
                <div className='flex justify-between'>
                  <span>طلباتي</span>
                  <div className='flex gap-x-2'>
                    <Link to={`/cart`}>تحت الاجراء</Link>
                    <Link to={`/completed-orders`}>مكتملة</Link>
                  </div>
                </div>
                {/* bg-gray-100 px-3 py-1 rounded-xl mb-4 inline */}
                <TrashBtn
                  className='w-5 h-5 fill-red-600'
                  onClick={emptyCart}
                  label='تفريغ السلة'
                />
                {items.map((item: Item) => (
                  <div key={item.id} className='border-b py-2'>
                    <Link
                      to={`/product/${item.id}`} //to product link using id or name [/product/:name] to make url more SEO friendly
                      className='flex items-center gap-x-3 bg-white overflow-hidden'
                    >
                      <img
                        className='h-16 w-16 rounded-lg object-cover'
                        src={item.imgUrl}
                        alt={item.name}
                      />
                      <div className='py-2'>
                        <h5 className='text-md font-semibold text-gray-800'>
                          {item.name}
                        </h5>
                        <p className='text-sm text-gray-600 truncate max-w-[25%]'>
                          {item.description}
                        </p>
                        <span className='text-md font-bold text-gray-800'>
                          {item.currentPrice} ج.س
                        </span>
                      </div>
                    </Link>

                    <Controls item={item} />
                  </div>
                ))}
              </div>
              {/* Total Price */}
              <div className='p-3 border border-gray-400 rounded-xl my-10 space-y-2'>
                <div className='flex justify-between border-b pb-2'>
                  <span>سعر الطلبات</span>
                  <span>{cartTotal} ج.س</span>
                </div>
                <div className='flex justify-between border-b pb-2'>
                  <span>التوصيل</span>
                  <span>{(cartTotal * 0.1).toFixed()} ج.س</span>
                </div>
                <div className='flex justify-between'>
                  <span>مجموع السلة</span>
                  <span className='flex gap-x-2 items-center'>
                    <sub className='text-gray-500'>
                      ({totalItems} {totalItems > 2 ? 'مواد' : 'مادة'})
                    </sub>
                    <span className='text-lg font-bold'>
                      {cartTotal + parseInt((cartTotal * 0.1).toFixed())} ج.س
                    </span>
                  </span>
                </div>
              </div>
              <Link
                to='/order-address'
                className='flex items-center justify-center rounded-md bg-blue-600 py-2.5 text-sm text-white hover:bg-gray-700 focus:outline-none'
              >
                التأكد من بيانات الطلب
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
            </>
          ) : (
            <NoItems
              className='mt-40'
              links={[
                { to: `../`, label: 'تصفح المنتجات' },
                { to: `../`, label: 'الصفحة الرئيسية' }
              ]}
            />
          )}
        </section>
      </Layout>
    </Suspense>
  )
}

export default Cart
