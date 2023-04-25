import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import useEventListener from '@/hooks/useEventListener'
import { useAxios } from '@/hooks/useAxios'
import useAuth from '@/hooks/useAuth'
import { FileUploadContext } from '@/contexts/FileUploadContext'
import { isSmallScreen, API_URL, USER_DATA, TIME_TO_EXECUTE } from '@/constants'
import BackButton from '@/components/Icons/BackButton'
import Layout from '@/components/Layout'
import { DeleteBtn } from '@/components/TableActions'
import Modal from '@/components/Modal'
import { Loading } from '@/components/Icons/Status'
import { LoadingPage, LoadingSpinner } from '@/components/Loading'
import FileUpload from '@/components/FileUpload'
import ModalNotFound from '@/components/Modal/ModalNotFound'
import { createSlug, removeSlug } from '@/utils/slug'
import notify from '@/utils/notify'
import goTo from '@/utils/goTo'
import { ProductProps, UserType, catchResponse } from '@/types'
import { getCookies } from '@/utils/cookies'

const EditProduct = () => {
  const DOCUMENT_TITLE = 'تعديل المنتج'
  useDocumentTitle(DOCUMENT_TITLE)

  const { loading: loadingAuth, userData } = useAuth()
  const { id: userId, type }: { id: UserType['id']; type: UserType['type'] } =
    userData || {
      id: USER_DATA.type,
      type: USER_DATA.type
    }
  const token = getCookies()

  const { id } = useParams()

  //Form States
  const [product, setProduct] = useState<ProductProps | null>(null)
  const [itemName, setItemName] = useState('')
  const [currentPrice, setCurrentPrice] = useState('')
  const [quantity, setQuantity] = useState('')
  const [category, setCategory] = useState<any>([])
  const [productStatus, setProductStatus] = useState('')
  const [itemDesc, setItemDesc] = useState('')
  const [delProductId, setDelProductId] = useState('')
  const [delProductName, setDelProductName] = useState('')
  const [modalLoading, setModalLoading] = useState<boolean>(false)
  const [updateItemStatus, setUpdatedItemStatus] = useState<number | null>(null)
  const [updateItemMessage, setUpdatedItemMessage] = useState('')
  const [isItemDeleted, setIsItemDeleted] = useState<number | null>(null)
  const [itemDeletedMsg, setItemDeletedMsg] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)

  const { file } = useContext(FileUploadContext)

  const { data, loading } = useAxios({ url: `/products/${id}` })
  useEffect(() => {
    if (data !== null) {
      setProduct(data[0])
    }
  }, [data && data[0]])

  const handleUpdateProduct = async (e: {
    target: any
    key?: string
    preventDefault: () => void
  }) => {
    e.preventDefault()
    e.target.querySelector('button').setAttribute('disabled', 'disabled')
    setIsUpdating(true)

    const currentProductName = itemName || product?.itemName!
    const currentProductPrice = currentPrice || String(product?.currentPrice)
    const currentProductQuantity = quantity || String(product?.quantity)
    const currentProductCategory = category[0] || product?.category_id
    const currentProductStatus =
      type === 'supplier'
        ? product?.productStatus!
        : type === 'admin'
        ? productStatus || product?.productStatus
        : 'close'
    const currentProductDesc = itemDesc || product?.description!
    const currentProductImg = product?.imgUrl!

    //using FormData to send constructed data
    const formData = new FormData()
    formData.append('itemName', currentProductName)
    formData.append('currentPrice', currentProductPrice)
    formData.append('quantity', currentProductQuantity)
    formData.append('category', currentProductCategory)
    formData.append('productStatus', currentProductStatus ?? 'close')
    formData.append('description', currentProductDesc)
    formData.append('currentProductImg', currentProductImg)
    file.map((img: any) => {
      formData.append('productImg', img)
    })

    try {
      const response = await axios.patch(`${API_URL}/products/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      })
      const { itemUpdated, message } = response.data

      setUpdatedItemStatus(itemUpdated)
      setUpdatedItemMessage(message)
    } catch (err: any) {
      const {
        response: {
          data: { error }
        }
      }: catchResponse = err
      setUpdatedItemStatus(0)
      setUpdatedItemMessage(`عفواً، حدث خطأ ما: ${error}`)
    } finally {
      setIsUpdating(false)
    }
  }

  useEventListener('click', (e: any) => {
    switch (e.target.id) {
      case 'deleteBtn': {
        setDelProductId(e.target.dataset.id)
        setDelProductName(removeSlug(e.target.dataset.name))
        setModalLoading(true)
        break
      }
      case 'confirm': {
        handleDeleteProduct(delProductId)
        break
      }
      case 'cancel': {
        setModalLoading(false)
        break
      }
    }
  })

  const handleDeleteProduct = async (itemId: string) => {
    const imgUrl = product?.imgUrl!
    try {
      const response = await axios.delete(
        `${API_URL}/products/${itemId}?imgUrl=${imgUrl}`,
        {
          headers: { Authorization: `Bearer ${token}` }
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
  ) : !userId || (type !== 'admin' && type !== 'supplier') ? (
    <ModalNotFound />
  ) : (
    <Layout>
      <section className='container overflow-x-hidden px-5 rtl mx-auto max-w-6xl h-full'>
        <div className='hidden'>
          {updateItemStatus === 1
            ? notify({
                type: 'success',
                msg: updateItemMessage,
                reloadIn: TIME_TO_EXECUTE,
                reloadTo: goTo('products')
              })
            : updateItemStatus === 0
            ? notify({ type: 'error', msg: updateItemMessage })
            : isItemDeleted === 1
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
        {isSmallScreen && <BackButton to='/' className='absolute z-50 top-6 left-6' />}

        {loading ? (
          <div className='flex justify-center items-center my-48'>
            <LoadingSpinner title='جار البحث عن المنتج...' />
          </div>
        ) : (
          <>
            <h2 className='text-xl text-center my-16'>{DOCUMENT_TITLE}</h2>
            <form
              className='relative flex flex-col items-center'
              onSubmit={handleUpdateProduct}
            >
              <label htmlFor='uploadImg' className='flex items-center gap-y-2 flex-col'>
                <FileUpload
                  data={{
                    defaultImg: [
                      {
                        ImgDisplayName: product?.itemName,
                        ImgDisplayPath: product?.imgUrl
                      }
                    ],
                    imgName: product?.itemName,
                    label: 'تغيير صورة'
                  }}
                  required={false}
                />
              </label>

              <label htmlFor='username' className='form__group'>
                <span className='form__label'>اسم المنتج</span>
                <input
                  type='text'
                  id='username'
                  className='form__input'
                  onChange={e => setItemName(createSlug(e.target.value.trim()))}
                  defaultValue={removeSlug(product?.itemName!)}
                  required
                />
              </label>

              <label htmlFor='price' className='form__group'>
                <span className='form__label'>السعر</span>
                <input
                  type='number'
                  id='price'
                  className='form__input'
                  onChange={e => setCurrentPrice(e.target.value.trim())}
                  defaultValue={product?.currentPrice}
                  required
                />
              </label>

              <label htmlFor='quantity' className='form__group'>
                <span className='form__label'>الكمية</span>
                <input
                  type='number'
                  id='quantity'
                  className='form__input'
                  onChange={e => setQuantity(e.target.value.trim())}
                  defaultValue={product?.quantity}
                  required
                />
              </label>

              {type === 'admin' && (
                <div className='form__group'>
                  <span className='form__label'>حالة المنتج</span>
                  <label className='form__group cursor-pointer' htmlFor='open'>
                    <input
                      className='form__input'
                      type='radio'
                      id='open'
                      name='type'
                      value='open'
                      checked={
                        productStatus
                          ? productStatus === 'open'
                          : product?.productStatus === 'open'
                      }
                      onChange={() => setProductStatus('open')}
                    />
                    <span>مفتوح</span>
                  </label>
                  <label className='form__group cursor-pointer' htmlFor='close'>
                    <input
                      className='form__input'
                      type='radio'
                      id='close'
                      name='type'
                      value='close'
                      checked={
                        productStatus
                          ? productStatus === 'close'
                          : product?.productStatus === 'close'
                      }
                      onChange={() => setProductStatus('close')}
                    />
                    <span>مغلق</span>
                  </label>
                </div>
              )}

              <label htmlFor='category' className='form__group'>
                <span className='form__label'>التصنيف</span>
                <select
                  id='category'
                  className='form__input'
                  onChange={e =>
                    setCategory([
                      e.target.value.trim(),
                      e.target.options[e.target.selectedIndex].textContent
                    ])
                  }
                  defaultValue={data[0]?.category}
                  required
                >
                  <option value=''>اختر التصنيف</option>
                  {[]?.map(({ en_label, ar_label }: any, idx: number) => (
                    <option key={idx} value={en_label}>
                      {ar_label}
                    </option>
                  ))}
                </select>
              </label>

              <label htmlFor='description' className='form__group'>
                <span className='form__label'>وصف المنتج</span>
                <textarea
                  name='description'
                  id='description'
                  minLength={10}
                  maxLength={300}
                  className='form__input'
                  onChange={e => setItemDesc(e.target.value.trim())}
                  defaultValue={product?.description}
                  required
                ></textarea>
              </label>

              <div className='flex items-center gap-x-20'>
                <button
                  type='submit'
                  className={`min-w-[7rem] bg-green-600 hover:bg-green-700 text-white py-1.5 px-6 rounded-md${
                    isUpdating || updateItemStatus === 1
                      ? ' disabled:opacity-30 disabled:hover:bg-green-700 disabled:cursor-not-allowed'
                      : ''
                  }`}
                >
                  {isUpdating ? (
                    <>
                      <LoadingSpinner />
                      &nbsp; جارِ تحديث المنتج...
                    </>
                  ) : (
                    'تحديث'
                  )}
                </button>
                <DeleteBtn id={product?.id!} itemName={product?.itemName!} />
              </div>
            </form>
          </>
        )}
      </section>
    </Layout>
  )
}

export default EditProduct
