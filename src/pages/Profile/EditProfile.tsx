import useAuth from '@/hooks/useAuth'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import { LoadingPage, LoadingSpinner } from '@/components/Loading'
import FileUpload from '@/components/FileUpload'
import BorderLink from '@/components/Icons/BorderLink'
import ThemeToggler from '@/components/ThemeToggler'
import { API_URL, isSmallScreen, TIME_TO_EXECUTE, USER_DATA } from '@/constants'
import BackButton from '@/components/Icons/BackButton'
import Layout from '@/components/Layout'
import { AppSettingsContext } from '@/contexts/AppSettingsContext'
import { FileUploadContext } from '@/contexts/FileUploadContext'
import { handleLogout } from '@/utils/handleLogout'
import { useContext, useEffect, useState } from 'react'
import { AppSettingsProps, catchResponse, UserType } from '@/types'
import { useAxios } from '@/hooks/useAxios'
import { parseJson, stringJson } from '@/utils/jsonTools'
import axios from 'axios'
import { getCookies } from '@/utils/cookies'
import notify from '@/utils/notify'
import goTo from '@/utils/goTo'

const EditProfile = () => {
  useDocumentTitle('تعديل بيانات الحساب')
  const token = getCookies()
  const { loading, userData } = useAuth()
  const { getLocalStorageUser } = useContext<AppSettingsProps>(AppSettingsContext)

  const {
    username,
    firstname,
    lastname,
    gender,
    phone,
    id: accountId
  } = loading ? parseJson(getLocalStorageUser())[0] || USER_DATA : userData

  const [fetchedUser, setFetchedUser] = useState<UserType | null>(null)
  const [userFullName, setUserFullName] = useState(`${firstname} ${lastname}`)
  const [tel, setTel] = useState('')
  const [userGender, setUserGender] = useState('')
  const [updateStatus, setUpdateStatus] = useState<any>(null)
  const [updateMsg, setUpdateMsg] = useState<any>('')
  const [isUpdating, setIsUpdating] = useState(false)

  const { file } = useContext(FileUploadContext)

  const { loading: loadingFetch, response } = useAxios({
    url: `/users/${accountId}`,
    headers: stringJson({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    })
  })
  useEffect(() => {
    if (!loadingFetch && response !== null) {
      setFetchedUser(response !== null && response[0])
    }
  }, [response])

  const handleUpdateProfile = async (e: {
    target: any
    key?: string
    preventDefault: () => void
  }) => {
    e.preventDefault()
    e.target.querySelector('button').setAttribute('disabled', 'disabled')
    setIsUpdating(true)

    const firstname = userFullName.split(' ')[0]
    const lastname = userFullName.split(' ')[1]

    const currentUserFullName =
      (`${fetchedUser?.firstname} ${fetchedUser?.lastname}` ||
        `${firstname} ${lastname}`) ??
      username
    const currentTel = tel || String(fetchedUser?.phone ?? phone)
    const currentUserGender = (userGender ?? 'male') || (fetchedUser?.gender ?? 'male')
    const currentProfileImg = fetchedUser?.avatarUrl!

    //using FormData to send constructed data
    const formData = new FormData()
    formData.append('userFullName', currentUserFullName)
    formData.append('tel', currentTel)
    formData.append('gender', currentUserGender)
    formData.append('currentProfileImg', currentProfileImg)
    file.map((img: any) => {
      formData.append('profileImg', img)
    })

    try {
      const response = await axios.patch(`${API_URL}/users/${accountId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      })
      const { userUpdated, message } = response.data

      setUpdateStatus(userUpdated)
      setUpdateMsg(message)
    } catch (err: any) {
      const {
        response: {
          data: { error }
        }
      }: catchResponse = err
      setUpdateStatus(0)
      setUpdateMsg(`عفواً، حدث خطأ ما: ${error}`)
    } finally {
      setIsUpdating(false)
    }
  }

  return !loadingFetch !== null && fetchedUser !== null ? (
    <Layout>
      <section className='container overflow-x-hidden px-5 rtl mx-auto max-w-6xl'>
        <div className='hidden'>
          {updateStatus === 1
            ? notify({
                type: 'success',
                msg: updateMsg,
                reloadIn: TIME_TO_EXECUTE,
                reloadTo: goTo('edit')
              })
            : updateStatus === 0
            ? notify({ type: 'error', msg: updateMsg })
            : null}
        </div>
        {isSmallScreen && <BackButton to='/' className='absolute z-50 top-6 left-6' />}

        <form
          className='relative flex flex-col items-center'
          onSubmit={handleUpdateProfile}
        >
          <label htmlFor='uploadImg' className='flex items-center gap-y-2 flex-col'>
            <FileUpload
              data={{
                defaultImg: [
                  {
                    ImgDisplayName: fetchedUser?.username + ' profile',
                    ImgDisplayPath: fetchedUser?.avatarUrl
                  }
                ],
                imgName: fetchedUser?.username + ' profile'
              }}
            />
          </label>

          <label htmlFor='username' className='form__group'>
            <span className='form__label'>الاســـــــــم</span>
            <input
              type='text'
              id='username'
              className='form__input'
              onChange={e => setUserFullName(e.target.value)}
              defaultValue={`${fetchedUser?.firstname} ${fetchedUser?.lastname}`}
              required
            />
          </label>
          <div className='form__group'>
            <span className='form__label'>النــــــــــوع</span>
            <label className='form__group cursor-pointer' htmlFor='male'>
              <input
                className='form__input'
                type='radio'
                id='male'
                name='gender'
                value='male'
                checked={
                  userGender ? userGender === 'male' : fetchedUser.gender === 'male'
                }
                onChange={() => setUserGender('male')}
              />
              <span>ذكر</span>
            </label>
            <label className='form__group cursor-pointer' htmlFor='female'>
              <input
                className='form__input'
                type='radio'
                id='female'
                name='gender'
                value='female'
                checked={
                  userGender ? userGender === 'female' : fetchedUser.gender === 'female'
                }
                onChange={() => setUserGender('female')}
              />
              <span>أنثى</span>
            </label>
          </div>
          <label htmlFor='tel' className='form__group'>
            <span className='form__label'>الهاتــــــف</span>
            <input
              type='tel'
              id='tel'
              className='form__input ltr text-right'
              onChange={e => setTel(e.target.value)}
              defaultValue={fetchedUser ? fetchedUser?.phone : phone}
              required
            />
          </label>
          <div className='p-3 border border-gray-400 rounded-xl w-full my-10 space-y-7'>
            <BorderLink>
              <span>اللغة</span>
            </BorderLink>
            <BorderLink>
              <span>الاشعارات</span>
            </BorderLink>
            <BorderLink icon={<ThemeToggler />}>
              <label htmlFor='toggler'>الوضع الداكن</label>
            </BorderLink>
          </div>
          <div className='flex items-center gap-x-20'>
            <button
              type='submit'
              className={`min-w-fit bg-green-600 hover:bg-green-700 text-white py-1.5 px-6 rounded-md${
                isUpdating || updateStatus === 1
                  ? ' disabled:opacity-30 disabled:cursor-not-allowed'
                  : ''
              }`}
            >
              {isUpdating ? (
                <>
                  <LoadingSpinner />
                  &nbsp; جارِ التحديث...
                </>
              ) : (
                'تحديث'
              )}
            </button>
            <button
              type='button'
              onClick={() => handleLogout('/')}
              className='min-w-fit bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-6 rounded-md'
            >
              تسجيل الخروج
            </button>
          </div>
        </form>
      </section>
    </Layout>
  ) : (
    <LoadingPage />
  )
}

export default EditProfile
