import { Suspense, useContext } from 'react'
import { Link } from 'react-router-dom'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import { AppSettingsContext } from '@/contexts/AppSettingsContext'
import { LoadingPage } from '@/components/Loading'
import Layout from '@/components/Layout'
import NoItems from '@/components/NoItems'
import CartHeader from './CartHeader'
import abstractText from '@/utils/abstractText'
import { PRODUCT, USER_DATA } from '@/constants'
import { AppSettingsProps } from '@/types'
import useAuth from '@/hooks/useAuth'
import { parseJson } from '@/utils/jsonTools'
import ModalNotFound from '@/components/Modal/ModalNotFound'

const CompletedOrders = ({ isNoPreviousOrders = false }) => {
  useDocumentTitle('طلباتي')

  const { getLocalStorageUser } = useContext<AppSettingsProps>(AppSettingsContext)
  const { userData } = useAuth()
  const { type: accountType } = getLocalStorageUser()
    ? parseJson(getLocalStorageUser())[0] || (userData ?? { type: 'user' })
    : USER_DATA

  return (
    <Suspense fallback={<LoadingPage />}>
      {accountType !== 'user' ? (
        <ModalNotFound />
      ) : (
        <Layout>
          <section className='container px-5 mx-auto rtl mb-24 max-w-6xl'>
            <CartHeader />
            {!isNoPreviousOrders ? (
              <div className='flex flex-col gap-y-3'>
                {[...Array(Math.round(10)).keys()].map((_, idx) => {
                  const id = String(idx + 1)

                  return (
                    <div
                      key={id}
                      className='flex items-center gap-x-3 overflow-hidden rounded-lg bg-white dark:bg-gray-700 px-2 shadow-md'
                    >
                      <img
                        className='h-16 w-16 rounded-lg object-cover'
                        src={PRODUCT(id).imgUrl}
                        alt={PRODUCT(id).itemName}
                      />

                      <div className='py-2 w-full'>
                        <Link to={`/product/${id}`}>
                          <h5 className='text-md font-semibold text-gray-800 dark:text-gray-50'>
                            {PRODUCT(id).itemName}
                          </h5>
                          <p className='text-sm text-gray-600 dark:text-gray-50'>
                            {abstractText(PRODUCT(id).description, 30)}
                          </p>
                        </Link>
                        <div className='flex justify-between mt-1'>
                          <span className='text-md font-bold text-gray-800 dark:text-gray-50'>
                            {PRODUCT(id).currentPrice} ج.س
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
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
      )}
    </Suspense>
  )
}

export default CompletedOrders
