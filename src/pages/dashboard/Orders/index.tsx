import { Suspense } from 'react'
import { Link } from 'react-router-dom'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import { LoadingPage } from '@/components/Loading'
import Layout from '@/components/Layout'
import { AcceptBtn, RejectBtn } from '@/components/TableActions'
import { ORDER } from '@/constants'
import { createLocaleDateString } from '@/utils/convertDate'
import NavMenu from '@/components/NavMenu'

const SupplierDashboard = () => {
  const DOCUMENT_TITLE = 'الطلبــــــــات'
  useDocumentTitle(DOCUMENT_TITLE)

  return (
    <Suspense fallback={<LoadingPage />}>
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
              {[...Array(1).keys()].map((_order: any, idx: number) => (
                <tr className='hover:bg-gray-50 dark:hover:bg-gray-700' key={idx}>
                  <td>
                    <Link to={`order/${ORDER._id}`} className='inline-block py-4 px-6'>
                      <span>{ORDER._id + idx}</span>
                    </Link>
                  </td>
                  <td className='min-w-[15rem]'>
                    <Link to={`order/${ORDER._id}`} className='inline-block py-4 px-6'>
                      <menu className='list-decimal'>
                        {ORDER.orderItems.map((item: any, idx: number) => (
                          <li key={idx}>{item.cHeading}</li>
                        ))}
                      </menu>
                    </Link>
                  </td>
                  <td>
                    <Link to={`order/${ORDER._id}`} className='inline-block py-4 px-6'>
                      <span
                        className={`inline-flex items-center gap-1 min-w-max rounded-full bg-green-50 px-2 py-1 text-xs ${
                          ORDER.orderStatus === 'accept'
                            ? 'text-green-600'
                            : ORDER.orderStatus === 'reject'
                            ? 'text-red-600'
                            : 'text-gray-600'
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            ORDER.orderStatus === 'accept'
                              ? 'bg-green-600'
                              : ORDER.orderStatus === 'reject'
                              ? 'bg-red-600'
                              : 'bg-gray-600'
                          }`}
                        ></span>
                        {ORDER.orderStatus === 'accept'
                          ? 'الطلب مقبول'
                          : ORDER.orderStatus === 'reject'
                          ? 'الطلب مرفوض'
                          : 'بإنتظار الاجراء'}
                      </span>
                    </Link>
                  </td>
                  <td className='min-w-[13rem]'>
                    <Link to={`order/${ORDER._id}`} className='inline-block py-4 px-6'>
                      <span>{createLocaleDateString(ORDER.orderDate)}</span>
                    </Link>
                  </td>
                  <td>
                    <NavMenu>
                      {ORDER.orderStatus === 'pending' ? (
                        <>
                          <AcceptBtn
                            id={'order._id'}
                            phone={'order.userEmail'}
                            label='موافقة'
                          />
                          <RejectBtn id={'order._id'} phone={'order.userEmail'} />
                        </>
                      ) : ORDER.orderStatus === 'accept' ? (
                        <RejectBtn id={'order._id'} phone={'order.userEmail'} />
                      ) : ORDER.orderStatus === 'reject' ? (
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
              ))}
            </tbody>
          </table>
        </section>
      </Layout>
    </Suspense>
  )
}

export default SupplierDashboard