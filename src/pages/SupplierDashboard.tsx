import { Suspense } from 'react'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { LoadingPage } from '../components/Loading'
import Layout from '../components/Layout'
import NavMenu from '../components/NavMenu'
import { AcceptBtn, RejectBtn } from '../components/OrdersTableActions'

const SupplierDashboard = () => {
  useDocumentTitle('لوحة تحكم التاجر')

  return (
    <Suspense fallback={<LoadingPage />}>
      <Layout>
        <section className='container px-5 mx-auto mb-20'>
          <h1 className='font-bold text-xl text-center mb-10'>الطلبات</h1>

          <table className='bg-gray-200 dark:bg-neutral-800 shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto w-full whitespace-nowrap rounded-tl-xl rounded-tr-xl rtl'>
            <thead>
              <tr className='h-16 text-sm w-full leading-none text-gray-800 dark:text-gray-100 text-center'>
                <th>رقم الطلب</th>
                <th>اسماء المنتجات</th>
                <th>الكمية المطلوبة</th>
                <th>السعر الإجمالي</th>
                <th>تاريخ الطلب</th>
                <th>حالة الطلب</th>
                <th>الإجراء</th>
              </tr>
            </thead>
            <tbody className='w-full'>
              {[...Array(3).keys()].map((_: any, idx: number) => (
                <tr
                  key={idx}
                  className='h-20 cursor-pointer text-sm leading-none text-gray-800 dark:text-gray-100 bg-white dark:bg-neutral-700 hover:bg-gray-100 dark:hover:bg-gray-700 border-b border-t border-gray-100 dark:border-gray-700 text-center'
                >
                  <td>
                    <span>{idx + 10}</span>
                  </td>
                  <td>
                    <menu className='flex flex-col gap-y-2 text-xs'>
                      <li>المنتج الأول</li>
                      <li>المنتج الثاني</li>
                      <li>المنتج الثالث</li>
                    </menu>
                  </td>
                  <td>
                    <p className='font-medium'>32/47</p>
                    <p className='text-xs leading-3 text-gray-600 dark:text-gray-100 mt-2'>
                      5 tasks pending
                    </p>
                  </td>
                  <td>
                    <span className='font-bold'>13,000 ج.س</span>
                  </td>
                  <td>
                    <p className='font-medium'>22.12.21</p>
                    <p className='text-xs leading-3 text-gray-600 dark:text-gray-100 mt-2'>
                      34 days
                    </p>
                  </td>
                  <td>
                    <span>تحت الاجراء</span>
                  </td>
                  <td className='px-3 max-w-[4rem]'>
                    <NavMenu>
                      <AcceptBtn id={'1'} email={'1'} />
                      <RejectBtn id={'1'} email={'1'} />

                      {/* {order.orderStatus === 'pending' ? (
                        <>
                          <AcceptBtn
                            id={order._id}
                            email={
                              order.userEmail === undefined
                                ? session!?.user!?.email
                                : order.userEmail
                            }
                          />
                          <RejectBtn
                            id={order._id}
                            email={
                              order.userEmail === undefined
                                ? session!?.user!?.email
                                : order.userEmail
                            }
                          />
                          <EditBtn id={order._id} />
                          <DeleteBtn
                            id={order._id}
                            email={
                              order.userEmail === undefined
                                ? session!?.user!?.email
                                : order.userEmail
                            }
                          />
                        </>
                      ) : order.orderStatus === 'accept' ? (
                        <>
                          <RejectBtn
                            id={order._id}
                            email={
                              order.userEmail === undefined
                                ? session!?.user!?.email
                                : order.userEmail
                            }
                          />
                          <EditBtn id={order._id} />
                          <InvoiceBtn
                            id={order._id}
                            email={
                              order.userEmail === undefined
                                ? session!?.user!?.email
                                : order.userEmail
                            }
                          />
                          <DeleteBtn
                            id={order._id}
                            email={
                              order.userEmail === undefined
                                ? session!?.user!?.email
                                : order.userEmail
                            }
                          />
                        </>
                      ) : order.orderStatus === 'reject' ? (
                        <>
                          <AcceptBtn
                            id={order._id}
                            email={
                              order.userEmail === undefined
                                ? session!?.user!?.email
                                : order.userEmail
                            }
                          />
                          <EditBtn id={order._id} />
                          <InvoiceBtn
                            id={order._id}
                            email={
                              order.userEmail === undefined
                                ? session!?.user!?.email
                                : order.userEmail
                            }
                          />
                          <DeleteBtn
                            id={order._id}
                            email={
                              order.userEmail === undefined
                                ? session!?.user!?.email
                                : order.userEmail
                            }
                          />
                        </>
                      ) : (
                        <span>لا يوجد إجراء</span>
                      )} */}
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
