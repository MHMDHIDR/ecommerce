import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import useEventListener from '@/hooks/useEventListener'
import useAxios from '@/hooks/useAxios'
import { FileUploadContext } from '@/contexts/FileUploadContext'
import { isSmallScreen } from '@/constants'
import BackButton from '@/components/Icons/BackButton'
import Layout from '@/components/Layout'
import { DeleteBtn } from '@/components/TableActions'
import Modal from '@/components/Modal'
import { Loading } from '@/components/Icons/Status'
import { LoadingPage } from '@/components/Loading'
import FileUpload from '@/components/FileUpload'
import { createSlug, removeSlug } from '@/utils/functions/slug'
import notify from '@/utils/functions/notify'
import goTo from '@/utils/functions/goTo'

const EditProduct = () => {
  const TITLE = 'تعديل المنتج'
  useDocumentTitle(TITLE)

  const { id } = useParams()

  //Form States
  const [product, setProduct] = useState<any>()
  const [itemName, setItemName] = useState('')
  const [currentPrice, setCurrentPrice] = useState('')
  const [quantity, setQuantity] = useState('')
  const [category, setCategory] = useState<any>([])
  const [categoryList, setCategoryList] = useState([
    ['clothes', 'ملابس'],
    ['bags', 'حقائب'],
    ['accessories', 'إكسسوارات']
  ])
  const [productStatus, setProductStatus] = useState('')
  const [itemDesc, setItemDesc] = useState('')
  const [delItemId, setDelItemId] = useState('')
  const [delItemName, setDelItemName] = useState('')
  const [modalLoading, setModalLoading] = useState<boolean>(false)
  const [updateItemStatus, setUpdatedItemStatus] = useState<number | null>(null)
  const [updateItemMessage, setUpdatedItemMessage] = useState('')
  const [isItemDeleted, setIsItemDeleted] = useState<number | null>(null)
  const [itemDeletedMsg, setItemDeletedMsg] = useState('')

  const { file } = useContext(FileUploadContext)

  const { response, loading } = useAxios({ url: `/products/${id}` })
  useEffect(() => {
    response && setProduct(response[0])
    setCategory(response && response[0]?.category)
    return () => setProduct([''])
  }, [response])

  const handleUpdateProduct = async (e: {
    target: any
    key?: string
    preventDefault: () => void
  }) => {
    e.preventDefault()
    const currentProductName = product?.itemName
    const currentProductPrice = product?.currentPrice
    const currentProductQuantity = product?.quantity
    const currentProductCategory = product?.category
    const currentProductStatus = product?.productStatus
    const currentProductDesc = product?.description
    const currentProductImg = product?.imgUrl

    //using FormData to send constructed data
    const formData = new FormData()
    formData.append('itemName', itemName || currentProductName)
    formData.append('currentPrice', currentPrice || currentProductPrice)
    formData.append('quantity', quantity || currentProductQuantity)
    formData.append('category', category[0] || currentProductCategory)
    formData.append('productStatus', productStatus || currentProductStatus)
    formData.append('description', itemDesc || currentProductDesc)
    formData.append('currentProductImg', currentProductImg)
    file.map((img: any) => {
      formData.append('productImg', img)
    })

    try {
      const response = await axios.patch(
        `${
          process.env.NODE_ENV === 'development'
            ? `http://localhost:4000`
            : `https://ecommerce-server-mhmdhidr.vercel.app`
        }/products/${id}`,
        formData
      )
      const { itemUpdated, message } = response.data

      setUpdatedItemStatus(itemUpdated)
      setUpdatedItemMessage(message)
    } catch (error: any) {
      setUpdatedItemStatus(0)
      setUpdatedItemMessage(`عفواً، حدث خطأ ما: ${error.message}`)
    }
  }

  useEventListener('click', (e: any) => {
    switch (e.target.id) {
      case 'deleteBtn': {
        setDelItemId(e.target.dataset.id)
        setDelItemName(removeSlug(e.target.dataset.name))
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

  const handleDeleteItem = async (itemId: string) => {
    try {
      const response = await axios.delete(
        `${
          process.env.NODE_ENV === 'development'
            ? `http://localhost:4000`
            : `https://ecommerce-server-mhmdhidr.vercel.app`
        }/products/${itemId}`
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

  return loading ? (
    <LoadingPage />
  ) : (
    <Layout>
      <section className='container overflow-x-hidden px-5 rtl mx-auto max-w-6xl h-full'>
        <div className='hidden'>
          {updateItemStatus === 1
            ? notify({
                type: 'success',
                msg: updateItemMessage,
                reloadIn: 5000,
                reloadTo: goTo('products')
              })
            : updateItemStatus === 0
            ? notify({ type: 'error', msg: updateItemMessage })
            : isItemDeleted === 1
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
        {isSmallScreen && (
          <BackButton to='/' className='w-8 h-8 absolute z-50 top-6 left-6' />
        )}
        <h2 className='text-xl text-center my-16'>{TITLE}</h2>
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
            />
          </label>

          <label htmlFor='username' className='form__group'>
            <span className='form__label'>اسم المنتج</span>
            <input
              type='text'
              id='username'
              className='form__input'
              onChange={e => setItemName(createSlug(e.target.value.trim()))}
              defaultValue={removeSlug(product?.itemName)}
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
              defaultValue={category}
              required
            >
              <option value=''>اختر التصنيف</option>
              {categoryList?.map((category, idx) => (
                <option key={idx} value={category[0]}>
                  {category[1]}
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
              className='min-w-[7rem] bg-green-600 hover:bg-green-700 text-white py-1.5 px-6 rounded-md'
            >
              تحديث
            </button>
            <DeleteBtn id={product?.id} itemName={product?.itemName} />
          </div>
        </form>
      </section>
    </Layout>
  )
}

export default EditProduct
