import { Suspense, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '@/components/Layout'
import { LoadingPage, LoadingSpinner } from '@/components/Loading'
import { DeleteBtn, EditBtn } from '@/components/OrdersTableActions'
import { PRODUCT } from '@/constants'
import useAxios from '@/hooks/useAxios'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import { createLocaleDateString } from '@/utils/functions/convertDate'
import goTo from '@/utils/functions/goTo'

const ViewProduct = () => {
  const TITLE = 'عرض المنتجات'
  useDocumentTitle(TITLE)

  const { response, loading } = useAxios({ url: `/products` })
  const [products, setProducts] = useState<string[]>([''])

  useEffect(() => {
    response && setProducts(response)
    return () => setProducts([''])
  }, [response])

  return (
    <Suspense fallback={<LoadingPage />}>
      <Layout>
        <section className='container overflow-x-hidden px-5 rtl mx-auto max-w-6xl h-full'>
          <h2 className='text-xl text-center my-16'>{TITLE}</h2>

          <div className='overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-900 shadow-md m-5 dark:shadow-gray-900'>
            <table className='w-full border-collapse text-center bg-white dark:bg-gray-600 text-sm text-gray-900 dark:text-white'>
              <thead className='bg-gray-50 dark:bg-gray-700'>
                <tr>
                  <th className='py-4'>الرقم</th>
                  <th className='py-4'>اسم المنتج</th>
                  <th className='py-4'>الحالة</th>
                  <th className='py-4'>السعر</th>
                  <th className='py-4'>تاريخ إنشاء المنتج</th>
                  <th className='py-4'>تاريخ تحديث المنتج</th>
                  <th className='py-4'>الإجراء</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-100 dark:divide-gray-500 border-t border-gray-100 dark:border-gray-500'>
                {loading ? (
                  <tr>
                    <td colSpan={7} className='p-5'>
                      <LoadingSpinner />
                    </td>
                  </tr>
                ) : (
                  products?.map((product: any, idx: number) => (
                    <tr
                      className='hover:bg-gray-50 dark:hover:bg-gray-700'
                      key={product.id + idx}
                    >
                      <td>
                        <Link
                          to={goTo(`product-details/${product.id}`)}
                          className='inline-block py-4 px-6'
                        >
                          <span>{idx + 1}</span>
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={goTo(`product-details/${product.id}`)}
                          className='inline-block py-4 px-6'
                        >
                          <menu className='list-decimal'>{product.itemName}</menu>
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={goTo(`product-details/${product.id}`)}
                          className='inline-block py-4 px-6'
                        >
                          <span
                            className={`inline-flex items-center gap-1 min-w-max rounded-full bg-green-50 px-2 py-1 text-xs ${
                              product.productStatus === 'accept'
                                ? 'text-green-600'
                                : product.productStatus === 'reject'
                                ? 'text-red-600'
                                : 'text-gray-600'
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                product.productStatus === 'open'
                                  ? 'bg-green-600'
                                  : product.productStatus === 'close'
                                  ? 'bg-red-600'
                                  : 'bg-gray-600'
                              }`}
                            ></span>
                            {product.productStatus === 'open'
                              ? 'المنتج متوفر'
                              : product.productStatus === 'close'
                              ? 'المنتج غير متوفر'
                              : 'غير محدد'}
                          </span>
                        </Link>
                      </td>
                      <td>
                        <span className='inline-block min-w-max font-bold'>
                          {product.currentPrice} ج.س
                        </span>
                      </td>
                      <td>
                        <Link
                          to={goTo(`product-details/${product.id}`)}
                          className='inline-block py-4 px-6'
                        >
                          <span>{createLocaleDateString(product.productCreateDate)}</span>
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={goTo(`product-details/${product.id}`)}
                          className='inline-block py-4 px-6'
                        >
                          <span>{createLocaleDateString(product.productUpdateDate)}</span>
                        </Link>
                      </td>
                      <td>
                        <DeleteBtn id={product.id} email={'order.userEmail'} />
                        <EditBtn id={product.id} email={'order.userEmail'} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </Layout>
    </Suspense>
  )
}

export default ViewProduct
