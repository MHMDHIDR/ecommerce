import { Suspense, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Layout from '@/components/Layout'
import { LoadingPage, LoadingSpinner } from '@/components/Loading'
import { DeleteBtn, EditBtn } from '@/components/TableActions'
import Modal from '@/components/Modal/Modal'
import { Loading } from '@/components/Icons/Status'
import useAxios from '@/hooks/useAxios'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import useEventListener from '@/hooks/useEventListener'
import { createLocaleDateString } from '@/utils/functions/convertDate'
import goTo from '@/utils/functions/goTo'
import { removeSlug } from '@/utils/functions/slug'
import notify from '@/utils/functions/notify'

const ViewProduct = () => {
  const TITLE = 'عرض المنتجات'
  useDocumentTitle(TITLE)

  const [delItemId, setDelItemId] = useState('')
  const [delItemName, setDelItemName] = useState('')
  // const [delFoodImg, setDelFoodImg] = useState('')
  const [isItemDeleted, setIsItemDeleted] = useState(null)
  const [itemDeletedMsg, setItemDeletedMsg] = useState('')
  const [modalLoading, setModalLoading] = useState<boolean>(false)
  const [products, setProducts] = useState<string[]>([''])

  const { response, loading } = useAxios({ url: `/products` })

  useEffect(() => {
    response && setProducts(response)
    return () => setProducts([''])
  }, [response])

  useEventListener('click', (e: any) => {
    switch (e.target.id) {
      case 'deleteBtn': {
        setDelItemId(e.target.dataset.id)
        setDelItemName(removeSlug(e.target.dataset.name))
        // setDelItemImg(parseJson(e.target.dataset.imgname))
        setModalLoading(true)
        break
      }
      case 'confirm': {
        handleDeleteItem(delItemId)
        break
      }
      case 'cancel': {
        setModalLoading(false)
        break
      }

      default: {
        setModalLoading(false)
        break
      }
    }
  })

  const handleDeleteItem = async (
    itemId: string
    // ,foodImgs: FoodImgsProps[] = delFoodImg
  ) => {
    try {
      //You need to name the body {data} so it can be recognized in (.delete) method
      const response = await axios.delete(
        `${
          process.env.NODE_ENV === 'development'
            ? `http://localhost:4000`
            : `https://ecommerce-server-mhmdhidr.vercel.app`
        }/products/${itemId}` //, {data: formData}
      )
      const { itemDeleted, message } = response.data
      setIsItemDeleted(itemDeleted)
      setItemDeletedMsg(message)
      //Remove waiting modal
      setTimeout(() => {
        setModalLoading(false)
      }, 300)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Suspense fallback={<LoadingPage />}>
      <Layout>
        <section className='container overflow-x-hidden px-5 rtl mx-auto max-w-6xl h-full'>
          <div className='hidden'>
            {isItemDeleted === 1
              ? notify({ type: 'success', msg: itemDeletedMsg })
              : isItemDeleted === 0
              ? notify({ type: 'error', msg: itemDeletedMsg })
              : null}
          </div>
          {/* Confirm Box */}
          {modalLoading && (
            <Modal
              status={Loading}
              classes='text-blue-600 dark:text-blue-400 text-lg'
              msg={`هل أنت متأكد من حذف ${delItemName} ؟ لا يمكن التراجع عن هذا القرار`}
              ctaConfirmBtns={['حذف', 'الغاء']}
            />
          )}
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
                ) : products.length > 0 ? (
                  products?.map((product: any, idx: number) => (
                    <tr
                      className='hover:bg-gray-50 dark:hover:bg-gray-700'
                      key={product.id + idx}
                    >
                      <td>
                        <Link
                          to={goTo(`product/${product.id}`)}
                          className='inline-block py-4 px-6'
                        >
                          <span>{idx + 1}</span>
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={goTo(`product/${product.id}`)}
                          className='inline-block py-4 px-6'
                        >
                          <menu className='list-decimal'>{product.itemName}</menu>
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={goTo(`product/${product.id}`)}
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
                        <Link
                          to={goTo(`product/${product.id}`)}
                          className='inline-block py-4 px-6'
                        >
                          <span className='inline-block min-w-max font-bold'>
                            {product.currentPrice} ج.س
                          </span>
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={goTo(`product/${product.id}`)}
                          className='inline-block py-4 px-6'
                        >
                          <span>{createLocaleDateString(product.productCreateDate)}</span>
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={goTo(`product/${product.id}`)}
                          className='inline-block py-4 px-6'
                        >
                          <span>{createLocaleDateString(product.productUpdateDate)}</span>
                        </Link>
                      </td>
                      <td>
                        <DeleteBtn id={product.id} itemName={product.itemName} />
                        <EditBtn id={product.id} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className='p-5'>
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
          </div>
        </section>
      </Layout>
    </Suspense>
  )
}

export default ViewProduct
