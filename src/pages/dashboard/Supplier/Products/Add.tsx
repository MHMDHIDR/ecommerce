import { Suspense, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import useAuth from '@/hooks/useAuth'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import { LoadingPage, LoadingSpinner } from '@/components/Loading'
import FileUpload from '@/components/FileUpload'
import BackButton from '@/components/Icons/BackButton'
import Layout from '@/components/Layout'
import {
  isSmallScreen,
  CATEGORIES,
  API_URL,
  USER_DATA,
  TIME_TO_EXECUTE
} from '@/constants'
import goTo from '@/utils/goTo'
import { FileUploadContext } from '@/contexts/FileUploadContext'
import { createSlug } from '@/utils/slug'
import notify from '@/utils/notify'
import { getCookies } from '@/utils/cookies'
import { UserType } from '@/types'

const AddProduct = () => {
  const DOCUMENT_TITLE = 'إضافة منتج جديد'
  useDocumentTitle(DOCUMENT_TITLE)

  const { loading: loadingAuth, userData } = useAuth()
  const { id: userId, type }: { id: UserType['id']; type: UserType['type'] } =
    userData || {
      id: USER_DATA.type,
      type: USER_DATA.type
    }
  const token = getCookies()

  //Form States
  const [itemName, setItemName] = useState('')
  const [currentPrice, setCurrentPrice] = useState('')
  const [quantity, setQuantity] = useState('')
  const [category, setCategory] = useState<any>([])
  const [productStatus, setProductStatus] = useState('open')
  const [itemDesc, setItemDesc] = useState('')
  const [addItemStatus, setAddItemStatus] = useState<number | null>(null)
  const [addItemMessage, setAddItemMessage] = useState('')
  const [isAdding, setIsAdding] = useState(false)

  const { file } = useContext(FileUploadContext)

  const handleAddProduct = async (e: {
    target: any
    key?: string
    preventDefault: () => void
  }) => {
    e.preventDefault()

    e.target.reset()
    e.target.querySelector('button').setAttribute('disabled', 'disabled')
    setIsAdding(true)

    //using FormData to send constructed data
    const formData = new FormData()
    formData.append('itemName', itemName)
    formData.append('currentPrice', currentPrice)
    formData.append('quantity', quantity)
    formData.append('category', category[0])
    formData.append('productStatus', type === 'supplier' ? 'close' : productStatus)
    formData.append('description', itemDesc)
    file.map((img: any) => {
      formData.append('productImg', img)
    })

    try {
      const response = await axios.post(`${API_URL}/products`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      })
      const { itemAdded, message } = response.data

      setAddItemStatus(itemAdded)
      setAddItemMessage(message)
    } catch (error: any) {
      setAddItemStatus(0)
      setAddItemMessage(`عفواً، حدث خطأ ما: ${error.message}`)
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <Suspense fallback={<LoadingPage />}>
      <Layout>
        <section className='container overflow-x-hidden px-5 rtl mx-auto max-w-6xl h-full'>
          <div className='hidden'>
            {addItemStatus === 1
              ? notify({
                  type: 'success',
                  msg: addItemMessage,
                  reloadIn: TIME_TO_EXECUTE,
                  reloadTo: goTo('products')
                })
              : addItemStatus === 0
              ? notify({ type: 'error', msg: addItemMessage })
              : null}
          </div>
          {isSmallScreen && <BackButton to='/' className='absolute z-50 top-6 left-6' />}
          <h2 className='text-xl text-center my-16'>{DOCUMENT_TITLE}</h2>
          <form
            className='relative flex flex-col items-center'
            onSubmit={handleAddProduct}
          >
            <label htmlFor='uploadImg' className='flex items-center gap-y-2 flex-col'>
              <FileUpload
                data={{
                  defaultImg: [
                    {
                      ImgDisplayName: 'product image',
                      ImgDisplayPath: '/assets/img/logo.png'
                    }
                  ],
                  imgName: 'product image',
                  label: 'أضف صورة'
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
            )}

            <label htmlFor='category' className='form__group'>
              <span className='form__label active'>التصنيف</span>
              <select
                id='category'
                className='form__input'
                onChange={e =>
                  setCategory([
                    e.target.value.trim(),
                    e.target.options[e.target.selectedIndex].textContent
                  ])
                }
              >
                <option value=''>اختر التصنيف</option>
                {CATEGORIES?.map(({ en_label, ar_label }, idx) => (
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
                maxLength={1000}
                className='form__input'
                required
                onChange={e => setItemDesc(e.target.value.trim())}
              ></textarea>
            </label>

            <div className='flex items-center gap-x-20'>
              <button
                type='submit'
                className={`min-w-[7rem] bg-green-600 hover:bg-green-700 text-white py-1.5 px-6 rounded-md${
                  isAdding || addItemStatus === 1
                    ? ' disabled:opacity-30 disabled:hover:bg-green-700 disabled:cursor-not-allowed'
                    : ''
                }`}
              >
                {isAdding ? (
                  <>
                    <LoadingSpinner />
                    &nbsp; جارِ اضافة المنتج...
                  </>
                ) : (
                  'إضافة'
                )}
              </button>
              <Link
                to={goTo('products')}
                className='text-gray-800 underline-hover text-bold dark:text-white'
              >
                القائمة
              </Link>
            </div>
          </form>
        </section>
      </Layout>
    </Suspense>
  )
}

export default AddProduct
