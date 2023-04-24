import { Suspense, useContext, useEffect, useState } from 'react'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import { AppSettingsContext } from '@/contexts/AppSettingsContext'
import { LoadingPage } from '@/components/Loading'
import Layout from '@/components/Layout'
import NoItems from '@/components/NoItems'
import CartHeader from './CartHeader'
import { USER_DATA } from '@/constants'
import { AppSettingsProps, ProductProps } from '@/types'
import useAuth from '@/hooks/useAuth'
import { parseJson, stringJson } from '@/utils/jsonTools'
import ModalNotFound from '@/components/Modal/ModalNotFound'
import { useAxios } from '@/hooks/useAxios'
import { getCookies } from '@/utils/cookies'
import { createLocaleDateString } from '@/utils/convertDate'
import { removeSlug } from '@/utils/slug'

const CompletedOrders = () => {
  const DOCUMENT_TITLE = 'طلباتي'
  useDocumentTitle(DOCUMENT_TITLE)

  const token = getCookies()

  const { getLocalStorageUser } = useContext<AppSettingsProps>(AppSettingsContext)
  const { userData } = useAuth()
  const { type: accountType, id } = !userData
    ? getLocalStorageUser()
      ? parseJson(getLocalStorageUser()) ?? parseJson(getLocalStorageUser())[0]
      : USER_DATA
    : userData

  const [orders, setOrders] = useState<ProductProps[]>()

  const { response, loading } = useAxios({
    url: `/orders?orderedById=${id}`,
    headers: stringJson({
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    })
  })

  useEffect(() => {
    if (response !== null) {
      setOrders(response)
    }
  }, [response])

  return loading ? (
    <LoadingPage />
  ) : (
    <Suspense fallback={<LoadingPage />}>
      {accountType !== 'user' || !id ? (
        <ModalNotFound />
      ) : (
        <Layout>
          <section className='container h-full px-5 mx-auto rtl mb-24 max-w-6xl'>
            <CartHeader id={id} />
            {orders && orders.length > 0 ? (
              <div className='flex flex-col gap-y-3'>
                <table className='w-full bg-white dark:bg-gray-600 text-xs text-gray-900 dark:text-white text-center rounded-lg border border-gray-200 dark:border-gray-900 shadow-md dark:shadow-gray-900'>
                  <thead className='bg-gray-50 dark:bg-gray-700'>
                    <tr>
                      <th className='py-4'>رقم الطلب</th>
                      <th className='py-4'>اسم المنتج</th>
                      <th className='py-4'>الكمية</th>
                      <th className='py-4'>السعر</th>
                      <th className='py-4'>الحالة</th>
                      <th className='py-4'>تاريخ إنشاء الطلب</th>
                      <th className='py-4'>تاريخ تحديث الحالة</th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-100 dark:divide-gray-500 border-t border-gray-100 dark:border-gray-500'>
                    {orders.map((order: ProductProps, idx: number) => (
                      <tr key={idx}>
                        <td className='py-2'>
                          <span>{idx + 1}</span>
                        </td>
                        <td className='py-2'>
                          <span>{removeSlug(order.itemName)}</span>
                        </td>
                        <td className='py-2'>
                          <span>{order.quantity}</span>
                        </td>
                        <td className='py-2'>
                          <span>{order.price}</span>
                        </td>
                        <td className='py-2'>
                          <span className='flex flex-col items-center gap-y-1'>
                            <span
                              className={`inline-flex items-center gap-1.5 min-w-max border rounded-full px-2 py-1 text-xs ${
                                order.orderItemStatus === 'accept'
                                  ? 'border-green-600 text-green-600 dark:text-green-300'
                                  : order.orderItemStatus === 'reject'
                                  ? 'border-red-600 text-red-600 dark:text-red-300'
                                  : // : order.orderItemStatus === 'shipped'
                                    // ? 'border-blue-600 text-blue-600 dark:text-blue-300'
                                    // : order.orderItemStatus === 'delivered'
                                    // ? 'border-pink-600 text-pink-600 dark:text-pink-300'
                                    ''
                              }`}
                            >
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${
                                  order.orderItemStatus === 'accept'
                                    ? 'bg-green-600'
                                    : order.orderItemStatus === 'reject'
                                    ? 'bg-red-600'
                                    : // : order.orderStatus === 'shipped'
                                      // ? 'bg-blue-600'
                                      // : order.orderStatus === 'delivered'
                                      // ? 'bg-pink-300'
                                      'bg-gray-600'
                                }`}
                              />
                              {order.orderItemStatus === 'accept'
                                ? 'الطلب مقبول'
                                : order.orderItemStatus === 'reject'
                                ? 'الطلب مرفوض'
                                : // : order.orderStatus === 'shipped'
                                  // ? 'تم شحن الطلب'
                                  // : order.orderStatus === 'delivered'
                                  // ? 'تم توصيل الطلب'
                                  'بإنتظار الموافقة'}
                            </span>
                            <span>
                              {order.orderItemStatus === 'reject'
                                ? order.rejectReason!?.length > 1
                                  ? order.rejectReason
                                  : 'لم يتم تحديد السبب'
                                : ''}
                            </span>
                          </span>
                        </td>
                        <td className='min-w-[13rem] py-2'>
                          <span>{createLocaleDateString(order.createDate)}</span>
                        </td>
                        <td className='min-w-[13rem] py-2'>
                          <span>{createLocaleDateString(order.updateDate)}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <NoItems
                className='mt-40'
                msg='عفواً لم يتم العثور على طلبات سابقة'
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
