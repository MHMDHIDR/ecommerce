import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URL, TIME_TO_EXECUTE, USER_DATA } from '@/constants'
import axios from 'axios'
import notify from '@/utils/notify'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import { catchResponse } from '@/types'
import useAuth from '@/hooks/useAuth'
import { EyeIconClose, EyeIconOpen } from '@/components/Icons/EyeIcon'
import { LoadingPage, LoadingSpinner } from '@/components/Loading'
import LazyImage from '@/components/LazyImage'

const AdminSignup = () => {
  const DOCUMENT_TITLE = 'تسجيل حساب إداري'
  useDocumentTitle(DOCUMENT_TITLE)

  const { loading, userData } = useAuth()
  const { id } = userData || { id: USER_DATA.id }
  const navigate = useNavigate()

  //Personal Info States
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  //Account Info States
  const [username, setUsername] = useState('')
  const [tel, setTel] = useState('')
  const [password, setPassword] = useState('')
  //Form States
  const [isPassVisible, setIsPassVisible] = useState(false)
  const [regStatus, setRegStatus] = useState<number>()
  const [regMsg, setRegMsg] = useState<any>('')
  const [isRegistering, setIsRegistering] = useState(false)

  const handleRegister = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('firstname', firstname)
    formData.append('lastname', lastname)
    formData.append('username', username)
    formData.append('tel', tel)
    formData.append('password', password)

    try {
      setIsRegistering(true)
      const { data } = await axios.post(`${API_URL}/users/signup-admin`, formData)
      const { adminAdded, message } = data

      setRegStatus(adminAdded)
      setRegMsg(message)
    } catch (error: any) {
      const {
        response: {
          data: { message, adminAdded }
        }
      }: catchResponse = error
      setRegStatus(adminAdded)
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
                reloadTo: '/admin-login'
              })
            : regStatus === 0
            ? notify({ type: 'error', msg: regMsg })
            : null}
        </div>

        <div className='flex h-full flex-wrap items-center justify-center'>
          <LazyImage
            src='assets/img/logo.png'
            className='w-40 h-32 mb-10'
            alt='Logo image'
          />

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

            <button
              type='submit'
              className={`inline-block w-full rounded px-7 py-2.5 text-sm leading-normal text-white dark:text-gray-800 shadow-[0_4px_9px_-4px_#3b71ca] transition ease-in-out bg-gray-700 dark:bg-white${
                isRegistering || regStatus === 1
                  ? ' disabled:opacity-30 disabled:cursor-not-allowed'
                  : ''
              }`}
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
export default AdminSignup
