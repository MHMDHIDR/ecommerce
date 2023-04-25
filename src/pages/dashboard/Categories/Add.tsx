import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import useAuth from '@/hooks/useAuth'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import { LoadingPage, LoadingSpinner } from '@/components/Loading'
import FileUpload from '@/components/FileUpload'
import BackButton from '@/components/Icons/BackButton'
import Layout from '@/components/Layout'
import { isSmallScreen, API_URL, USER_DATA, TIME_TO_EXECUTE } from '@/constants'
import goTo from '@/utils/goTo'
import { FileUploadContext } from '@/contexts/FileUploadContext'
import { createSlug } from '@/utils/slug'
import notify from '@/utils/notify'
import { getCookies } from '@/utils/cookies'
import { AppSettingsProps } from '@/types'
import { AppSettingsContext } from '@/contexts/AppSettingsContext'
import { parseJson } from '@/utils/jsonTools'
import ModalNotFound from '@/components/Modal/ModalNotFound'

const AddCategory = () => {
  const DOCUMENT_TITLE = 'أضف تصنيف'
  useDocumentTitle(DOCUMENT_TITLE)

  const token = getCookies()

  const { getLocalStorageUser } = useContext<AppSettingsProps>(AppSettingsContext)
  const { loading, userData } = useAuth()
  const { id, type, firstname, lastname, username } = !userData
    ? getLocalStorageUser()
      ? parseJson(getLocalStorageUser())[0]
      : USER_DATA
    : userData

  //Form States
  const [categoryNameAr, setCategoryNameAr] = useState('')
  const [categoryNameEn, setCategoryNameEn] = useState('')
  const [categoryStatus, setCategoryStatus] = useState('open')
  const [categoryDesc, setCategoryDesc] = useState('')
  const [addStatus, setAddStatus] = useState<number | null>(null)
  const [addMessage, setAddMessage] = useState('')
  const [isAdding, setIsAdding] = useState(false)

  const { file } = useContext(FileUploadContext)

  const handleAddProduct = async (e: {
    target: any
    key?: string
    preventDefault: () => void
  }) => {
    e.preventDefault()

    setIsAdding(true)

    //using FormData to send constructed data
    const formData = new FormData()
    formData.append('addedById', id)
    formData.append(
      'addedByName',
      firstname.length > 0 ? firstname + ' ' + lastname : username
    ) //if we've firstname and lastname add them, else use the username
    formData.append('categoryNameEn', categoryNameEn)
    formData.append('categoryNameAr', categoryNameAr)
    formData.append('categoryStatus', type === 'supplier' ? 'close' : categoryStatus)
    formData.append('description', categoryDesc)
    file.map((img: any) => {
      formData.append('categoryImg', img)
    })

    try {
      const response = await axios.post(`${API_URL}/categories`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      })
      const { categoryAdded, message } = response.data

      setAddStatus(categoryAdded)
      setAddMessage(message)
      if (categoryAdded === 1) {
        e.target.reset()
        e.target.querySelector('button').setAttribute('disabled', 'disabled')
      }
    } catch (error: any) {
      setAddStatus(0)
      setAddMessage(`عفواً، حدث خطأ ما: ${error.message}`)
    } finally {
      setIsAdding(false)
    }
  }

  return loading ? (
    <LoadingPage />
  ) : !id && type !== 'admin' && type !== 'supplier' ? (
    <ModalNotFound />
  ) : (
    <Layout>
      <section className='container overflow-x-hidden px-5 rtl mx-auto max-w-6xl h-full'>
        <div className='hidden'>
          {addStatus === 1
            ? notify({
                type: 'success',
                msg: addMessage,
                reloadIn: TIME_TO_EXECUTE,
                reloadTo: goTo('categories')
              })
            : addStatus === 0
            ? notify({ type: 'error', msg: addMessage })
            : null}
        </div>
        {isSmallScreen && <BackButton to='/' className='absolute z-50 top-6 left-6' />}
        <h2 className='text-xl text-center my-16'>{DOCUMENT_TITLE}</h2>
        <form className='relative flex flex-col items-center' onSubmit={handleAddProduct}>
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

          <label htmlFor='categoryNameAr' className='form__group'>
            <span className='form__label'>اسم التصنيف بالعربي</span>
            <input
              type='text'
              id='categoryNameAr'
              className='form__input'
              onChange={e => setCategoryNameAr(createSlug(e.target.value.trim()))}
              required
            />
          </label>

          <label htmlFor='categoryNameEn' className='form__group'>
            <span className='form__label'>اسم التصنيف بالإنجليزي</span>
            <input
              type='text'
              id='categoryNameEn'
              className='form__input'
              onChange={e => setCategoryNameEn(createSlug(e.target.value.trim()))}
              required
            />
          </label>

          {type === 'admin' && (
            <div className='form__group'>
              <span className='form__label'>حالة التصنيف</span>
              <label className='form__group cursor-pointer' htmlFor='open'>
                <input
                  className='form__input'
                  type='radio'
                  id='open'
                  name='type'
                  value='open'
                  checked={categoryStatus === 'open'}
                  onChange={e => setCategoryStatus(e.target.value)}
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
                  checked={categoryStatus === 'close'}
                  onChange={e => setCategoryStatus(e.target.value)}
                />
                 <span>مغلق</span>
              </label>
            </div>
          )}

          <label htmlFor='description' className='form__group'>
            <span className='form__label'>الوصف</span>
            <textarea
              name='description'
              id='description'
              minLength={10}
              maxLength={1000}
              className='form__input'
              onChange={e => setCategoryDesc(e.target.value.trim())}
              required
            ></textarea>
          </label>

          <div className='flex items-center gap-x-20'>
            <button
              type='submit'
              className={`min-w-[7rem] bg-green-600 hover:bg-green-700 text-white py-1.5 px-6 rounded-md${
                isAdding || addStatus === 1
                  ? ' disabled:opacity-30 disabled:hover:bg-green-700 disabled:cursor-not-allowed'
                  : ''
              }`}
            >
              {isAdding ? (
                <>
                  <LoadingSpinner />
                  &nbsp; جارِ اضافة التصنيف...
                </>
              ) : (
                'إضافة'
              )}
            </button>
            <Link
              to={goTo('categories')}
              className='text-gray-800 underline-hover text-bold dark:text-white'
            >
              عرض التصنيفات
            </Link>
          </div>
        </form>
      </section>
    </Layout>
  )
}

export default AddCategory
