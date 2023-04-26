import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import useEventListener from '@/hooks/useEventListener'
import { useAxios } from '@/hooks/useAxios'
import useAuth from '@/hooks/useAuth'
import { FileUploadContext } from '@/contexts/FileUploadContext'
import { AppSettingsContext } from '@/contexts/AppSettingsContext'
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
import { AppSettingsProps, CategoryProps, UserType, catchResponse } from '@/types'
import { getCookies } from '@/utils/cookies'
import { parseJson } from '@/utils/jsonTools'

const EditCategory = () => {
  const DOCUMENT_TITLE = 'تعديل التصنيف'
  useDocumentTitle(DOCUMENT_TITLE)

  const { getLocalStorageUser } = useContext<AppSettingsProps>(AppSettingsContext)

  const { loading: loadingAuth, userData, userType } = useAuth()
  const { id: userId }: UserType = !userData
    ? getLocalStorageUser()
      ? parseJson(getLocalStorageUser())[0]
      : USER_DATA
    : userData
  const token = getCookies()

  const { id } = useParams()

  //Form States
  const [category, setCategory] = useState<CategoryProps | null>(null)
  const [categoryNameAr, setCategoryNameAr] = useState('')
  const [categoryNameEn, setCategoryNameEn] = useState('')
  const [categoryStatus, setProductStatus] = useState('')
  const [categoryDesc, setCategoryDesc] = useState('')
  const [delCategoryId, setDelCategoryId] = useState('')
  const [delCategoryName, setDelCategoryName] = useState('')
  const [modalLoading, setModalLoading] = useState<boolean>(false)
  const [updateCategoryStatus, setUpdatedCategoryStatus] = useState<number | null>(null)
  const [updateCategoryMessage, setUpdatedCategoryMessage] = useState('')
  const [isCategoryDeleted, setIsCategoryDeleted] = useState<number | null>(null)
  const [CategoryDeletedMsg, setCategoryDeletedMsg] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)

  const { file } = useContext(FileUploadContext)

  const { data, loading } = useAxios({ url: `/categories/${id}` })
  useEffect(() => {
    if (data !== null) {
      setCategory(data[0])
    }
  }, [data && data[0]])

  const handleUpdateCategory = async (e: {
    target: any
    key?: string
    preventDefault: () => void
  }) => {
    e.preventDefault()
    e.target.querySelector('button').setAttribute('disabled', 'disabled')
    setIsUpdating(true)

    const currentCategoryNameAr = categoryNameAr || category?.categoryNameAr!
    const currentCategoryNameEn = categoryNameEn || category?.categoryNameEn!
    const currentCategoryStatus =
      userType === 'supplier'
        ? category?.categoryStatus!
        : userType === 'admin'
        ? categoryStatus || category?.categoryStatus
        : 'close'
    const currentCategoryDesc = categoryDesc || category?.description!
    const currentCategoryImg = category?.imgUrl!

    //using FormData to send constructed data
    const formData = new FormData()
    formData.append('categoryNameAr', currentCategoryNameAr)
    formData.append('categoryNameEn', currentCategoryNameEn)
    formData.append('categoryStatus', currentCategoryStatus ?? 'close')
    formData.append('description', currentCategoryDesc)
    formData.append('currentCategoryImg', currentCategoryImg)
    file.map((img: any) => {
      formData.append('categoryImg', img)
    })

    try {
      const response = await axios.patch(`${API_URL}/categories/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      })
      const { categoryUpdated, message } = response.data

      setUpdatedCategoryStatus(categoryUpdated)
      setUpdatedCategoryMessage(message)
    } catch (err: any) {
      const {
        response: {
          data: { error }
        }
      }: catchResponse = err
      setUpdatedCategoryStatus(0)
      setUpdatedCategoryMessage(`عفواً، حدث خطأ ما: ${error}`)
    } finally {
      setIsUpdating(false)
    }
  }

  useEventListener('click', (e: any) => {
    switch (e.target.id) {
      case 'deleteBtn': {
        setDelCategoryId(e.target.dataset.id)
        setDelCategoryName(removeSlug(e.target.dataset.name))
        setModalLoading(true)
        break
      }
      case 'confirm': {
        handleDeleteCategory(delCategoryId)
        break
      }
      case 'cancel': {
        setModalLoading(false)
        break
      }
    }
  })

  const handleDeleteCategory = async (itemId: string) => {
    const imgUrl = category?.imgUrl!
    try {
      const response = await axios.delete(
        `${API_URL}/categories/${itemId}?imgUrl=${imgUrl}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      const { categoryDeleted, message } = response.data
      setIsCategoryDeleted(categoryDeleted)
      setCategoryDeletedMsg(message)
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
  ) : !userId || userType !== 'admin' ? (
    <ModalNotFound btnLink='/supplier/categories' btnName='التصنيفات' />
  ) : (
    <Layout>
      <section className='container overflow-x-hidden px-5 rtl mx-auto max-w-6xl h-full'>
        <div className='hidden'>
          {updateCategoryStatus === 1
            ? notify({
                type: 'success',
                msg: updateCategoryMessage,
                reloadIn: TIME_TO_EXECUTE,
                reloadTo: goTo('categories')
              })
            : updateCategoryStatus === 0
            ? notify({ type: 'error', msg: updateCategoryMessage })
            : isCategoryDeleted === 1
            ? notify({
                type: 'success',
                msg: CategoryDeletedMsg,
                reloadIn: TIME_TO_EXECUTE,
                reloadTo: goTo('categories')
              })
            : isCategoryDeleted === 0
            ? notify({ type: 'error', msg: CategoryDeletedMsg })
            : null}
        </div>

        {/* Confirm Box */}
        {modalLoading && (
          <Modal
            status={Loading}
            classes='text-blue-600 dark:text-blue-400 text-lg'
            msg={`هل أنت متأكد من حذف تصنيف الــ ${delCategoryName} ؟ لا يمكن التراجع عن هذا القرار، سيتم حذف جميع المنتجات المرتبطة بهذا التصنيف، من فضلك تأكد من نقلها إلى تصنيف آخر في حال لم ترد حذف المنتجات المرتبطة بهذا التصنيف.`}
            ctaConfirmBtns={['حذف', 'الغاء']}
          />
        )}
        {isSmallScreen && <BackButton to='/' className='absolute z-50 top-6 left-6' />}

        {loading ? (
          <div className='flex justify-center items-center my-48'>
            <LoadingSpinner title='جار البحث عن التصنيف...' />
          </div>
        ) : (
          <>
            <h2 className='text-xl text-center my-16'>{DOCUMENT_TITLE}</h2>
            <form
              className='relative flex flex-col items-center'
              onSubmit={handleUpdateCategory}
            >
              <label htmlFor='uploadImg' className='flex items-center gap-y-2 flex-col'>
                <FileUpload
                  data={{
                    defaultImg: [
                      {
                        ImgDisplayName: category?.categoryNameEn,
                        ImgDisplayPath: category?.imgUrl
                      }
                    ],
                    imgName: category?.categoryNameEn,
                    label: 'تغيير صورة'
                  }}
                  required={false}
                />
              </label>

              <label htmlFor='categoryNameAr' className='form__group'>
                <span className='form__label'>اسم التصنيف بالعربي</span>
                <input
                  type='text'
                  id='categoryNameAr'
                  className='form__input'
                  onChange={e => setCategoryNameAr(createSlug(e.target.value.trim()))}
                  defaultValue={removeSlug(category?.categoryNameAr!)}
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
                  defaultValue={removeSlug(category?.categoryNameEn!)}
                  required
                />
              </label>

              {userType === 'admin' && (
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
                        categoryStatus
                          ? categoryStatus === 'open'
                          : category?.categoryStatus === 'open'
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
                        categoryStatus
                          ? categoryStatus === 'close'
                          : category?.categoryStatus === 'close'
                      }
                      onChange={() => setProductStatus('close')}
                    />
                    <span>مغلق</span>
                  </label>
                </div>
              )}

              <label htmlFor='description' className='form__group'>
                <span className='form__label'>الوصـــــف</span>
                <textarea
                  name='description'
                  id='description'
                  minLength={10}
                  maxLength={300}
                  className='form__input'
                  onChange={e => setCategoryDesc(e.target.value.trim())}
                  defaultValue={category?.description}
                  required
                ></textarea>
              </label>

              <div className='flex items-center gap-x-20'>
                <button
                  type='submit'
                  className={`min-w-[7rem] bg-green-600 hover:bg-green-700 text-white py-1.5 px-6 rounded-md${
                    isUpdating || updateCategoryStatus === 1
                      ? ' disabled:opacity-30 disabled:hover:bg-green-700 disabled:cursor-not-allowed'
                      : ''
                  }`}
                >
                  {isUpdating ? (
                    <>
                      <LoadingSpinner />
                      &nbsp; جارِ تحديث التصنيف...
                    </>
                  ) : (
                    'تحديث'
                  )}
                </button>
                <DeleteBtn id={category?.id!} itemName={category?.categoryNameAr!} />
              </div>
            </form>
          </>
        )}
      </section>
    </Layout>
  )
}

export default EditCategory
