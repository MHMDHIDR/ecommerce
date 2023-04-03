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
import notify from '@/utils/notify'
import goTo from '@/utils/goTo'
import ModalNotFound from '@/components/Modal/ModalNotFound'
import { getCookies } from '@/utils/cookies'

const EditProfile = () => {
  useDocumentTitle('تعديل بيانات الحساب')

  const token = getCookies()
  const { getLocalStorageUser, setLocalStorageUser } =
    useContext<AppSettingsProps>(AppSettingsContext)
  const { loading, userData } = useAuth()
  const {
    id: accountId,
    avatarUrl,
    username,
    firstname,
    lastname,
    phone,
    gender,
    type
  } = !userData
    ? getLocalStorageUser()
      ? parseJson(getLocalStorageUser())
      : USER_DATA
    : userData

  const [userFullName, setUserFullName] = useState('')
  const [tel, setTel] = useState('')
  const [userGender, setUserGender] = useState('')
  const [updateStatus, setUpdateStatus] = useState<any>(null)
  const [updateMsg, setUpdateMsg] = useState<any>('')
  const [isUpdating, setIsUpdating] = useState(false)

  const { file } = useContext(FileUploadContext)

  const handleUpdateProfile = async (e: {
    target: any
    key?: string
    preventDefault: () => void
  }) => {
    e.preventDefault()
    e.target.querySelector('button').setAttribute('disabled', 'disabled')
    setIsUpdating(true)

    const currentUserFullName = userFullName || `${firstname} ${lastname}`
    const currentTel = tel || phone!
    const currentUserGender = (userGender ?? 'male') || gender!
    const currentProfileImg = avatarUrl!

    //using FormData to send constructed data
    const formData = new FormData()
    formData.append('type', type!)
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
      const { userUpdated, message, updatedUser } = response.data
      const {
        id,
        firstname,
        lastname,
        gender,
        houseNumber,
        streetName,
        neighborhoodName,
        cityName,
        username,
        avatarUrl,
        phone,
        status,
        type,
        registerDate
      } = updatedUser

      setUpdateStatus(userUpdated)
      setUpdateMsg(message)

      if (userUpdated === 1) {
        setLocalStorageUser({
          id,
          firstname,
          lastname,
          gender,
          houseNumber,
          streetName,
          neighborhoodName,
          cityName,
          username,
          avatarUrl,
          phone,
          status,
          type,
          registerDate
        })
      }
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

  return loading ? (
    <LoadingPage />
  ) : !accountId ? (
    <ModalNotFound
      msg={`عليك تسجيل الدخول أولاً للمتابعة`}
      btnLink='/login?r=profile/edit'
      btnName='تسجيل الدخول'
    />
  ) : (
    <Layout>
      <section className='container overflow-x-hidden px-5 rtl mx-auto max-w-6xl'>
        <div className='hidden'>
          {updateStatus === 1
            ? notify({
                type: 'success',
                msg: updateMsg
                // ,reloadIn: TIME_TO_EXECUTE,
                // reloadTo: goTo('edit')
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
                    ImgDisplayName: username + ' profile',
                    ImgDisplayPath: avatarUrl
                  }
                ],
                imgName: username + ' profile'
              }}
              required={false}
            />
          </label>

          <label htmlFor='username' className='form__group'>
            <span className='form__label'>الاســـــــــم</span>
            <input
              type='text'
              id='username'
              className='form__input'
              onChange={e => setUserFullName(e.target.value)}
              defaultValue={`${firstname} ${lastname}`}
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
                checked={userGender ? userGender === 'male' : gender === 'male'}
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
                checked={userGender ? userGender === 'female' : gender === 'female'}
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
              defaultValue={phone ? phone : tel}
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
  )
}

export default EditProfile
