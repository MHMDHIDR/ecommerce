import { useContext, useEffect, useState } from 'react'
import useAuth from '@/hooks/useAuth'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import { LoadingPage, LoadingSpinner } from '@/components/Loading'
import { API_URL, isSmallScreen, TIME_TO_EXECUTE, USER_DATA } from '@/constants'
import BackButton from '@/components/Icons/BackButton'
import Layout from '@/components/Layout'
import { getCookies } from '@/utils/cookies'
import { AppSettingsContext } from '@/contexts/AppSettingsContext'
import { AppSettingsProps, UserType, catchResponse } from '@/types'
import { parseJson, stringJson } from '@/utils/jsonTools'
import { useAxios } from '@/hooks/useAxios'
import axios from 'axios'
import notify from '@/utils/notify'
import goTo from '@/utils/goTo'

const ShippingAddress = () => {
  const DOCUMENT_TITLE = 'عنوان التوصيل'
  useDocumentTitle(DOCUMENT_TITLE)
  const token = getCookies()
  const { loading, userData } = useAuth()
  const { getLocalStorageUser, setLocalStorageUser } =
    useContext<AppSettingsProps>(AppSettingsContext)

  const { phone, id: accountId } = !userData
    ? getLocalStorageUser()
      ? parseJson(getLocalStorageUser())
      : USER_DATA
    : userData

  const [fetchedUser, setFetchedUser] = useState<UserType | null>(null)
  const [houseNumber, setHouseNumber] = useState<number>()
  const [streetName, setStreetName] = useState<string>('')
  const [neighborhoodName, setNeighborhoodName] = useState<string>('')
  const [cityName, setCityName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState<string>()
  //Status
  const [updateStatus, setUpdateStatus] = useState<number | null>(null)
  const [updateMsg, setUpdateMsg] = useState<string>('')
  const [isUpdating, setIsUpdating] = useState(false)

  const { loading: loadingFetch, data } = useAxios({
    url: `/users/${accountId}`,
    headers: stringJson({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    })
  })

  useEffect(() => {
    if (!loadingFetch && data !== null) {
      setFetchedUser(data[0])
    }
  }, [data])

  const handleUpdateShippingAddress = async (e: {
    target: any
    key?: string
    preventDefault: () => void
  }) => {
    e.preventDefault()
    e.target.querySelector('button').setAttribute('disabled', 'disabled')
    setIsUpdating(true)

    const currentHouseNumber = houseNumber || fetchedUser?.houseNumber
    const currentStreetName = streetName || fetchedUser?.streetName
    const currentNeighborhoodName = neighborhoodName || fetchedUser?.neighborhoodName
    const currentCityName = cityName || fetchedUser?.cityName
    const currentPhoneNumber = phoneNumber || fetchedUser?.phone

    //using FormData to send constructed data
    const formData = new FormData()
    formData.append('type', fetchedUser?.type!)
    formData.append('houseNumber', String(currentHouseNumber))
    formData.append('streetName', currentStreetName!)
    formData.append('neighborhoodName', currentNeighborhoodName!)
    formData.append('cityName', currentCityName!)
    formData.append('phoneNumber', currentPhoneNumber!)

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

  return !loadingFetch !== null && fetchedUser !== null ? (
    <Layout>
      <section className='container overflow-x-hidden px-5 rtl mx-auto max-w-6xl h-screen mt-28 md:mt-40'>
        <div className='hidden'>
          {updateStatus === 1
            ? notify({
                type: 'success',
                msg: updateMsg,
                reloadIn: TIME_TO_EXECUTE,
                reloadTo: goTo('shipping-address')
              })
            : updateStatus === 0
            ? notify({ type: 'error', msg: updateMsg })
            : null}
        </div>
        {isSmallScreen && <BackButton to='/' className='absolute z-50 top-6 left-6' />}

        <h1 className='font-bold mb-10 text-center'>{DOCUMENT_TITLE}</h1>

        <form
          className='relative flex flex-col items-center'
          onSubmit={handleUpdateShippingAddress}
        >
          <label htmlFor='houseNumber' className='form__group'>
            <span className='form__label'>رقم المنزل</span>
            <input
              type='number'
              id='houseNumber'
              className='form__input'
              onChange={e => setHouseNumber(parseInt(e.target.value.trim()))}
              defaultValue={fetchedUser ? fetchedUser?.houseNumber : houseNumber}
              required
            />
          </label>
          <label htmlFor='streetName' className='form__group'>
            <span className='form__label'>اسم الشارع</span>
            <input
              type='text'
              id='streetName'
              className='form__input'
              onChange={e => setStreetName(e.target.value.trim())}
              defaultValue={fetchedUser ? fetchedUser?.streetName : streetName}
              required
            />
          </label>
          <label htmlFor='neighborhoodName' className='form__group'>
            <span className='form__label'>اسم الحي</span>
            <input
              type='text'
              id='neighborhoodName'
              className='form__input'
              onChange={e => setNeighborhoodName(e.target.value.trim())}
              defaultValue={
                fetchedUser ? fetchedUser?.neighborhoodName : neighborhoodName
              }
              required
            />
          </label>
          <label htmlFor='cityName' className='form__group'>
            <span className='form__label'>اسم المدينة</span>
            <input
              type='text'
              id='cityName'
              className='form__input'
              onChange={e => setCityName(e.target.value.trim())}
              defaultValue={fetchedUser ? fetchedUser?.cityName : cityName}
              required
            />
          </label>

          <label htmlFor='tel' className='form__group'>
            <span className='form__label'>الهاتــــــف</span>
            <input
              type='tel'
              id='tel'
              className='form__input ltr text-right'
              onChange={e => setPhoneNumber(e.target.value.trim())}
              defaultValue={fetchedUser ? fetchedUser?.phone : phone}
              required
            />
          </label>
          <div className='flex items-center gap-x-20'>
            <button
              type='submit'
              className={`min-w-[7rem] bg-green-600 hover:bg-green-700 text-white py-1.5 px-6 rounded-md${
                isUpdating || updateStatus === 1
                  ? ' disabled:opacity-30 disabled:hover:bg-green-700 disabled:cursor-not-allowed'
                  : ''
              }`}
            >
              {isUpdating ? (
                <>
                  <LoadingSpinner />
                  &nbsp; جارِ تحديث عنوان التوصيل...
                </>
              ) : (
                'تحديث'
              )}
            </button>
          </div>
        </form>
      </section>
    </Layout>
  ) : (
    <LoadingPage />
  )
}

export default ShippingAddress
function setFetchedUser(arg0: any) {
  throw new Error('Function not implemented.')
}
