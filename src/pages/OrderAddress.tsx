import { Suspense, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import { LoadingPage } from '@/components/Loading'
import Layout from '@/components/Layout'
import { useCart } from '@/contexts/CartContext'
import ModalSuccess from '@/components/Modal/ModalSuccess'
import { USER_DATA, isSmallScreen } from '@/constants'
import abstractText from '@/utils/abstractText'
import NoItems from '@/components/NoItems'
import { getCookies } from '@/utils/cookies'
import { useAxios } from '@/hooks/useAxios'
import { parseJson, stringJson } from '@/utils/jsonTools'
import useAuth from '@/hooks/useAuth'
import { AppSettingsProps, UserType } from '@/types'
import { AppSettingsContext } from '@/contexts/AppSettingsContext'

const OrderAddress = () => {
  useDocumentTitle('عنوان الطلب')
  const token = getCookies()
  const { loading, userData } = useAuth()
  const { getLocalStorageUser } = useContext<AppSettingsProps>(AppSettingsContext)

  const { id: accountId } = loading
    ? parseJson(getLocalStorageUser())[0] || USER_DATA
    : userData

  const { items, cartTotal, emptyCart, isEmpty } = useCart()
  const [isOrderSuccess, setIsOrderSuccess] = useState(false)

  const [fetchedUser, setFetchedUser] = useState<UserType | null>(null)
  const { loading: loadingFetch, response } = useAxios({
    url: `/users/${accountId}`,
    headers: stringJson({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    })
  })

  useEffect(() => {
    if (!loadingFetch && response !== null) {
      setFetchedUser(response !== null && response[0])
    }
  }, [response])

  const handleCheckout = () => {
    setIsOrderSuccess(true)
    emptyCart()
  }

  return loadingFetch ? (
    <LoadingPage />
  ) : (
    <Layout>
      <section className='container px-5 mx-auto rtl mb-20 flex flex-col gap-y-7 max-w-6xl'>
        {!isEmpty ? (
          <>
            {isOrderSuccess && (
              <ModalSuccess
                msg={`مبروك تم الشراء بنجاح! بإمكانك العودة بالضغط على الزر أدناه`}
              />
            )}
            <div>
              <h1 className='font-bold my-4'>عنوان التوصيل</h1>
              <ul className='flex flex-col justify-center border gap-x-3 p-5 rounded-xl shadow-xl overflow-hidden space-y-3'>
                <li className='flex gap-x-2'>
                  <span className='font-bold'>رقم المنزل: </span>
                  <span className='text-gray-700 dark:text-gray-50'>
                    {fetchedUser?.houseNumber}
                  </span>
                </li>
                <li className='flex gap-x-2'>
                  <span className='font-bold'>الشارع:</span>
                  <span className='text-gray-700 dark:text-gray-50'>
                    {fetchedUser?.streetName}
                  </span>
                </li>
                <li className='flex gap-x-2'>
                  <span className='font-bold'>الحي: </span>
                  <span className='text-gray-700 dark:text-gray-50'>
                    {fetchedUser?.neighborhoodName}
                  </span>
                </li>
                <li className='flex gap-x-2'>
                  <span className='font-bold'>المدينة: </span>
                  <span className='text-gray-700 dark:text-gray-50'>
                    {fetchedUser?.cityName}
                  </span>
                </li>
                <li className='flex gap-x-2'>
                  <span className='font-bold'>رقم الهاتف: </span>
                  <span className='text-gray-700 dark:text-gray-50'>
                    {fetchedUser?.phone}
                  </span>
                </li>
              </ul>
              <Link
                to='/profile/shipping-address'
                className='inline-block min-w-fit text-sx bg-green-600 hover:bg-green-700 text-white py-1 px-3 my-5 rounded-md'
              >
                تعديل عنوان التوصيل
              </Link>
            </div>
            <div>
              <h1 className='font-bold mb-2'>الطلبات</h1>
              {items.map((item: any) => (
                <Link
                  key={item.id}
                  to={`/product/${item.id}`} //to product link using id or name [/product/:name] to make url more SEO friendly
                  className='flex items-center gap-x-3 bg-white dark:bg-gray-700 overflow-hidden rounded-xl shadow-md p-2 mb-2'
                >
                  <img
                    className='h-16 w-16 rounded-lg object-cover'
                    src={item.imgUrl}
                    alt={item.name}
                  />
                  <div className='py-2'>
                    <h5 className='text-md font-semibold text-gray-800 dark:text-gray-50'>
                      {item.name}
                    </h5>
                    <p className='text-sm text-gray-600 dark:text-gray-50'>
                      {isSmallScreen
                        ? abstractText(item.description, 77)
                        : item.description}
                    </p>
                    <span className='text-md font-bold text-gray-800 dark:text-gray-50'>
                      {item.currentPrice} ج.س
                    </span>
                    <span className='px-2'>x</span>
                    <input
                      className='text-center w-8 bg-gray-100 dark:bg-gray-800 p-0.5 font-bold rounded-xl'
                      type='number'
                      value={item.quantity}
                      disabled
                    />
                  </div>
                </Link>
              ))}
            </div>
            <div className='flex justify-between'>
              <span className='flex gap-x-2 items-center'>
                <sub className='text-gray-500'>السعر الاجمالي</sub>
                <span className='text-lg font-bold'>
                  {cartTotal + parseInt((cartTotal * 0.1).toFixed())} ج.س
                </span>
              </span>
              <button
                type='button'
                onClick={handleCheckout}
                className='flex items-center justify-center rounded-full bg-blue-600 py-2.5 px-5 text-sm text-white hover:bg-gray-700 focus:outline-none'
              >
                إكمال عملية الشراء
              </button>
            </div>
          </>
        ) : (
          <NoItems
            className='mt-40'
            links={[
              { to: `/products`, label: 'تصفح المنتجات' },
              { to: `/`, label: 'الصفحة الرئيسية' }
            ]}
          />
        )}
      </section>
    </Layout>
  )
}

export default OrderAddress
