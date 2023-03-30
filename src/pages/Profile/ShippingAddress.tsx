import { useState } from 'react'
import useAuth from '@/hooks/useAuth'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import { LoadingPage, LoadingSpinner } from '@/components/Loading'
import { isSmallScreen, USER_DATA } from '@/constants'
import BackButton from '@/components/Icons/BackButton'
import Layout from '@/components/Layout'

const ShippingAddress = () => {
  const DOCUMENT_TITLE = 'عنوان التوصيل'
  useDocumentTitle(DOCUMENT_TITLE)
  const { loading, userData } = useAuth()
  const { phone } = userData || USER_DATA

  const [houseNumber, setHouseNumber] = useState<number>()
  const [streetName, setStreetName] = useState<string>('')
  const [neighborhoodName, setNeighborhoodName] = useState<string>('')
  const [cityName, setCityName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState<string>(phone)
  //Status
  const [updateItemStatus, setUpdatedItemStatus] = useState<number | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleUpdateShippingAddress = async (e: {
    target: any
    key?: string
    preventDefault: () => void
  }) => {
    e.preventDefault()
    e.target.querySelector('button').setAttribute('disabled', 'disabled')
    setIsUpdating(true)
  }

  return (
    <Layout>
      {loading ? (
        <LoadingPage />
      ) : (
        <section className='container overflow-x-hidden px-5 rtl mx-auto max-w-6xl mt-28 md:mt-40'>
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
                defaultValue={houseNumber}
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
                defaultValue={streetName}
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
                defaultValue={neighborhoodName}
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
                defaultValue={cityName}
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
                defaultValue={phoneNumber}
                required
              />
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
                    &nbsp; جارِ تحديث عنوان التوصيل...
                  </>
                ) : (
                  'تحديث'
                )}
              </button>
            </div>
          </form>
        </section>
      )}
    </Layout>
  )
}

export default ShippingAddress
