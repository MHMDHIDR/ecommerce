import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import { LoadingPage } from '@/components/Loading'
import Layout from '@/components/Layout'
import { AcceptBtn, RejectBtn } from '@/components/TableActions'
import { USER_DATA } from '@/constants'
import { createLocaleDateString } from '@/utils/convertDate'
import NavMenu from '@/components/NavMenu'
import useAuth from '@/hooks/useAuth'
import { getCookies } from '@/utils/cookies'
import { AppSettingsContext } from '@/contexts/AppSettingsContext'
import { parseJson, stringJson } from '@/utils/jsonTools'
import { useAxios } from '@/hooks/useAxios'
import ModalNotFound from '@/components/Modal/ModalNotFound'
import { AppSettingsProps } from '@/types'
import { OrderItems } from '@/constants/index'
import goTo from '@/utils/goTo'
import { removeSlug } from '@/utils/slug'

const SupplierDashboard = () => {
  const DOCUMENT_TITLE = 'الطلبــــــــات'
  useDocumentTitle(DOCUMENT_TITLE)

  const token = getCookies()

  const { getLocalStorageUser } = useContext<AppSettingsProps>(AppSettingsContext)
  const { userData } = useAuth()
  const { id, type } = !userData
    ? getLocalStorageUser()
      ? parseJson(getLocalStorageUser())
      : USER_DATA
    : userData

  const [orders, setOrders] = useState<any>()
  const [orderItems, setOrderItems] = useState<any>()
  const [orderStatus, setOrderStatus] = useState<any>()

  const { response, loading } = useAxios({
    url: `/orders`,
    headers: stringJson({
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    })
  })

  useEffect(() => {
    if (response !== null) {
      setOrders(response[0])
      response?.filter((order: any) => {
        const productItemsParsed = parseJson(order.productsItems)
        setOrderItems(
          productItemsParsed[id].items.filter((item: any) => item.addedById === id)
        )
        setOrderStatus(productItemsParsed[id].orderStatus)
      })
    }
  }, [loading, response])

  return loading ? (
    <LoadingPage />
  ) : !id && type !== 'admin' && type !== 'supplier' ? (
    <ModalNotFound />
  ) : (
    <Layout>
      <section className='container overflow-x-auto px-5 rtl mx-auto max-w-6xl h-full mb-20'>
        <h2 className='text-xl text-center my-16'>{DOCUMENT_TITLE}</h2>
        <table className='w-full bg-white dark:bg-gray-600 text-xs text-gray-900 dark:text-white text-center rounded-lg border border-gray-200 dark:border-gray-900 shadow-md dark:shadow-gray-900'>
          <thead className='bg-gray-50 dark:bg-gray-700'>
            <tr>
              <th className='py-4'>رقم الطلب</th>
              <th className='py-4'>اسماء المنتجات</th>
              <th className='py-4'>الحالة</th>
              <th className='py-4'>تاريخ الطلب</th>
              <th className='py-4'>الإجراء</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-100 dark:divide-gray-500 border-t border-gray-100 dark:border-gray-500'>
            {orderItems?.length > 0 ? (
              orderItems.map((item: any, idx: number) => (
                <tr key={item.id}>
                  <td>
                    <Link to={`order/${item.id}`} className='inline-block py-4 px-6'>
                      <span>{idx + 1}</span>
                    </Link>
                  </td>
                  <td className='min-w-[15rem]'>
                    <Link to={`order/${item.id}`} className='inline-block py-4 px-6'>
                      <span>{removeSlug(item.itemName)}</span>
                    </Link>
                  </td>
                  <td>
                    <Link to={`order/${item.id}`} className='inline-block py-4 px-6'>
                      <span
                        className={`inline-flex items-center gap-1 min-w-max rounded-full bg-green-50 px-2 py-1 text-xs ${
                          orderStatus === 'accept'
                            ? 'text-green-600'
                            : orderStatus === 'reject'
                            ? 'text-red-600'
                            : 'text-gray-600'
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            orderStatus === 'accept'
                              ? 'bg-green-600'
                              : orderStatus === 'reject'
                              ? 'bg-red-600'
                              : 'bg-gray-600'
                          }`}
                        ></span>
                        {orderStatus === 'accept'
                          ? 'الطلب مقبول'
                          : orderStatus === 'reject'
                          ? 'الطلب مرفوض'
                          : 'بإنتظار الاجراء'}
                      </span>
                    </Link>
                  </td>
                  <td className='min-w-[13rem]'>
                    <Link to={`order/${item.id}`} className='inline-block py-4 px-6'>
                      <span>{createLocaleDateString(orders.orderDate)}</span>
                    </Link>
                  </td>
                  <td>
                    <NavMenu>
                      {orderStatus === 'pending' ? (
                        <>
                          <AcceptBtn
                            id={'order._id'}
                            phone={'order.userEmail'}
                            label='موافقة'
                          />
                          <RejectBtn id={'order._id'} phone={'order.userEmail'} />
                        </>
                      ) : orderStatus === 'accept' ? (
                        <RejectBtn id={'order._id'} phone={'order.userEmail'} />
                      ) : orderStatus === 'reject' ? (
                        <AcceptBtn
                          id={'order._id'}
                          phone={'order.userEmail'}
                          label='موافقة'
                        />
                      ) : (
                        <span>لا يوجد إجراء</span>
                      )}
                    </NavMenu>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={100} className='p-5'>
                  <div className='flex flex-col justify-center items-center gap-y-4'>
                    <p className='text-red-600 dark:text-red-400'>
                      عفواً، لم يتم العثور على منتجات
                    </p>
                    <Link
                      to={goTo('add')}
                      className='rounded-md bg-blue-600 px-5 py-1 text-center text-sm text-white hover:bg-gray-700'
                    >
                      أضف منتج
                    </Link>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </Layout>
  )
}

export default SupplierDashboard
