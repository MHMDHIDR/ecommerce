import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useAxios } from '@/hooks/useAxios'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import useEventListener from '@/hooks/useEventListener'
import useAuth from '@/hooks/useAuth'
import { AppSettingsContext } from '@/contexts/AppSettingsContext'
import { CategoryProps } from '@/types'
import { API_URL, TIME_TO_EXECUTE, USER_DATA } from '@/constants'
import { createLocaleDateString } from '@/utils/convertDate'
import goTo from '@/utils/goTo'
import { removeSlug } from '@/utils/slug'
import notify from '@/utils/notify'
import { parseJson } from '@/utils/jsonTools'
import { getCookies } from '@/utils/cookies'
import Layout from '@/components/Layout'
import { LoadingPage, LoadingSpinner } from '@/components/Loading'
import { DeleteBtn, EditBtn } from '@/components/TableActions'
import Modal from '@/components/Modal'
import { Loading } from '@/components/Icons/Status'
import ModalNotFound from '@/components/Modal/ModalNotFound'
import NavMenu from '@/components/NavMenu'
import { ClickableButton } from '@/components/Button'
import { AddBtn } from '@/components/Icons/ControlBtn'

const ViewCategory = () => {
  const DOCUMENT_TITLE = 'التصنيفــــــــــات'
  useDocumentTitle(DOCUMENT_TITLE)

  const token = getCookies()

  const { getLocalStorageUser } = useContext(AppSettingsContext)
  const { loading: loadingAuth, userData } = useAuth()
  const { id, type: authType } = userData || { id: USER_DATA.id, type: USER_DATA.type }
  const addedById = getLocalStorageUser() ? parseJson(getLocalStorageUser())[0].id : id
  const type = getLocalStorageUser() ? parseJson(getLocalStorageUser())[0].type : authType

  const [delCategoryId, setDelCategoryId] = useState('')
  const [delCategoryName, setDelCategoryName] = useState('')
  const [delCategoryImg, setDelCategoryImg] = useState('')
  const [isCategoryDeleted, setIsCategoryDeleted] = useState(null)
  const [itemCategoryMsg, setCategoryDeletedMsg] = useState('')
  const [modalLoading, setModalLoading] = useState<boolean>(false)
  const [categories, setCategories] = useState<CategoryProps[]>()

  const { response, loading } = useAxios({
    url: `/categories${type !== 'admin' ? `?addedById=${addedById}` : ''}`
  })

  useEffect(() => {
    if (response !== null) {
      setCategories(response)
    }
  }, [loading, response])

  useEventListener('click', (e: any) => {
    switch (e.target.id) {
      case 'deleteBtn': {
        setDelCategoryId(e.target.dataset.id)
        setDelCategoryName(removeSlug(e.target.dataset.name))
        setDelCategoryImg(e.target.dataset.imgUrl)
        setModalLoading(true)
        break
      }
      case 'confirm': {
        handleDeleteProduct(delCategoryId, delCategoryImg)
        break
      }
      case 'cancel': {
        setModalLoading(false)
        break
      }
    }
  })

  const handleDeleteProduct = async (itemId: string, imgUrl: string) => {
    try {
      const response = await axios.delete(
        `${API_URL}/categories/${itemId}?imgUrl=${imgUrl}`,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
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

  return loadingAuth || loading ? (
    <LoadingPage />
  ) : !id || (type !== 'admin' && type !== 'supplier') ? (
    <ModalNotFound />
  ) : (
    <Layout>
      <section className='container overflow-x-auto px-5 rtl mx-auto max-w-6xl h-full'>
        <div className='hidden'>
          {isCategoryDeleted === 1
            ? notify({
                type: 'success',
                msg: itemCategoryMsg,
                reloadIn: TIME_TO_EXECUTE,
                reloadTo: goTo('categories')
              })
            : isCategoryDeleted === 0
            ? notify({ type: 'error', msg: itemCategoryMsg })
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
        <h2 className='text-xl text-center my-16'>{DOCUMENT_TITLE}</h2>

        <Link to={goTo(`category/add`)}>
          <ClickableButton className='bg-sky-500 hover:bg-sky-600 shadow-sky-600 hover:shadow-sky-800'>
            <>
              <AddBtn className='inline-flex ml-4 w-4 h-4 fill-white' />
              <span>أضف تصنيف</span>
            </>
          </ClickableButton>
        </Link>

        <table className='w-full bg-white dark:bg-gray-600 text-xs text-gray-900 dark:text-white text-center rounded-lg border border-gray-200 dark:border-gray-900 shadow-md dark:shadow-gray-900'>
          <thead className='bg-gray-50 dark:bg-gray-700'>
            <tr>
              <th className='py-2'>الرقم</th>
              <th className='py-2'>الصورة</th>
              <th className='py-2'>اسم التصنيف</th>
              <th className='py-2'>الحالة</th>
              <th className='py-2'>تاريخ الإنشاء</th>
              <th className='py-2'>تاريخ تحديث</th>
              <th className='py-2'>الإجراء</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-100 dark:divide-gray-500 border-t border-gray-100 dark:border-gray-500'>
            {loadingAuth || loading ? (
              <tr>
                <td colSpan={100} className='p-5'>
                  <LoadingSpinner title='جار البحث عن التصنيفات...' />
                </td>
              </tr>
            ) : categories && categories.length > 0 ? (
              categories?.map((category: CategoryProps, idx: number) => (
                <tr className='hover:bg-gray-50 dark:hover:bg-gray-700' key={category.id}>
                  <td>
                    <Link to={goTo(`category/${category.id}`)} className='py-3 px-5'>
                      <span>{idx + 1}</span>
                    </Link>
                  </td>
                  <td>
                    <Link to={goTo(`category/${category.id}`)} className='py-3 px-5'>
                      <img
                        loading='lazy'
                        src={category.imgUrl}
                        alt={category.categoryNameEn}
                        height={36}
                        width={36}
                        className='object-cover rounded-lg shadow-md h-9 w-9'
                      />
                    </Link>
                  </td>
                  <td className='min-w-[12rem]'>
                    <Link to={goTo(`category/${category.id}`)} className='py-3 px-5'>
                      {removeSlug(category.categoryNameAr)}
                    </Link>
                  </td>
                  <td>
                    <Link to={goTo(`category/${category.id}`)} className='py-3 px-5'>
                      <span
                        className={`inline-flex items-center gap-1 min-w-max rounded-full bg-green-50 px-2 py-1 text-xs ${
                          category.categoryStatus === 'accept'
                            ? 'text-green-600'
                            : category.categoryStatus === 'reject'
                            ? 'text-red-600'
                            : 'text-gray-600'
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            category.categoryStatus === 'open'
                              ? 'bg-green-600'
                              : category.categoryStatus === 'close'
                              ? 'bg-red-600'
                              : 'bg-gray-600'
                          }`}
                        />
                        {category.categoryStatus === 'open'
                          ? 'تم الموافقة'
                          : category.categoryStatus === 'close'
                          ? 'لم يتم الموافقة بعد'
                          : 'في انتظار الادارة'}
                      </span>
                    </Link>
                  </td>
                  <td className='min-w-[14rem]'>
                    <Link to={goTo(`category/${category.id}`)} className='py-3 px-5'>
                      <span>{createLocaleDateString(category.createDate)}</span>
                    </Link>
                  </td>
                  <td className='min-w-[14rem]'>
                    <Link to={goTo(`category/${category.id}`)} className='py-3 px-5'>
                      <span>{createLocaleDateString(category.updateDate)}</span>
                    </Link>
                  </td>
                  <td>
                    <NavMenu>
                      <DeleteBtn
                        id={category.id}
                        itemName={category.categoryNameAr}
                        imgUrl={category.imgUrl}
                      />
                      <EditBtn to='category' id={category.id} />
                    </NavMenu>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={100} className='p-5'>
                  <div className='flex flex-col justify-center items-center gap-y-4'>
                    <p className='text-red-600 dark:text-red-400'>
                      عفواً، لم يتم العثور على تصنيفات
                    </p>
                    <Link
                      to={goTo('category/add')}
                      className='rounded-md bg-blue-600 px-5 py-1 text-center text-sm text-white hover:bg-gray-700'
                    >
                      أضف تصنيف
                    </Link>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </Layout>
  )
}

export default ViewCategory
