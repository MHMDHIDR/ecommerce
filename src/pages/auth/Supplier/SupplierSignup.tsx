import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { API_URL, TIME_TO_EXECUTE, USER_DATA } from '@/constants'
import axios from 'axios'
import notify from '@/utils/notify'
import { validName, validPassword, validPhone, validUsername } from '@/utils/validForm'
import { catchResponse } from '@/types'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import useAuth from '@/hooks/useAuth'
import { EyeIconClose, EyeIconOpen } from '@/components/Icons/EyeIcon'
import { LoadingPage, LoadingSpinner } from '@/components/Loading'
import LazyImage from '@/components/LazyImage'

const SupplierSignup = () => {
  const DOCUMENT_TITLE = 'تسجيل حساب التاجر'
  useDocumentTitle(DOCUMENT_TITLE)

  const { loading, userData } = useAuth()
  const { id } = userData || { id: USER_DATA.id }
  const navigate = useNavigate()

  //Personal Info States
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  //Address Info States
  const [houseNumber, setHouseNumber] = useState<number>()
  const [streetName, setStreetName] = useState<string>('')
  const [neighborhoodName, setNeighborhoodName] = useState<string>('')
  const [cityName, setCityName] = useState('')
  //Account Info States
  const [username, setUsername] = useState('')
  const [tel, setTel] = useState('')
  const [password, setPassword] = useState('')
  const [termsAndConditions, setTermsAndConditions] = useState(false)
  //Form States
  const [isPassVisible, setIsPassVisible] = useState(false)
  const [regStatus, setRegStatus] = useState<number>()
  const [regMsg, setRegMsg] = useState<any>('')
  const [isRegistering, setIsRegistering] = useState(false)

  const handleRegister = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if (!validName(firstname)) {
      notify({
        type: 'error',
        msg: 'اسم المستخدم يجب أن يتكون من حروف إنجليزية فقط أو عربية فقط ويكون طوله بين 3 و 20 حرفًا.'
      })
      return
    } else if (!validName(lastname)) {
      notify({
        type: 'error',
        msg: 'اسم المستخدم يجب أن يتكون من حروف إنجليزية فقط أو عربية فقط ويكون طوله بين 3 و 20 حرفًا.'
      })
      return
    } else if (!validUsername(username)) {
      notify({
        type: 'error',
        msg: 'اسم المستخدم يجب أن يتكون من حروف إنجليزية فقط ويكون طوله بين 3 و 20 حرفًا.'
      })
      return
    } else if (!validPhone(tel)) {
      notify({ type: 'error', msg: 'رقم الهاتف غير صالح.' })
      return
    } else if (!validPassword(password)) {
      notify({
        type: 'error',
        msg: 'كلمة المرور يجب أن تحتوي على 8-30 حرفًا، ويجب أن تحتوي على حرف كبير وحرف صغير ورمز خاص على الأقل.'
      })
      return
    }

    const formData = new FormData()
    formData.append('firstname', firstname)
    formData.append('lastname', lastname)
    formData.append('houseNumber', String(houseNumber))
    formData.append('streetName', streetName)
    formData.append('neighborhoodName', neighborhoodName)
    formData.append('cityName', cityName)
    formData.append('username', username)
    formData.append('tel', tel)
    formData.append('password', password)

    try {
      setIsRegistering(true)
      const { data } = await axios.post(`${API_URL}/users/signup-supplier`, formData)
      const { supplierAdded, message } = data

      setRegStatus(supplierAdded)
      setRegMsg(message)
    } catch (error: any) {
      const {
        response: {
          data: { message, supplierAdded }
        }
      }: catchResponse = error
      setRegStatus(supplierAdded)
      setRegMsg(message)
    } finally {
      setIsRegistering(false)
    }
  }

  //this will ensure I can't access login page if i'm already logged in
  useEffect(() => {
    if (id && regStatus === 1) {
      const timeoutId = setTimeout(() => {
        navigate('/')
      }, TIME_TO_EXECUTE)
      return () => {
        clearTimeout(timeoutId)
      }
    } else if (id !== '' && regStatus === null) {
      navigate('/')
    } else if (id) {
      navigate('/')
    }
  }, [id, regStatus])

  return loading ? (
    <LoadingPage />
  ) : (
    <section className='h-screen'>
      <div className='container px-6 py-16 mx-auto max-w-6xl'>
        <div className='hidden'>
          {regStatus === 1
            ? notify({
                type: 'success',
                msg: regMsg,
                reloadIn: TIME_TO_EXECUTE,
                reloadTo: '/supplier-login'
              })
            : regStatus === 0
            ? notify({ type: 'error', msg: regMsg })
            : null}
        </div>

        <div className='flex h-full flex-wrap items-center justify-center'>
          <Link to='/'>
            <LazyImage
              src='assets/img/logo.png'
              className='w-40 h-32 mb-10'
              alt='Logo image'
            />
          </Link>

          <form className='w-full rtl' onSubmit={handleRegister}>
            <h2 className='font-bold my-10 select-none'>معلومات شخصية:</h2>
            <label htmlFor='firstname' className='relative flex mb-6'>
              <input
                type='text'
                className='peer border-b block min-h-[auto] w-full rounded bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
                id='firstname'
                placeholder='الاســم الأول، مثال: (محمد)'
                onChange={e => setFirstname(e.target.value)}
                required
              />
              <span className='pointer-events-none absolute top-0 right-2 max-w-[90%] text-gray-700 duration-200 -translate-y-[1.15rem] scale-[0.8] motion-reduce:transition-none dark:text-gray-200 dark:peer-focus:text-gray-200'>
                الاســــــم الأول
              </span>
            </label>

            <label htmlFor='lastname' className='relative flex mb-6'>
              <input
                type='text'
                className='peer border-b block min-h-[auto] w-full rounded bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
                id='lastname'
                placeholder='الاســم الثاني مثال: (أحمد)'
                onChange={e => setLastname(e.target.value)}
                required
              />
              <span className='pointer-events-none absolute top-0 right-2 max-w-[90%] text-gray-700 duration-200 -translate-y-[1.15rem] scale-[0.8] motion-reduce:transition-none dark:text-gray-200 dark:peer-focus:text-gray-200'>
                الاســــــم الثاني
              </span>
            </label>

            <h2 className='font-bold my-10 select-none'>معلومات العنوان:</h2>

            <label htmlFor='houseNumber' className='relative flex mb-6'>
              <input
                type='number'
                id='houseNumber'
                className='peer border-b block min-h-[auto] w-full rounded bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
                onChange={e => setHouseNumber(parseInt(e.target.value.trim()))}
                defaultValue={houseNumber}
                required
              />
              <span className='pointer-events-none absolute top-0 right-2 max-w-[90%] text-gray-700 duration-200 -translate-y-[1.15rem] scale-[0.8] motion-reduce:transition-none dark:text-gray-200 dark:peer-focus:text-gray-200'>
                رقم المنزل
              </span>
            </label>

            <label htmlFor='streetName' className='relative flex mb-6'>
              <input
                type='text'
                id='streetName'
                className='peer border-b block min-h-[auto] w-full rounded bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
                onChange={e => setStreetName(e.target.value.trim())}
                defaultValue={streetName}
                required
              />
              <span className='pointer-events-none absolute top-0 right-2 max-w-[90%] text-gray-700 duration-200 -translate-y-[1.15rem] scale-[0.8] motion-reduce:transition-none dark:text-gray-200 dark:peer-focus:text-gray-200'>
                اسم الشارع
              </span>
            </label>

            <label htmlFor='neighborhoodName' className='relative flex mb-6'>
              <input
                type='text'
                id='neighborhoodName'
                className='peer border-b block min-h-[auto] w-full rounded bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
                onChange={e => setNeighborhoodName(e.target.value.trim())}
                defaultValue={neighborhoodName}
                required
              />
              <span className='pointer-events-none absolute top-0 right-2 max-w-[90%] text-gray-700 duration-200 -translate-y-[1.15rem] scale-[0.8] motion-reduce:transition-none dark:text-gray-200 dark:peer-focus:text-gray-200'>
                اسم الحي
              </span>
            </label>

            <label htmlFor='cityName' className='relative flex mb-6'>
              <input
                type='text'
                id='cityName'
                className='peer border-b block min-h-[auto] w-full rounded bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
                onChange={e => setCityName(e.target.value.trim())}
                defaultValue={cityName}
                required
              />
              <span className='pointer-events-none absolute top-0 right-2 max-w-[90%] text-gray-700 duration-200 -translate-y-[1.15rem] scale-[0.8] motion-reduce:transition-none dark:text-gray-200 dark:peer-focus:text-gray-200'>
                اسم المدينة
              </span>
            </label>

            <h2 className='font-bold my-10 select-none'>معلومات الحساب:</h2>

            <label htmlFor='username' className='relative flex mb-6'>
              <input
                type='text'
                className='peer border-b block min-h-[auto] w-full rounded bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
                id='username'
                placeholder='اسم المستخدم'
                onChange={e => setUsername(e.target.value)}
                required
              />
              <span className='pointer-events-none absolute top-0 right-2 max-w-[90%] text-gray-700 duration-200 -translate-y-[1.15rem] scale-[0.8] motion-reduce:transition-none dark:text-gray-200 dark:peer-focus:text-gray-200'>
                اسم المستخدم
              </span>
            </label>

            <label htmlFor='tel' className='relative flex mb-6'>
              <input
                type='tel'
                className='peer border-b block min-h-[auto] w-full rounded bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
                id='tel'
                placeholder='رقم الهاتف'
                onChange={e => setTel(e.target.value)}
                required
              />
              <span className='pointer-events-none absolute top-0 right-2 max-w-[90%] text-gray-700 duration-200 -translate-y-[1.15rem] scale-[0.8] motion-reduce:transition-none dark:text-gray-200 dark:peer-focus:text-gray-200'>
                رقم الهاتف
              </span>
            </label>

            <label htmlFor='password' className='relative flex mb-6'>
              <input
                type={isPassVisible ? 'text' : 'password'}
                className='peer border-b block min-h-[auto] w-full rounded bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
                id='password'
                placeholder='كلمة المرور'
                onChange={e => setPassword(e.target.value)}
                required
              />
              <span
                className='absolute cursor-pointer p-3 text-xs text-black capitalize transition-all select-none left-10 sm:text-sm md:text-lg dark:text-gray-100 opacity-60;'
                onClick={() => setIsPassVisible((prevState: boolean) => !prevState)}
              >
                {isPassVisible ? <EyeIconOpen /> : <EyeIconClose />}
              </span>
              <span className='pointer-events-none absolute top-0 right-2 max-w-[90%] text-gray-700 duration-200 -translate-y-[1.15rem] scale-[0.8] motion-reduce:transition-none dark:text-gray-200 dark:peer-focus:text-gray-200'>
                كلمة المرور
              </span>
            </label>

            <div className='mb-6 flex items-center justify-between'>
              <div className='flex gap-x-2 mb-[0.125rem] min-h-[1.5rem]'>
                <input
                  type='checkbox'
                  id='terms&condCheckbox'
                  onChange={e => setTermsAndConditions(e.target.checked)}
                  required
                />
                <label className='hover:cursor-pointer' htmlFor='terms&condCheckbox'>
                  بالضغط هنا فأنت توافق على
                  <div className='inline-flex items-center gap-x-2 pr-2'>
                    <Link to='/terms-and-conditions' className='underline-hover '>
                      شروط الاستخدام
                    </Link>
                    و
                    <Link to='/privacy-policy' className='underline-hover '>
                      سياسة الخصوصية
                    </Link>
                  </div>
                </label>
              </div>
            </div>

            <button
              type='submit'
              className={`inline-block w-full rounded px-7 py-2.5 text-sm leading-normal text-white dark:text-gray-800 shadow-[0_4px_9px_-4px_#3b71ca] transition ease-in-out bg-gray-700 dark:bg-white${
                isRegistering || regStatus === 1
                  ? ' disabled:opacity-30 disabled:cursor-not-allowed'
                  : ''
              } ${
                !firstname ||
                !lastname ||
                !houseNumber ||
                !streetName ||
                !neighborhoodName ||
                !cityName ||
                !username ||
                !tel ||
                !password ||
                !termsAndConditions
                  ? 'disabled:opacity-30 disabled:cursor-not-allowed'
                  : ''
              }`}
              disabled={
                !firstname ||
                !lastname ||
                !houseNumber ||
                !streetName ||
                !neighborhoodName ||
                !cityName ||
                !username ||
                !tel ||
                !password ||
                !termsAndConditions
              }
            >
              {isRegistering ? (
                <>
                  <LoadingSpinner />
                  &nbsp; جارِ التسجيل...
                </>
              ) : (
                'تسجيل'
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
export default SupplierSignup
