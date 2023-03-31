import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Layout from '@/components/Layout'
import { LoadingPage, LoadingSpinner } from '@/components/Loading'
import { DeleteBtn, EditBtn } from '@/components/TableActions'
import Modal from '@/components/Modal'
import { Loading } from '@/components/Icons/Status'
import ModalNotFound from '@/components/Modal/ModalNotFound'
import { useAxios } from '@/hooks/useAxios'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import useEventListener from '@/hooks/useEventListener'
import useAuth from '@/hooks/useAuth'
import { AppSettingsContext } from '@/contexts/AppSettingsContext'
import { createLocaleDateString } from '@/utils/convertDate'
import goTo from '@/utils/goTo'
import { removeSlug } from '@/utils/slug'
import notify from '@/utils/notify'
import { ProductProps } from '@/types'
import { API_URL, PRODUCT, TIME_TO_EXECUTE, USER_DATA } from '@/constants'
import { parseJson } from '@/utils/jsonTools'
import { getCookies } from '@/utils/cookies'

const ViewProduct = () => {
  const DOCUMENT_TITLE = 'عرض المنتجات'
  useDocumentTitle(DOCUMENT_TITLE)

  const { loading: loadingAuth, userData } = useAuth()
  const { id, type } = userData || { id: USER_DATA.type, type: USER_DATA.type }
  const token = getCookies()

  const { getLocalStorageUser } = useContext(AppSettingsContext)
  const addedById = parseJson(getLocalStorageUser()).id

  const [delProductId, setDelProductId] = useState('')
  const [delProductName, setDelProductName] = useState('')
  const [delProductImg, setDelProductImg] = useState('')
  const [isItemDeleted, setIsItemDeleted] = useState(null)
  const [itemDeletedMsg, setItemDeletedMsg] = useState('')
  const [modalLoading, setModalLoading] = useState<boolean>(false)
  const [products, setProducts] = useState<ProductProps[]>([PRODUCT('1')])

  const { response, loading } = useAxios({ url: `/products` })

  useEffect(() => {
    response && setProducts(response)
  }, [response])

  useEventListener('click', (e: any) => {
    switch (e.target.id) {
      case 'deleteBtn': {
        setDelProductId(e.target.dataset.id)
        setDelProductName(removeSlug(e.target.dataset.name))
        setDelProductImg(e.target.dataset.imgUrl)
        setModalLoading(true)
        break
      }
      case 'confirm': {
        handleDeleteProduct(delProductId, delProductImg)
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

  const handleDeleteProduct = async (itemId: string, imgUrl: string) => {
    try {
      const response = await axios.delete(
        `${API_URL}/products/${itemId}?imgUrl=${imgUrl}`,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        }
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

  return loadingAuth ? (
    <LoadingPage />
  ) : !id || (type !== 'admin' && type !== 'supplier') ? (
    <ModalNotFound />
  ) : (
    <Layout>
      <section className='container overflow-x-hidden px-5 rtl mx-auto max-w-6xl h-full'>
        <div className='hidden'>
          {isItemDeleted === 1
            ? notify({
                type: 'success',
                msg: itemDeletedMsg,
                reloadIn: TIME_TO_EXECUTE,
                reloadTo: goTo('products')
              })
            : isItemDeleted === 0
            ? notify({ type: 'error', msg: itemDeletedMsg })
            : null}
        </div>
        {/* Confirm Box */}
        {modalLoading && (
          <Modal
            status={Loading}
            classes='text-blue-600 dark:text-blue-400 text-lg'
            msg={`هل أنت متأكد من حذف ${delProductName} ؟ لا يمكن التراجع عن هذا القرار`}
            ctaConfirmBtns={['حذف', 'الغاء']}
          />
        )}
        <h2 className='text-xl text-center my-16'>{DOCUMENT_TITLE}</h2>
        <div className='overflow-x-auto text-center rounded-lg border border-gray-200 dark:border-gray-900 shadow-md dark:shadow-gray-900'>
          <table className='w-full bg-white dark:bg-gray-600 text-xs text-gray-900 dark:text-white'>
            <thead className='bg-gray-50 dark:bg-gray-700'>
              <tr>
                <th className='py-2'>الرقم</th>
                <th className='py-2'>الصورة</th>
                <th className='py-2'>اسم</th>
                <th className='py-2'>الحالة</th>
                <th className='py-2'>السعر</th>
                <th className='py-2'>تاريخ الإنشاء</th>
                <th className='py-2'>تاريخ تحديث</th>
                <th className='py-2'>الإجراء</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-100 dark:divide-gray-500 border-t border-gray-100 dark:border-gray-500'>
              {loading ? (
                <tr>
                  <td colSpan={100} className='p-5'>
                    <LoadingSpinner title='جار البحث عن المنتجات...' />
                  </td>
                </tr>
              ) : products.length > 0 ? (
                products?.map((product: ProductProps, idx: number) => (
                  <tr
                    className='hover:bg-gray-50 dark:hover:bg-gray-700'
                    key={product.id}
                  >
                    <td>
                      <Link to={goTo(`product/${product.id}`)} className='py-3 px-5'>
                        <span>{idx + 1}</span>
                      </Link>
                    </td>
                    <td>
                      <Link to={goTo(`product/${product.id}`)} className='py-3 px-5'>
                        <img
                          loading='lazy'
                          src={product.imgUrl}
                          alt={product.itemName}
                          height={36}
                          width={36}
                          className='object-cover rounded-lg shadow-md h-9 w-9'
                        />
                      </Link>
                    </td>
                    <td>
                      <Link to={goTo(`product/${product.id}`)} className='py-3 px-5'>
                        {removeSlug(product.itemName)}
                      </Link>
                    </td>
                    <td>
                      <Link to={goTo(`product/${product.id}`)} className='py-3 px-5'>
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
                          />
                          {product.productStatus === 'open'
                            ? 'تم الموافقة'
                            : product.productStatus === 'close'
                            ? 'تم الرفض'
                            : 'في انتظار الادارة'}
                        </span>
                      </Link>
                    </td>
                    <td>
                      <Link to={goTo(`product/${product.id}`)} className='py-3 px-5'>
                        <span className='inline-block min-w-max font-bold'>
                          {product.currentPrice} ج.س
                        </span>
                      </Link>
                    </td>
                    <td>
                      <Link to={goTo(`product/${product.id}`)} className='py-3 px-5'>
                        <span>{createLocaleDateString(product.CreateDate)}</span>
                      </Link>
                    </td>
                    <td>
                      <Link to={goTo(`product/${product.id}`)} className='py-3 px-5'>
                        <span>{createLocaleDateString(product.UpdateDate)}</span>
                      </Link>
                    </td>
                    <td>
                      <DeleteBtn
                        id={product.id}
                        itemName={product.itemName}
                        imgUrl={product.imgUrl}
                      />
                      <EditBtn id={product.id} />
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
        </div>
      </section>
    </Layout>
  )
}

export default ViewProduct
