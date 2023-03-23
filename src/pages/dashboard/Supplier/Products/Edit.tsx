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

const EditProduct = () => {
  const TITLE = 'تعديل المنتج'
  useDocumentTitle(TITLE)

  const { id } = useParams()
  const { response, loading } = useAxios({ url: `/products/${id}` })
  const [product, setProduct] = useState<any>()

  //Form States
  const [itemName, setItemName] = useState('')
  const [currentPrice, setCurrentPrice] = useState('')
  const [quantity, setQuantity] = useState('')
  const [category, setCategory] = useState<any>([])
  const [productStatus, setProductStatus] = useState('open')
  const [itemDesc, setItemDesc] = useState('')
  const [delItemId, setDelItemId] = useState('')
  const [delItemName, setDelItemName] = useState('')
  const [modalLoading, setModalLoading] = useState<boolean>(false)
  const [updateItemStatus, setUpdatedItemStatus] = useState(null)
  const [updateItemMessage, setUpdatedItemMessage] = useState('')
  const [isItemDeleted, setIsItemDeleted] = useState(null)
  const [itemDeletedMsg, setItemDeletedMsg] = useState('')

  const { file } = useContext(FileUploadContext)

  useEffect(() => {
    response && setProduct(response[0])
    return () => setProduct([''])
  }, [response])

  const handleUpdateProduct = async (e: {
    target: any
    key?: string
    preventDefault: () => void
  }) => {
    e.preventDefault()

    //using FormData to send constructed data
    const formData = new FormData()
    formData.append('itemName', itemName)
    formData.append('currentPrice', currentPrice)
    formData.append('quantity', quantity)
    formData.append('category', category[0])
    formData.append('productStatus', productStatus)
    formData.append('description', itemDesc)
    file.map((itemImg: any) => {
      formData.append('foodImg', itemImg)
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
    } catch (err) {
      console.log(err)
    }
  }

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
            ? notify({ type: 'success', msg: updateItemMessage })
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
          {/* <label htmlFor='uploadImg' className='flex items-center gap-y-2 flex-col'>
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
          </label> */}

          <label htmlFor='username' className='form__group'>
            <span className='form__label'>اسم المنتج</span>
            <input
              type='text'
              id='username'
              className='form__input'
              onChange={e => setItemName(createSlug(e.target.value.trim()))}
              defaultValue={product?.itemName}
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
                checked={productStatus === 'open'}
                onChange={e => setProductStatus(e.target.value)}
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
                checked={productStatus === 'close'}
                onChange={e => setProductStatus(e.target.value)}
              />
               <span>مغلق</span>
            </label>
          </div>

          <label htmlFor='category' className='form__group'>
            <span className='form__label active'>التصنيف</span>
            <select id='category' className='form__input'>
              <option value=''>اختر التصنيف</option>
              {/* {categoryList?.map((category, idx) => ( */}
              <option value={'category[0]'}>{'category[1]'}</option>
              {/* ))} */}
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
